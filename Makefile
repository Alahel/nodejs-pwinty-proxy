-include Makefile.override

.PHONY: up down
up:
	docker-compose up --build -d

down:
	docker-compose down --remove-orphans
