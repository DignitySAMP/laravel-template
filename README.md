<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/DignitySAMP/laravel-template/actions/workflows/tests.yml"><img src="https://github.com/DignitySAMP/laravel-template/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
<a href="https://github.com/DignitySAMP/laravel-template/actions/workflows/lint.yml"><img src="https://github.com/DignitySAMP/laravel-template/actions/workflows/lint.yml/badge.svg" alt="Linter"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

## About

A fork of the Laravel Vue starter kit, preconfigured the way I start every Laravel application: Inertia and Vue 3 on the front-end, Fortify (including two-factor authentication) on the back-end, and a strict formatting and static analysis setup on both sides.

Everything is covered by feature tests and a Playwright end-to-end suite.

## Requirements

- PHP 8.3 or higher
- Node 22.13 or higher (24 LTS is used in CI)
- Composer 2

## Getting started

```bash
composer setup
composer dev
```

`composer setup` installs both dependency sets, creates `.env`, generates an application key, runs the migrations and builds the assets. `composer dev` then serves the application, the queue worker and Vite together.

## Commands

| Command            | Purpose                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `composer dev`     | Run the application, queue worker and Vite                                |
| `composer dev:ssr` | The same, with server side rendering and logs                             |
| `composer test`    | Run the PHPUnit suite                                                     |
| `composer check`   | Run Pint, Rector and PHPStan                                              |
| `npm run build`    | Build the assets for production (append `:ssr` to include the SSR bundle) |
| `npm run lint`     | Run ESLint and fix what it can (use `lint:check` to only report)          |
| `npm run format`   | Run Prettier and write changes (use `format:check` to only report)        |
| `npm run types`    | Type check the front-end with `vue-tsc`                                   |
| `npm run test:e2e` | Run the Playwright suite (append `:ui` for the inspector)                 |

## Testing

Feature tests live in `tests/Feature` and run against an in-memory SQLite database. They do not need built assets.

```bash
composer test
```

The end-to-end tests live in `tests/e2e` and drive a real browser against `php artisan serve`. They use their own SQLite database (`database/e2e.sqlite`) which is migrated fresh on every run, so they never touch your development data. Install the browser once, then run the suite:

```bash
npx playwright install chromium
npm run test:e2e
```

Test data is created through `tests/e2e/support/console.php`, which boots the application and exposes the few things the browser cannot set up by itself, such as signed verification links and valid two-factor codes.

## Included packages

> All packages are preconfigured for opinionated use.

### Node

| Package Name      | Purpose                                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript        | Adds TypeScript to be used in the front-end (VueJS)                                                                                                                                |
| Vue.js            | Adds the Vue.js as the front end framework (also adds `vue-tsc` for TypeScript)                                                                                                    |
| Tailwind CSS      | Adds Tailwind CSS to work with vite                                                                                                                                                |
| ESLINT            | Adds ESLINT (`npm run lint` ) to be used alongside Vue.js (also implements `eslint-plugin-vue`, `@vue/eslint-config-typescript`, `eslint-config-prettier` and `typescript-eslint`) |
| Prettier          | Auto format your code by using `npm run format` according to .prettierrc (also implements `prettier-eslint`, `prettier-plugin-organize-imports`, `prettier-plugin-tailwindcss`)    |
| Playwright        | Runs the end-to-end suite in `tests/e2e` against a real browser                                                                                                                    |
| Laravel Wayfinder | Adds the client-side implementation for Laravel Wayfinder                                                                                                                          |
| Inertia.js        | Adds the client-side implementation for Inertia (vue)                                                                                                                              |
| Reka-UI           | Reka-UI's headless components power almost all components in the project                                                                                                           |
| Lucide Vue        | Provides an endless amount of icons throughout the application                                                                                                                     |

### Composer

| Package Name       | Purpose                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Inertia Serverside | Adds Inertia to work on the serverside                                                                 |
| Laravel Fortify    | Provides authentication scaffolding, maintained by Laravel team                                        |
| Laravel Wayfinder  | TypeScript replacement for Ziggy.js: manage Laravel routes in in the front-end                         |
| Laravel Pint       | The prettier of Laravel: auto format .php code according to Laravel conventions (use `composer check`) |
| Larastan           | The ESLINT of Laravel: scopes errors or potential code fallbacks by analyzing code                     |
| Laravel Debugbar   | Shows a debug bar during development when `APP_DEBUG = true`                                           |
| Laravel IDE Helper | Generates `_ide_helper.php` and `.phpstorm.meta.php` to assist your IDE with auto completion           |
| Rector             | Refactors code without a fuss. Use the `composer check` to run Rector alongside PHPStan and Pint       |
| Spatie Permission  | Adds roles and permissions to the `User` model                                                         |
| PHPUnit            | Runs the feature tests in `tests/Feature` (use `composer test`)                                        |

### Other configurations

- `Model::shouldBeStrict();` is activated, so lazy loading, discarded attributes and missing attributes all throw.
- Dates resolve to `CarbonImmutable`, and destructive database commands are blocked in production.
- `Password::defaults()` only enforces the strict ruleset in production, so local accounts stay easy to create.
- `HandleInertiaRequests()` shares the application's name, the authenticated user (null when a guest), an inspiring quote and the sidebar state.

## License

This template is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
