<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;
use Laravel\Fortify\Actions\EnableTwoFactorAuthentication;
use PragmaRX\Google2FA\Google2FA;

$root = dirname(__DIR__, 3);

require $root.'/vendor/autoload.php';

/** @var Application $app */
$app = require $root.'/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

$command = $argv[1] ?? '';
$input = json_decode($argv[2] ?? '{}', true, 512, JSON_THROW_ON_ERROR);

$currentOtp = (static fn (User $user): string => new Google2FA()->getCurrentOtp(decrypt($user->two_factor_secret)));

$findUser = (static fn (array $input): User => User::query()->where('email', $input['email'])->sole());

$present = (static fn (User $user): array => [
    'id' => $user->id,
    'name' => $user->name,
    'email' => $user->email,
    'verified' => $user->hasVerifiedEmail(),
    'twoFactorConfirmed' => $user->two_factor_confirmed_at !== null,
]);

$result = match ($command) {
    'migrate' => (function () use ($app): array {
        $app->make(Kernel::class)->call('migrate:fresh', ['--force' => true]);

        return ['migrated' => true];
    })(),

    'user:create' => (function () use ($input, $present): array {
        $password = $input['password'] ?? 'password';

        $user = User::query()->forceCreate([
            'name' => $input['name'] ?? 'Test User',
            'email' => $input['email'],
            'password' => Hash::make($password),
            'email_verified_at' => ($input['verified'] ?? true) ? now() : null,
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ]);

        $payload = $present($user) + ['password' => $password];

        if ($input['twoFactor'] ?? false) {
            resolve(EnableTwoFactorAuthentication::class)($user);
            $user->refresh();
            $user->forceFill(['two_factor_confirmed_at' => now()])->save();
            $user->refresh();

            $payload['recoveryCodes'] = json_decode(decrypt($user->two_factor_recovery_codes), true);
            $payload['twoFactorConfirmed'] = true;
        }

        return $payload;
    })(),

    'user:get' => (function () use ($input, $present): array {
        $user = User::query()->where('email', $input['email'])->first();

        return $user === null ? ['exists' => false] : ['exists' => true] + $present($user);
    })(),

    'user:otp' => (fn (): array => ['code' => $currentOtp($findUser($input))])(),

    'user:recovery-codes' => (fn (): array => ['codes' => json_decode(decrypt($findUser($input)->two_factor_recovery_codes), true)])(),

    'user:check-password' => (fn (): array => ['valid' => Hash::check($input['password'], $findUser($input)->password)])(),

    'url:verify' => (function () use ($input, $findUser): array {
        $user = $findUser($input);

        return ['url' => URL::temporarySignedRoute('verification.verify', now()->addHour(), [
            'id' => $user->getKey(),
            'hash' => sha1((string) $user->getEmailForVerification()),
        ])];
    })(),

    'url:reset' => (function () use ($input, $findUser): array {
        $user = $findUser($input);

        return ['url' => route('password.reset', [
            'token' => Password::broker()->createToken($user),
            'email' => $user->email,
        ])];
    })(),

    default => throw new InvalidArgumentException("Unknown command [{$command}]."),
};

echo json_encode($result, JSON_THROW_ON_ERROR);
