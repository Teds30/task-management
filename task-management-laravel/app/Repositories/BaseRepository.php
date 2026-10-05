<?php

namespace App\Repositories;

use App\Interfaces\BaseInterface;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class BaseRepository implements BaseInterface
{
    /**
     * The Eloquent model instance.
     *
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param  Model  $model  The model instance to be used.
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all records.
     * 
     * @return Collection  A collection of all model instances.
     */
    public function all(): Collection
    {
        return $this->model->newQuery()
            ->orderBy('id', 'desc')
            ->get();
    }

    /**
     * Get paginated records.
     *
     */
    public function paginate(
        int $perPage = 15,
        array $filters = []
    ): LengthAwarePaginator {
        $query = $this->model->newQuery();

        return $query->paginate($perPage);
    }

    /**
     * Find a record by its ID.
     * 
     * @param  int  $id  The ID of the record to find.
     * @return Model|null  The found model instance or null if not found.
     */
    public function findById(int $id): ?Model
    {
        return $this->model->newQuery()->find($id);
    }

    /**
     * Create a new record.
     * 
     * @param  array  $data  The data to create the new record with.
     * @return Model  The newly created model instance.
     */
    public function create(array $data): Model
    {
        return $this->model->newQuery()->create($data);
    }

    /**
     * Update a record.
     *
     * @param  Model  $model  The model instance to be updated.
     * @param  array  $data  The data to update the model with.
     * @return Model  The updated model instance.
     */
    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model->fresh();
    }

    /**
     * Delete a record.
     * 
     * @param  Model  $model  The model instance to be deleted.
     * @return bool  True if the deletion was successful, false otherwise.
     */
    public function delete(Model $model): bool
    {
        return (bool) $model->delete();
    }

    /**
     * Search for records based on fields and data.
     * 
     * @param array $fieldList The list of fields to search in.
     * @param array $data The data to search for.
     * @param Builder|null $query An optional query builder instance to apply the search on.
     * @return Builder The query builder instance with the search conditions applied.
     */
    public function searchLike(
        array $fieldList,
        array $data,
        ?Builder $query = null
    ): Builder {
        $query ??= $this->model->newQuery();

        foreach ($fieldList as $field) {
            if (isset($data[$field])) {
                $query->where(
                    $field,
                    'like',
                    '%' . $data[$field] . '%'
                );
            }
        }

        return $query;
    }
}
