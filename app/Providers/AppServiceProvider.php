<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

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
    }
}
