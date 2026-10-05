<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthService
{
    /**
     * Verify credentials and issue a Sanctum personal access token.
     *
     * @param string $username
     * @param string $password
     * @return array
     * @throws ValidationException
     */
    public function login(string $username, string $password, string $deviceName): array
    {
        $user = User::where('username', $username)->first();

        if (! $this->credentialsAreValid($user, $password)) {
            throw ValidationException::withMessages([
                'username' => [trans('auth.failed')],
            ]);
        }

        // One token per device: re-login on the same device replaces the old token.
        $user->tokens()->where('name', $deviceName)->delete();

        $expiresAt = config('sanctum.expiration')
            ? now()->addMinutes((int) config('sanctum.expiration'))
            : null;

        $token = $user->createToken($deviceName, ['*'], $expiresAt)->plainTextToken;

        return ['user' => $user, 'token' => $token];
    }

    /** 
     *  Revoke the current token (single device).
     * 
     * @param User $user
     * @return void
     */
    public function logout(User $user): void
    {
        $token = $user->currentAccessToken();

        if ($token instanceof PersonalAccessToken) {
            $token->delete();
        }
    }

    /**
     *  Revoke every token (all devices).
     * 
     * @param User $user
     * @return void
     */
    public function logoutAll(User $user): void
    {
        $user->tokens()->delete();
    }

    private function credentialsAreValid(?User $user, string $password): bool
    {
        if ($user === null) {

            return false;
        }

        return Hash::check($password, $user->password);
    }
}
