<?php

namespace App\Http\Requests\Project;

use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'client_name' => [
                'required',
                'string',
                'max:255',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'status' => [
                'required',
                Rule::enum(ProjectStatus::class),
            ],
            'priority' => [
                'required',
                Rule::enum(ProjectPriority::class),
            ],
            'start_date' => [
                'required',
                'date',
            ],
            'due_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
            ],
        ];
    }
}
