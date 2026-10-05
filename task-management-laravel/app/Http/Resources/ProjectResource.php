<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'clientName' => $this->client_name,
            'projectName' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'startDate' => $this->start_date,
            'dueDate' => $this->due_date,
        ];
    }
}
