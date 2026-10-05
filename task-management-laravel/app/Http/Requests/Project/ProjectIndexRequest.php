<?php

namespace App\Http\Requests\Project;

use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => [
                'sometimes',
                'integer',
                'min:1',
            ],

            'per_page' => [
                'sometimes',
                'integer',
                'min:1',
                'max:100',
            ],

            'search' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'client_name' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'name' => [
                'sometimes',
                'string',
                'max:255',
            ],

            'status' => [
                'sometimes',
                Rule::enum(ProjectStatus::class),
            ],

            'priority' => [
                'sometimes',
                Rule::enum(ProjectPriority::class),
            ],

            'sort_by' => [
                'sometimes',
                'string',
                Rule::in([
                    'id',
                    'name',
                    'client_name',
                    'status',
                    'priority',
                    'created_at',
                    'updated_at',
                ]),
            ],

            'sort_direction' => [
                'sometimes',
                'string',
                Rule::in([
                    'asc',
                    'desc',
                ]),
            ],
        ];
    }
}
