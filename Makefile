#!/usr/bin/make -f
.SILENT:
.PHONY: help build up uplog down ssh clean freespace

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Exibe as instruções de uso.
help:
	printf "${COLOR_COMMENT}Uso:${COLOR_RESET}\n"
	printf " make [comando]\n\n"
	printf "${COLOR_COMMENT}Comandos disponíveis:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Constroi a imagem.
build:
	@echo 🐳👔 Construindo as imagens.
	docker-compose build

## Inicia a aplicação.
up:
	make build
	docker-compose up -d
	make migration

## Inicia a aplicação sem deligar o log do container
uplog:
	make build
	docker-compose up

## Desliga a aplicação.
down:
	@echo 🔴 Desligando os serviços.
	docker-compose down

## Conecta-se ao container node.
ssh:
	docker-compose exec skeleton_node ash

## Exibe os logs da aplicação.
logs: 
	docker-compose logs -f

## Executa os testes da aplicação.
test:
	@echo ► Executando testes
	docker-compose exec skeleton_node npm run test

## Executa os comandos de migração do prisma.
migration:
	@echo 💾 Executando migração
	docker-compose exec skeleton_node npm run migration

## Prisma Studio.
prisma-studio:
	@echo ⚙️   Prisma Studio
	docker-compose exec skeleton_node npm run prisma:studio

## Apaga arquivos gerados dinâmicamente pelo projeto (containers docker, modules, etc)
clean:
	@echo 🗑️ Removendo arquivos gerados automaticamente pelo projeto.
	sudo rm -rf app/node_modules/
	docker-compose down --rmi local --remove-orphans --volumes

## Libera espaço em disco (apaga dados do docker em desuso)
freespace:
	@echo 🗑️ Apagando arquivos do Docker que não estão sendo utilizados
	docker system prune --all --volumes --force

prod:
	docker-compose -f docker-compose-prod.yml build
	docker-compose -f docker-compose-prod.yml up -d