<?php

namespace App\Repositories;

use App\Interfaces\ProjectRepositoryInterface;
use App\Models\Project;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * Allowed columns for sorting.
     *
     * @var array<int, string>
     */
    private const SORTABLE_COLUMNS = [
        'id',
        'name',
        'client_name',
        'status',
        'priority',
        'created_at',
        'updated_at',
    ];

    /**
     * Constructor for dependencies.
     *
     * @param  Project  $model
     */
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }

    /**
     * Get paginated projects.
     *
     * Supported filters:
     * - search
     * - client_name
     * - name
     * - status
     * - priority
     * - sort_by
     * - sort_direction
     */
    public function paginate(
        int $perPage = 15,
        array $filters = []
    ): LengthAwarePaginator {
        $query = $this->model->newQuery();

        /*
         * Search
         *
         * Searches both project name and client name.
         */
        if (!empty($filters['search'])) {
            $search = $filters['search'];

            $query->where(function (Builder $query) use ($search) {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('client_name', 'like', "%{$search}%");
            });
        }

        /*
         * Filter by client name.
         */
        if (!empty($filters['client_name'])) {
            $query->where(
                'client_name',
                'like',
                '%' . $filters['client_name'] . '%'
            );
        }

        /*
         * Filter by project name.
         */
        if (!empty($filters['name'])) {
            $query->where(
                'name',
                'like',
                '%' . $filters['name'] . '%'
            );
        }

        /*
         * Filter by status.
         */
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        /*
         * Filter by priority.
         */
        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        /*
         * Sorting.
         */
        $sortBy = $filters['sort_by'] ?? 'id';
        $sortDirection = $filters['sort_direction'] ?? 'desc';

        if (!in_array($sortBy, self::SORTABLE_COLUMNS, true)) {
            $sortBy = 'id';
        }

        if (!in_array($sortDirection, ['asc', 'desc'], true)) {
            $sortDirection = 'desc';
        }

        $query->orderBy($sortBy, $sortDirection);

        return $query->paginate($perPage);
    }
}
