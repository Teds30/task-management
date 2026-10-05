<?php

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        /*
         * Render API requests as JSON.
         */
        $exceptions->shouldRenderJsonWhen(
            fn(Request $request): bool =>
            $request->is('api/*') || $request->expectsJson(),
        );

        /*
         * Handle 404 responses.
         *
         * This covers both:
         * - Missing routes
         * - Missing models from route model binding
         */
        $exceptions->render(function (
            NotFoundHttpException $exception,
            Request $request
        ) {
            if (! $request->is('api/*') && ! $request->expectsJson()) {
                return null;
            }

            $previous = $exception->getPrevious();

            $message = $previous instanceof ModelNotFoundException
                ? Str::headline(
                    class_basename($previous->getModel())
                ) . ' not found.'
                : 'Route not found.';

            return response()->json([
                'status' => 'error',
                'message' => $message,
            ], Response::HTTP_NOT_FOUND);
        });
    })
    ->create();
