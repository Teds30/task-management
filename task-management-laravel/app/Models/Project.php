<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\ProjectStatus;
use App\Enums\ProjectPriority;

class Project extends Model
{
    protected $fillable = [
        'client_name',
        'name',
        'description',
        'status',
        'priority',
        'start_date',
        'due_date',
    ];

    protected $casts = [
        'status' => ProjectStatus::class,
        'priority' => ProjectPriority::class,
        'start_date' => 'date',
        'due_date' => 'date',
    ];
}
