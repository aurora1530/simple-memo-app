dev:
	docker compose --file compose.yaml --file compose-development.yaml up -d

dev-build:
	docker compose --file compose.yaml --file compose-development.yaml up -d --build

prod:
	docker compose --file compose.yaml --file compose-production.yaml up --build