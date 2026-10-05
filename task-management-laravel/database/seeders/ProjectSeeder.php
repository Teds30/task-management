<?php

namespace Database\Seeders;

use App\Enums\ProjectPriority;
use App\Enums\ProjectStatus;
use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'client_name' => 'Acme Corporation',
                'name' => 'Corporate Website Redesign',
                'description' => "Redesign and modernize the company's corporate website.",
                'status' => ProjectStatus::IN_PROGRESS,
                'priority' => ProjectPriority::HIGH,
                'start_date' => '2026-06-01',
                'due_date' => '2026-07-15',
            ],
            [
                'client_name' => 'GreenLeaf Cafe',
                'name' => 'Online Ordering System',
                'description' => 'Develop an online ordering platform for customers.',
                'status' => ProjectStatus::PLANNING,
                'priority' => ProjectPriority::MEDIUM,
                'start_date' => '2026-06-10',
                'due_date' => '2026-08-01',
            ],
            [
                'client_name' => 'Bright Realty',
                'name' => 'Property Listing Portal',
                'description' => 'Build a portal for managing property listings.',
                'status' => ProjectStatus::ON_HOLD,
                'priority' => ProjectPriority::MEDIUM,
                'start_date' => '2026-05-15',
                'due_date' => '2026-07-30',
            ],
            [
                'client_name' => 'Nova Fitness',
                'name' => 'Mobile App MVP',
                'description' => 'Develop the first version of the fitness tracking app.',
                'status' => ProjectStatus::IN_PROGRESS,
                'priority' => ProjectPriority::HIGH,
                'start_date' => '2026-06-05',
                'due_date' => '2026-08-20',
            ],
            [
                'client_name' => 'Blue Ocean Travel',
                'name' => 'Booking Platform Enhancement',
                'description' => 'Improve search and booking functionalities.',
                'status' => ProjectStatus::COMPLETED,
                'priority' => ProjectPriority::MEDIUM,
                'start_date' => '2026-04-01',
                'due_date' => '2026-05-30',
            ],
            [
                'client_name' => 'TechVision Solutions',
                'name' => 'CRM Dashboard',
                'description' => 'Develop an internal CRM dashboard.',
                'status' => ProjectStatus::PLANNING,
                'priority' => ProjectPriority::HIGH,
                'start_date' => '2026-06-15',
                'due_date' => '2026-08-15',
            ],
            [
                'client_name' => 'Urban Living',
                'name' => 'Property Management System',
                'description' => 'Create a platform for managing rental properties.',
                'status' => ProjectStatus::IN_PROGRESS,
                'priority' => ProjectPriority::MEDIUM,
                'start_date' => '2026-05-20',
                'due_date' => '2026-08-10',
            ],
            [
                'client_name' => 'Elite Events',
                'name' => 'Event Registration Portal',
                'description' => 'Develop a registration and ticketing portal.',
                'status' => ProjectStatus::PLANNING,
                'priority' => ProjectPriority::LOW,
                'start_date' => '2026-06-20',
                'due_date' => '2026-09-01',
            ],
            [
                'client_name' => 'HealthFirst Clinic',
                'name' => 'Patient Appointment System',
                'description' => 'Build an appointment scheduling application.',
                'status' => ProjectStatus::COMPLETED,
                'priority' => ProjectPriority::HIGH,
                'start_date' => '2026-03-01',
                'due_date' => '2026-05-01',
            ],
            [
                'client_name' => 'MarketPro',
                'name' => 'Marketing Campaign Dashboard',
                'description' => 'Track and manage digital marketing campaigns.',
                'status' => ProjectStatus::IN_PROGRESS,
                'priority' => ProjectPriority::MEDIUM,
                'start_date' => '2026-06-01',
                'due_date' => '2026-07-31',
            ],
            [
                'client_name' => 'Sunrise Education',
                'name' => 'Learning Management Portal',
                'description' => 'Develop a portal for students and instructors.',
                'status' => ProjectStatus::PLANNING,
                'priority' => ProjectPriority::HIGH,
                'start_date' => '2026-07-01',
                'due_date' => '2026-09-30',
            ],
            [
                'client_name' => 'FreshFarm',
                'name' => 'Inventory Management System',
                'description' => 'Track inventory across multiple locations.',
                'status' => ProjectStatus::ON_HOLD,
                'priority' => ProjectPriority::LOW,
                'start_date' => '2026-05-01',
                'due_date' => '2026-08-01',
            ],
        ];

        foreach ($projects as $data) {
            Project::create([
                'client_name' => $data['client_name'],
                'name' => $data['name'],
                'description' => $data['description'],
                'status' => $data['status'],
                'priority' => $data['priority'],
                'start_date' => $data['start_date'],
                'due_date' => $data['due_date'],
            ]);
        }
    }
}
