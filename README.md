# Epsa Historical

Este repositorio contiene dos proyectos: uno desarrollado con Angular y otro con Node.js. Además, se incluye un archivo `docker-compose.yml` para la configuración de una base de datos con Docker Compose.

## Web

El proyecto de Angular se encuentra en la carpeta `web/`. Proporciona una aplicación web desarrollada con Angular X que muestra una interfaz de usuario interactiva.

### Instalación

1. Asegúrate de tener Node.js y Angular CLI instalados en tu sistema.
2. Navega a la carpeta `web/`.
3. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```
   npm install
   ```

### Ejecución

1. En la carpeta `web/`, ejecuta el siguiente comando para iniciar la aplicación de Angular:

   ```
   ng serve
   ```

2. Abre tu navegador y accede a `http://localhost:4200` para ver la aplicación en funcionamiento.

## Backend

El proyecto de Node.js se encuentra en la carpeta `server/`. Proporciona una API RESTful desarrollada con Node.js y Express.

### Instalación

1. Asegúrate de tener Node.js instalado en tu sistema.
2. Navega a la carpeta `server/`.
3. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```
   npm install
   ```

### Ejecución

1. En la carpeta `server/`, ejecuta el siguiente comando para iniciar el servidor Node.js:

   ```
   npm start
   ```

2. El servidor estará disponible en `http://localhost:3000`.

## Base de datos con Docker Compose

Se incluye un archivo `docker-compose.yml` para configurar una base de datos utilizando Docker Compose. Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

### Configuración

1. Abre el archivo `docker-compose.yml` en un editor de texto.
2. Personaliza los parámetros de configuración de la base de datos según tus necesidades.
3. Guarda los cambios.

### Ejecución

1. En la raíz del proyecto, ejecuta el siguiente comando para iniciar los contenedores de la base de datos:

   ```
   docker-compose up -d
   ```

2. Los contenedores de la base de datos estarán en funcionamiento y listos para ser utilizados por la aplicación de Node.js.

> **_NOTA:_**  Recuerda seguir los pasos y leer los comentarios
