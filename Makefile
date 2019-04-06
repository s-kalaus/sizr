development:
	@cd docker/sizr-node && docker build -t sizr-node .
	@cd docker/sizr-build && docker build -t sizr-build .
	@cd docker && docker-compose up -d --build

rebuild:
	@cd docker && docker-compose build --no-cache

down:
	@cd docker && docker-compose down

ssh:
	@cd docker && docker-compose exec sizr-runner-development bash

ssh-mysql:
	@cd docker && docker-compose exec -u root sizr-mysql-development bash

ssh-rabbitmq:
	@cd docker && docker-compose exec sizr-rabbitmq-development bash

ssh-nginx:
	@cd docker && docker-compose exec sizr-nginx-development bash

test:
	@npm i
	@npm run jscpd
	@npm run lint
	@npm run test

build-prod:
	@sh ./bin/build.sh prod ${CI_JOB_ID}

rebuild-prod:
	@cd docker && docker-compose -f docker-compose-prod.yml build --no-cache

rebuild-prod-soft:
	@cd docker && docker-compose -f docker-compose-prod.yml build

prod:
	@cd docker/sizr-node && docker build -t sizr-node .
	@cd docker && docker-compose -f docker-compose-prod.yml up -d --build

down-prod:
	@cd docker && docker-compose -f docker-compose-prod.yml down

ssh-prod:
	@cd docker && docker-compose -f docker-compose-prod.yml exec sizr-runner-prod bash

ssh-prod-mysql:
	@cd docker && docker-compose -f docker-compose-prod.yml exec -u root sizr-mysql-prod bash

ssh-prod-rabbitmq:
	@cd docker && docker-compose -f docker-compose-prod.yml exec sizr-rabbitmq-prod bash

ssh-prod-nginx:
	@cd docker && docker-compose -f docker-compose-prod.yml exec sizr-nginx-prod bash
