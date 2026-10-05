<?php

use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('client_name');
            $table->string('name');
            $table->text('description')->nullable();

            $table->enum(
                'status',
                array_column(ProjectStatus::cases(), 'value')
            )->default(ProjectStatus::PLANNING->value);

            $table->enum(
                'priority',
                array_column(ProjectPriority::cases(), 'value')
            )->default(ProjectPriority::MEDIUM->value);

            $table->date('start_date');
            $table->date('due_date');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
