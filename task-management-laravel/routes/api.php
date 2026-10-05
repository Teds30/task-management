<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\AuthController;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('logout-all', [AuthController::class, 'logoutAll']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('projects', ProjectController::class)
        ->names('projects');
});
