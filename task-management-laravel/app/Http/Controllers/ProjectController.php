<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\ProjectIndexRequest;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    public function __construct(
        private readonly ProjectService $projectService
    ) {}

    /**
     * Display a listing of the projects.
     */
    public function index(ProjectIndexRequest $request): JsonResponse
    {
        $projects = $this->projectService->getPaginated(
            $request->integer('per_page', 15),
            $request->validated()
        );

        return $this->paginatedResponse(
            $projects,
            ProjectResource::collection($projects),
            'Projects retrieved successfully.'
        );
    }

    /**
     * Store a newly created project.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $project = $this->projectService->create(
            $request->validated()
        );

        return $this->createdResponse(
            new ProjectResource($project),
            'Project created successfully.'
        );
    }

    /**
     * Display the specified project.
     */
    public function show(Project $project): JsonResponse
    {
        return $this->successResponse(
            new ProjectResource($project),
            'Project retrieved successfully.'
        );
    }

    /**
     * Update the specified project.
     */
    public function update(
        UpdateProjectRequest $request,
        Project $project
    ): JsonResponse {
        $project = $this->projectService->update(
            $project,
            $request->validated()
        );

        return $this->successResponse(
            new ProjectResource($project),
            'Project updated successfully.'
        );
    }

    /**
     * Remove the specified project.
     */
    public function destroy(Project $project): Response
    {
        $this->projectService->delete($project);

        return $this->noContentResponse();
    }
}
