<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Included packages
> All packages are preconfigured for opinionated use.

### Node

| Package Name | Purpose |
| ------------ | ------- |
| TypeScript | Adds TypeScript to be used in the front-end (VueJS) |
| Vue.js | Adds the Vue.js as the front end framework (also adds `vue-tsc` for TypeScript) | 
| Tailwind CSS | Adds Tailwind CSS to work with vite |
| ESLINT | Adds ESLINT (`npm run lint` ) to be used alongside Vue.js (also implements `eslint-plugin-vue`, `@vue/eslint-config-typescript`, `eslint-config-prettier` and `typescript-eslint`) |
| Prettier | Auto format your code by using `npm run format` according to .prettierrc (also implements `prettier-eslint`, `prettier-plugin-organize-imports`, `prettier-plugin-tailwindcss`)
| Laravel Wayfinder | Adds the client-side implementation for Laravel Wayfinder |
| Inertia.js | Adds the client-side implementation for Inertia (vue) |

### Composer

| Package Name | Purpose | 
| ------------ | ------- |
| Inertia Serverside | Adds Inertia to work on the serverside |
| Laravel Fortify | Provides authentication scaffolding, maintained by Laravel team |
| Laravel Wayfinder | TypeScript replacement for Ziggy.js: manage Laravel routes in in the front-end |
| Laravel Pint | The prettier of Laravel: auto format .php code according to Laravel conventions (use `composer format:check`)|
| Larastan | The ESLINT of Laravel: scopes errors or potential code fallbacks by analyzing code |
| Laravel Debugbar | Shows a debug bar during development when `APP_DEBUG = true` |
| Laravel IDE Helper | Generates `_ide_helper.php` and `.phpstorm.meta.php` to assist your IDE with auto completion |

### Other configurations

- `Model::shouldBeStrict();` is activated.
- `HandleInertiaRequests()` includes the application's name and an instance of the authenticated user (null if false).
...

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
