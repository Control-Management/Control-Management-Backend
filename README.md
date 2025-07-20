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

---

## Descripción

Este proyecto es una API REST desarrollada con NestJS para la gestión de contenedores en una empresa de almacenes. Permite la administración de usuarios y contenedores, incluyendo autenticación, registro y operaciones CRUD sobre los contenedores.

---

## Configuración del proyecto

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor en modo desarrollo:
   ```bash
   npm run start:dev
   ```
3. El servidor estará disponible en: `http://localhost:3000`

---

## Endpoints principales

Base URL: `http://localhost:3000/api/v1`

### Autenticación

- **POST** `/auth/sign-in`
  - Iniciar sesión.
  - Body ejemplo:
    ```json
    {
      "email": "usuario@correo.com",
      "password": "tu_contraseña"
    }
    ```

- **POST** `/auth/sign-up`
  - Registrar un nuevo usuario.
  - Body ejemplo:
    ```json
    {
      "email": "usuario@correo.com",
      "password": "tu_contraseña",
      "username": "Juan",
      "thumbnail": "https://url-de-tu-imagen.com/avatar.png"
    }
    ```

### Contenedores

- **POST** `/api/v1/containers`  
  Crea un nuevo contenedor.  
  **Body de ejemplo:**
  ```json
  {
    "name": "Caja de frutas",
    "type": "Fruits",
    "userId": 1,
    "description": "Contenedor para frutas"
  }
  ```

- **GET** `/containers`
  - Obtiene todos los contenedores.

- **GET** `/containers/:userId`
  - Obtiene contenedores por ID de usuario.

- **GET** `/containers/:type`
  - Obtiene contenedores por tipo.

- **PUT** `/containers/:id`
  - Actualiza un contenedor por ID.
  - Body ejemplo:
    ```json
    {
      "nombre": "Contenedor Actualizado",
      "tipo": "tipoB"
    }
    ```

- **DELETE** `/containers/:id`
  - Elimina un contenedor por ID.

---

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
