<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

NestJS es un framework de Node.js progresivo para construir aplicaciones del lado del servidor eficientes y escalables. Este repositorio de inicio está configurado con NestJS y Prisma ORM para interactuar con una base de datos PostgreSQL.

## Tecnologías utilizadas

- [NestJS](https://nestjs.com/) - Framework de Node.js.
- [Prisma ORM](https://www.prisma.io/) - ORM para gestionar la base de datos PostgreSQL.

## Requisitos previos

- [Node.js](https://nodejs.org/) (recomendado la última versión LTS).
- [PostgreSQL](https://www.postgresql.org/) - Base de datos.
- [Prisma CLI](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project) - Utilizado para interactuar con la base de datos PostgreSQL.

## Configuración del proyecto

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio


Instala las dependencias:
npm install

basede datos:
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/transaction"
Asegúrate de reemplazar usuario, contraseña y nest_project_db con los valores correctos para tu entorno.

Genera las migraciones de Prisma:
npx prisma migrate dev


Compilar y ejecutar el proyecto:
npm run start:dev


Pruebas unitarias:
npm run test


src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt-auth.guard.ts
│   └── jwt.strategy.ts
├── product/
│   ├── dto/
│   ├── product.controller.ts
│   ├── product.module.ts
│   └── product.service.ts
├── transaction/
│   ├── dto/
│   ├── transaction-payment.service.ts
│   ├── transaction.controller.ts
│   ├── transaction.module.ts
│   └── transaction.service.ts
├── user/
│   ├── dto/
│   │   └── create-user.dto.ts
│   ├── user.controller.ts
│   ├── user.module.ts
│   └── user.service.ts
├── app.module.ts
└── main.ts
