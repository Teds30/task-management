<?php

namespace App\Providers;

use App\Interfaces\BaseInterface;
use App\Repositories\BaseRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ProjectRepository;
use App\Interfaces\ProjectRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

        $this->app->bind(
            BaseRepository::class,
            BaseInterface::class
        );
        $this->app->bind(
            ProjectRepositoryInterface::class,
            ProjectRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
