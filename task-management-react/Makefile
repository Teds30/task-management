# Colors
CYAN  := \033[36m
GREEN := \033[32m
YELLOW:= \033[33m
BOLD  := \033[1m
RESET := \033[0m

.DEFAULT_GOAL := help
.PHONY: help install dev typecheck build start remove restart logs

##@ General

help: ## Show this help message
	@printf "\n$(BOLD)Usage:$(RESET) make $(CYAN)<target>$(RESET)\n"
	@awk 'BEGIN {FS = ":.*##"} \
		/^##@/ { printf "\n$(YELLOW)%s$(RESET)\n", substr($$0, 5) } \
		/^[a-zA-Z_-]+:.*##/ { printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

##@ Development

install: ## Install frontend dependencies
	@printf "$(GREEN)▶ Installing dependencies...$(RESET)\n"
	@npm install
	@printf "$(GREEN)✔ Dependencies installed$(RESET)\n"

dev: ## Start the Vite development server
	@printf "$(GREEN)▶ Starting development server...$(RESET)\n"
	@npm run dev

typecheck: ## Generate route types and run TypeScript checks
	@printf "$(GREEN)▶ Running type checks...$(RESET)\n"
	@npm run typecheck
	@printf "$(GREEN)✔ Type checks passed$(RESET)\n"

build: ## Build the frontend
	@printf "$(GREEN)▶ Building frontend...$(RESET)\n"
	@npm run build
	@printf "$(GREEN)✔ Build complete$(RESET)\n"

##@ Containers

start: ## Build and start the Docker Compose service
	@printf "$(GREEN)▶ Building and starting container...$(RESET)\n"
	@docker compose up --build -d
	@printf "$(GREEN)✔ Container is up$(RESET)\n"

remove: ## Stop and remove the Docker Compose services
	@printf "$(YELLOW)■ Stopping and removing containers...$(RESET)\n"
	@docker compose down
	@printf "$(GREEN)✔ Containers removed$(RESET)\n"

restart: ## Restart the Docker Compose service
	@printf "$(YELLOW)↻ Restarting containers...$(RESET)\n"
	@docker compose down
	@docker compose up --build -d
	@printf "$(GREEN)✔ Containers restarted$(RESET)\n"

logs: ## Follow the service logs
	@docker compose logs -f react