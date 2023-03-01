# Skeleton Node.js (TypeScript)

[![Build Status](https://github-drone.superlogica.com/api/badges/Superlogica/skeleton-nodejs-api/status.svg?ref=refs/heads/staging)](https://github-drone.superlogica.com/Superlogica/skeleton-nodejs-api)
[![Build Status](https://github-drone.superlogica.com/api/badges/Superlogica/skeleton-nodejs-api/status.svg?ref=refs/heads/prod)](https://github-drone.superlogica.com/Superlogica/skeleton-nodejs-api)
[![Bugs](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=bugs)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Code Smells](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=code_smells)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Coverage](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=coverage)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Duplicated Lines (%)](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=duplicated_lines_density)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Lines of Code](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=ncloc)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Quality Gate Status](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=alert_status)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Reliability Rating](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=reliability_rating)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Security Rating](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=security_rating)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Technical Debt](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=sqale_index)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)
[![Vulnerabilities](https://sonar.superlogica.com/api/project_badges/measure?project=skeleton-nodejs&metric=vulnerabilities)](https://sonar.superlogica.com/dashboard?id=skeleton-nodejs)


Projeto chassi desenvolvido com a finalidade de subsidiar a criação de novos microsserviços, provendo funcionalidades importantes e comuns a maior parte das aplicações, tais como `ORM`, `Exception Handler`, `DTO`, `Database Migration`, `Unit Tests`, `API Documentation`, `API Pagination`, `Observability` e `CI/CD`.

## Stack Tecnologica

 - Linguagem: [TypeScript](https://www.typescriptlang.org/)
 - Plataforma/Engine: [Node.js](https://nodejs.org/en/)
 - Framework: [Express](https://expressjs.com/)
 - ORM: [Prisma](https://www.prisma.io/)
 - Documentação da API: [OpenAPI (Swagger)](https://swagger.io/specification/)
 - Gerenciador de Dependências: [npm](https://www.npmjs.com/)
 - Banco de dados: [MySQL](https://www.mysql.com/)
 - Observability: [Datadog](https://app.datadoghq.com)
 - CI/CD: [Drone](https://github-drone.superlogica.com/Superlogica/skeleton-nodejs-api)


## Ambiente Local


Primeiramente, execute o comando abaixo para inicializar o projeto. Vale destacar que a compilação e execução do projeto é feita de dentro do container da aplicação, contudo, instalar as dependências localmente servirá para que teu editor de código-fonte (VS Code, por exemplo) consiga dar os insights corretos do teu código.

```
make up
```

Após instalar as dependências e iniciar os containers, será necessário criar as classes de modelo das entidades de banco de dados baseadas no arquivo `schema.prisma`. Para isso, execute o comando do client do ORM:

```
npx prisma generate
```

Para auxiliar o desenvolvedor em seu ambiente local, todos os comandos foram reduzidos utilizando o [Make](https://opensource.com/article/18/8/what-how-makefile), portanto, para mais informações de quais comandos `make` estão disponíveis, abra o arquivo [`Makefile`](./Makefile) ou simplesmente execute o comando `make help` no seu prompt.


Caso prefira executar todos os comandos manualmente, segue abaixo as instruções:

- Para construir a imagem do container:

```
docker-compose build
```

- Para executar o container:

```
docker-compose up
```

- Para acessar o container da aplicação:

```
docker-compose exec skeleton_node ash
```

- Para acessar o container do banco de dados:

```
docker-compose exec mysql_skeleton_node bash
```

- Para executar a migration do banco de dados, acesse o container da aplicação e execute o seguinte comando:

```
npx prisma db push
```

- Para parar os containers

```
docker-compose stop
```

- Para destruir os containers

```
docker-compose down
```

- Para acessar a documentação da API, acesso http://localhost:8000/api-docs.json
