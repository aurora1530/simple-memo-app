dev
	docker compose --file compose.yaml --file compose-development.yaml up -d

prod
	docker compose --file compose.yaml --file compose-production.yaml up --build