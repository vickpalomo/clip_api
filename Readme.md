[![Build Status](https://cloud.drone.io/api/badges/vickpalomo/clip_api/status.svg)](https://cloud.drone.io/vickpalomo/clip_api)
[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/dashboard?id=vickpalomo%3Aclip_api)
# Prueba Backend Clip

_Api desarrollada con node y express para resolver la prueba de backend de Clip_

### Pre-requisitos 📋

* Docker version 20.10.8
* docker-compose version 1.29.2
* node v12.22.3
* npm 6.14.13

## Comenzando 🚀

_Clona el repositorio del proyecto_
```
  git clone git@github.com:vickpalomo/clip_api.git
```
### Configuración 🔧

_Renombrar el archivo example.env a .env_

_Para ejecutar el proyecto con nodejs_

* Instalar dependencias del proyecto

```
  npm install
```

* Levantar el proyecto usando nodemon, este paquete le permitira reiniciar el servidor cada vez que detecte un cambio en los archivos
```
  npm run dev
```

### Configuración con Docker 🔧

* Dentro de la carpeta del proyecto ejecute
```
  docker-compose up -d
```
* Esto creara los contenedores de la base de datos y la api

## Corriendo migraciones ⚙️

* Para crear las tablas de la base de datos ejecute
```
  npx sequelize-cli db:migrate 
```

* El servidor se levanta en el puerto 3000
```
  http://localhost:3000
```

## Ejecutando las pruebas ⚙️

* Para realizar las pruebas automatizadas, ejecute
```
  npm run test
```

## Consultando los endpoints ⚙️

_Revisar la documentación de la api_

* El proyecto esta hosteado en un vps de aws, puede hacer peticiones a la siguiente url completando el path:
```
  http://3.134.243.162/
```

* La documentación de la API la encuentra en:
```
  http://localhost:3000/api-docs/
```

## Construccion CD/CI 🛠️

_El proyecto construye una imagen docker, siguiendo un pipeline hecho con drone.io, hace un analisis de codigo con sonarqube y por ultimo sube la imagen al docker hub para que sea visible para cualquier persona._

* [Drone](https://docs.drone.io/) - Servidor CI/CD.
* [Docker Hub](https://hub.docker.com/) - Usado como repositorio de Imagenes
* [Sonarqube](https://docs.sonarqube.org/latest/) - Servidor para analisis de Codigo y Seguridad.
* [Contenedor](https://hub.docker.com/r/vickpalomo/clip-api) - Contenedor con el proyecto
* [Dashboard Sonar](https://sonarcloud.io/dashboard?id=vickpalomo%3Aclip_api) - Dashboard Sonar
* [Dashboard Drone](https://cloud.drone.io/vickpalomo/clip_api) - Dashboard Drone

## Autores ✒️

* **Victor Manuel Palomo Yama** - *Backend Developer* - [vickpalomo](http://github.com/vickpalomo)