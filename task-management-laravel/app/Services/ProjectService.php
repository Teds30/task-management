<?php

namespace App\Services;

use App\Interfaces\ProjectRepositoryInterface;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProjectService
{
    public function __construct(
        private readonly ProjectRepositoryInterface $projectRepository
    ) {}

    public function getAll(): Collection
    {
        return $this->projectRepository->all();
    }

    public function getPaginated(
        int $perPage = 15,
        array $filters = []
    ): LengthAwarePaginator {
        return $this->projectRepository->paginate(
            $perPage,
            $filters
        );
    }

    public function getById(int $id): ?Project
    {
        return $this->projectRepository->findById($id);
    }

    public function create(array $data): Project
    {
        return $this->projectRepository->create($data);
    }

    public function update(Project $project, array $data): Project
    {
        return $this->projectRepository->update($project, $data);
    }

    public function delete(Project $project): bool
    {
        return $this->projectRepository->delete($project);
    }
}
