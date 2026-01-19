<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * This enables the following:
         *
         * @method preventLazyLoading()                         Throws an exception when lazy loading occurs.
         * @method preventSilentlyDiscardingAttributes()        Throws an exception when a property is accessed that isn't fillable.
         * @method preventAccessingMissingAttributes()          Throws an exception when a property is accessed that doesn't exist.
         *
         * This way, we get direct feedback whenever we mess up :-)
         */
        Model::shouldBeStrict();

        $this->configureDefaults();
    }

    /**
     * Configure default application settings, as suggested by vue-starter-kit.
     *
     * @return void
     */
    private function configureDefaults()
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
