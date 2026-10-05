<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login(
            $request->validated('username'),
            $request->validated('password'),
            $request->validated('device_name') ?? $request->userAgent() ?? 'unknown-device',
        );

        return $this->successResponse(
            [
                'user' => new UserResource($result['user']),
                'token' => $result['token'],
            ],
            'Login successful.'
        );
    }

    public function me(Request $request): UserResource
    {
        return new UserResource($request->user());
    }

    public function logout(Request $request): Response
    {
        $this->authService->logout($request->user());

        return response()->noContent();
    }

    public function logoutAll(Request $request): Response
    {
        $this->authService->logoutAll($request->user());

        return response()->noContent();
    }
}
