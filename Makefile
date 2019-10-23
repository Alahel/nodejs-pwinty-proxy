-include Makefile.override

.PHONY: up
up:
	docker-compose up --build -d

.PHONY: down
down:
	docker-compose down --remove-orphans
