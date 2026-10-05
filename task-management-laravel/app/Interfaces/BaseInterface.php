<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

interface BaseInterface
{
    /**
     * Get all records.
     * 
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Get paginated records.
     *
     * @param int $perPage
     * @param array $filters
     */
    public function paginate(
        int $perPage = 15,
        array $filters = []
    ): LengthAwarePaginator;

    /**
     * Find a record by its ID.
     * 
     * @param int $id
     * @return ?Model
     */
    public function findById(int $id): ?Model;

    /**
     * Create a new record.
     * 
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model;

    /**
     * Update an existing record.
     * 
     * @param Model $model
     * @param array $data
     * @return Model
     */
    public function update(Model $model, array $data): Model;

    /**
     * Delete a record.
     * 
     * @param Model $model
     * @return bool
     */
    public function delete(Model $model): bool;

    /**
     * Search records.
     * 
     * @param array $fieldList
     * @param array $data
     * @param ?Builder $query
     * @return Builder
     */
    public function searchLike(
        array $fieldList,
        array $data,
        ?Builder $query = null
    ): Builder;
}
