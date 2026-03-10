.PHONY: dev prod down logs ps build clean

# --- Development
dev:           ## Запуск dev середовища з білдом (з логами в терміналі)
	docker compose up --build

dev-d:         ## Запуск dev середовища у фоні
	docker compose up --build -d

up:			   ## Запуск dev середовища без білду (швидкий старт)
	docker compose up

up-d:		   ## Запуск dev середовища у фоні без білду
	docker compose up -d

# --- Production
prod:          ## Запуск prod середовища з білдом (з логами в терміналі)
	docker compose -f docker-compose.prod.yml up --build

prod-d:        ## Запуск prod середовища у фоні
	docker compose -f docker-compose.prod.yml up --build -d

# --- Stop
down:          ## Зупинити dev контейнери
	docker compose down

down-prod:     ## Зупинити prod контейнери
	docker compose -f docker-compose.prod.yml down

# --- Logs
logs:          ## Переглянути логи всіх сервісів
	docker compose logs -f

logs-backend:  ## Переглянути логи backend
	docker compose logs -f backend

logs-frontend: ## Переглянути логи frontend
	docker compose logs -f frontend

logs-db:       ## Переглянути логи PostgreSQL
	docker compose logs -f postgres

# --- Utils
ps:            ## Показати статус контейнерів
	docker compose ps

build:         ## Перебілдити образи без запуску
	docker compose build

clean:         ## Видалити контейнери + volumes (видаляє дані БД!)
	docker compose down -v --remove-orphans

db-shell:      ## Підключитись до PostgreSQL в терміналі
	docker compose exec postgres psql -U $${POSTGRES_USER:-postgres} -d $${POSTGRES_DB:-theprimemarket_dev}

backend-shell: ## Підключитись до backend контейнера в терміналі
	docker compose exec backend sh

migrate:       ## Виконати міграції Prisma
	docker compose exec backend npx prisma migrate dev

studio:        ## Відкрити Prisma Studio на http://localhost:5555
	docker compose exec backend npx prisma studio