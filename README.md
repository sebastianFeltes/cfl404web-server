# cfl404web-server

Servidor web para la aplicacion del centro de formacion laboral 404 de berisso

## Descripcion
El servidor web esta hecho con express y se encarga de:
- Manejar las rutas de la aplicacion
- Manejar los middlewares
- Manejar los errores
- Manejar la autenticacion
- Manejar la autorizacion
- Manejar la seguridad

## Funcionalidades

- Altas, bajas, modificaciones y consultas de usuarios
- Altas, bajas, modificaciones y consultas de roles
- Altas, bajas, modificaciones y consultas de permisos
- Altas, bajas, modificaciones y consultas de alumnos
- Altas, bajas, modificaciones y consultas de docentes
- Altas, bajas, modificaciones y consultas de cursos
- Altas, bajas, modificaciones y consultas de inscripciones

## Tecnologias

- Express: framework web
- MySQL: base de datos
- Sequelize: ORM
- JWT: autenticacion
- Zod: validacion de datos
- Cors: seguridad
- Morgan: logging
- Bcrypt: encriptacion
- Cron: programacion de tareas
- Temporal-polyfill: polyfill para temporal y el manejo de fechas
- Nodemon: desarrollo

## Directorios

- src: directorio principal
- src/controllers: controladores
- src/config: configuraciones
- src/database: base de datos
- src/middlewares: middlewares
- src/schemas: esquemas de validacion
- src/models: modelos
- src/routes: rutas
- src/utils: funciones utiles

## Instalacion

```bash
npm install
```

## Ejecucion

```bash
npm run dev
```
