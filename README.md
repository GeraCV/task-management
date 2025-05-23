# Task Management

El proyecto es una prueba técnica de un CRUD de tareas.

#####   Pasos para levantar el proyecto:

1. Instala **NodeJS**.
1. Instala **MySQL Server** utilizando **MySQL Installer** junto con una herramienta para gestión de bases de datos como **MySQL Workbench**, **HeidiSQL** o **phpMyAdmin** (incluido por defecto en entornos como *XAMPP* O *WAMP*).
1. Descarga el proyecto o clonalo en alguna carpeta de tu sistema.
1. Ejecutar el archivo `tasks-management.sql` en tu entorno de base de datos, este archivo se encuentra en la raíz del proyecto.
1. Abre el proyecto en tu terminal.
1. Ejecuta el comando `cd client`, y después `npm install` para descargar las dependencias del frontend.
1. Una vez se hayan descargado las dependencias, crea un archivo `.env` dentro de la misma carpeta client e ingresa
lo siguiente:

    `VITE_API_URL=http://localhost:3000`

    _VITE_API_URL_ es la URL que tendrá tu servidor de backend. Al levantar el servidor backend por defecto será en el puerto 3000, si decides cambiarlo, ajusta el valor de la variable. Después ejecuta el comando `npm run dev`. Si todo funciona bien, se mostrará en consola algo como lo siguiente:
    Local:   http://localhost:5173/
1. Abre nuevamente el proyecto en otra terminal y ejecuta el comando `cd server`, después `npm install` para descargar las dependencias del backend.
1. Una vez se hayan descargado las dependencias, crea un archivo `.env` dentro de la misma carpeta server e ingresa
lo siguiente:

    `DB_HOST=localhost`
    `DB_USER=root`
    `DB_PASSWORD=`
    `DB_PORT=3306`
    `DB_DATABASE=taskmanagement`
    `CLIENT_URL=http://localhost:5173`

    _CLIENT_URL_ es la URL que genera vite al levantar el servidor frontend. Modifica las variables si así lo requieres. Ejecuta el comando `npm run serve` Si todo funciona bien, se mostrará en consola algo como lo siguiente:
    Server running on port: 3000
1. Después de eso puedes dirigirte a tu navegador y escribir en el apartado de la URL: http://localhost:5173/
1. Podrás visualizar una lista de tareas, y los elementos correspondientes para sus operaciones CRUD.
1. Si navegas a http://localhost:5173/user podrás realizar las mismas operaciones con los usuarios.