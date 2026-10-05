<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case IN_PROGRESS = 'in_progress';
    case PLANNING = 'planning';
    case ON_HOLD = 'on_hold';
    case COMPLETED = 'completed';

    public function label(): string
    {
        return match ($this) {
            self::IN_PROGRESS => 'In Progress',
            self::PLANNING => 'Planning',
            self::ON_HOLD => 'On Hold',
            self::COMPLETED => 'Completed',
        };
    }
}
