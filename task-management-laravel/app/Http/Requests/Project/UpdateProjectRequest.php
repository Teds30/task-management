<?php

namespace App\Http\Requests\Project;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => [
                'sometimes',
                'string',
                'max:255'
            ],
            'name' => [
                'sometimes',
                'string',
                'max:255'
            ],
            'description' => [
                'sometimes',
                'nullable',
                'string'
            ],
            'status' => [
                'sometimes',
                Rule::enum(ProjectStatus::class)
            ],
            'priority' => [
                'sometimes',
                Rule::enum(ProjectPriority::class)
            ],
            'start_date' => [
                'sometimes',
                'date'
            ],
            'due_date' => [
                'sometimes',
                'date',
                'after_or_equal:start_date'
            ],

        ];
    }
}
