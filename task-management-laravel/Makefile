SAIL := ./vendor/bin/sail

# Colors
CYAN  := \033[36m
GREEN := \033[32m
YELLOW:= \033[33m
BOLD  := \033[1m
RESET := \033[0m

.DEFAULT_GOAL := help
.PHONY: help bash start remove restart generate-key migrate migrate-fresh \
        migrate-fresh-seed optimize-clear wait-db setup

##@ General

help: ## Show this help message
	@printf "\n$(BOLD)Usage:$(RESET) make $(CYAN)<target>$(RESET)\n"
	@awk 'BEGIN {FS = ":.*##"} \
		/^##@/ { printf "\n$(YELLOW)%s$(RESET)\n", substr($$0, 5) } \
		/^[a-zA-Z_-]+:.*##/ { printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

##@ Containers

start: ## Start the Sail containers
	@printf "$(GREEN)▶ Starting Sail containers...$(RESET)\n"
	@$(SAIL) up -d
	@printf "$(GREEN)✔ Containers are up$(RESET)\n"

remove: ## Stop and remove the Sail containers
	@printf "$(YELLOW)■ Stopping and removing containers...$(RESET)\n"
	@$(SAIL) down
	@printf "$(GREEN)✔ Containers removed$(RESET)\n"

restart: ## Restart the Sail containers
	@printf "$(YELLOW)↻ Restarting containers...$(RESET)\n"
	@$(SAIL) down
	@$(SAIL) up -d
	@printf "$(GREEN)✔ Containers restarted$(RESET)\n"

bash: ## Open a bash shell in the Sail container
	@$(SAIL) shell

##@ Application

generate-key: ## Generate a new application key
	@printf "$(GREEN)▶ Generating application key...$(RESET)\n"
	@$(SAIL) artisan key:generate

optimize-clear: ## Clear config, route, view and other caches
	@printf "$(GREEN)▶ Clearing caches...$(RESET)\n"
	@$(SAIL) artisan optimize:clear
	@printf "$(GREEN)✔ Caches cleared$(RESET)\n"

##@ Database

migrate: ## Run database migrations
	@printf "$(GREEN)▶ Running migrations...$(RESET)\n"
	@$(SAIL) artisan migrate
	@printf "$(GREEN)✔ Migrations complete$(RESET)\n"

migrate-fresh: ## Drop all tables and re-run all migrations
	@printf "$(YELLOW)⚠ Dropping all tables and re-running migrations...$(RESET)\n"
	@$(SAIL) artisan migrate:fresh
	@printf "$(GREEN)✔ Database refreshed$(RESET)\n"

migrate-fresh-seed: ## Drop all tables, re-run migrations, and seed the database
	@printf "$(YELLOW)⚠ Dropping all tables, re-running migrations and seeding...$(RESET)\n"
	@$(SAIL) artisan migrate:fresh --seed
	@printf "$(GREEN)✔ Database refreshed and seeded$(RESET)\n"

wait-db:
	@printf "$(CYAN)… Waiting for MySQL to be ready$(RESET)"
	@until $(SAIL) exec mysql mysqladmin ping --silent >/dev/null 2>&1; do \
		printf "."; sleep 2; \
	done
	@printf "\n$(GREEN)✔ MySQL is ready$(RESET)\n"

##@ Setup

setup: ## Full setup: containers, .env, app key, migrations and seeders
	@printf "\n$(BOLD)Setting up the application$(RESET)\n\n"
	@printf "$(BOLD)[1/5]$(RESET) Removing old containers\n"
	@$(MAKE) --no-print-directory remove
	@printf "$(BOLD)[2/5]$(RESET) Preparing .env\n"
	@if [ ! -f .env ]; then cp .env.example .env && printf "$(GREEN)✔ Created .env from .env.example$(RESET)\n"; \
	else printf "$(CYAN)• .env already exists, keeping it$(RESET)\n"; fi
	@printf "$(BOLD)[3/5]$(RESET) Starting containers\n"
	@$(MAKE) --no-print-directory start
	@$(MAKE) --no-print-directory wait-db
	@printf "$(BOLD)[4/5]$(RESET) Generating application key\n"
	@$(MAKE) --no-print-directory generate-key
	@printf "$(BOLD)[5/5]$(RESET) Migrating and seeding database\n"
	@$(MAKE) --no-print-directory migrate-fresh-seed
	@printf "\n$(GREEN)$(BOLD)🎉 Setup complete!$(RESET)\n\n"