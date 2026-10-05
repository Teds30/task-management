<?php

namespace App\Traits;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpFoundation\Response;

trait ResponseTrait
{
    /**
     * Return a successful JSON response.
     */
    protected function successResponse(
        mixed $data,
        ?string $message = null,
        int $code = Response::HTTP_OK,
    ): JsonResponse {
        return response()->json([
            'status' => 'success',
            'message' => $message ?? 'Request was successful.',
            'data' => $data,
        ], $code);
    }

    /**
     * Return a created (201) JSON response.
     */
    protected function createdResponse(
        mixed $data,
        ?string $message = null,
    ): JsonResponse {
        return $this->successResponse(
            $data,
            $message ?? 'Resource created successfully.',
            Response::HTTP_CREATED
        );
    }

    /**
     * Return a paginated JSON response.
     */
    protected function paginatedResponse(
        LengthAwarePaginator $paginator,
        AnonymousResourceCollection $resource,
        ?string $message = null,
    ): JsonResponse {
        return response()->json([
            'status' => 'success',
            'message' => $message ?? 'Request was successful.',
            'data' => $resource->collection,
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ]);
    }

    /**
     * Return a no-content (204) response.
     */
    protected function noContentResponse(): Response
    {
        return response()->noContent();
    }
}
