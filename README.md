# Reservaloo - Proyecto Desarrollo Web 2024/2025 

Reservaloo es un proyecto de desarrollo web que permite a los usuarios reservar espacios para los eventos, que serán gestionados por los administradores, al igual que los espacios físicos.   

## Arquitectura y Tecnologías

Este proyecto está desarrollado utilizando principalmente Node.js, Express, React, Tailwind CSS, MySQL y Docker. Aunque también se han utilizado otras tecnologías como Handlebars y Bootstrap para servir la UI en el lado del servidor con SSR en algunas ventanas de la aplicación, para probar dichas tecnologías.

El poryecto está dividido en dos partes principales: el backend y el frontend.

## 🛠️ Backend (Node.js + Express + MySQL)

### 📂 Instrucciones para levantar el backend:


```bash
cd backend
docker-compose up -d  # Para levantar la BBDD en un contenedor Docker
npm install # Para instalar las dependencias del backend, solo la 1º vez
npm start
```
Esto levantará el servidor en: [http://localhost:3000](http://localhost:3000)


## 🚀 Frontend (React + TailwindCSS)

### 📂 Instrucciones para levantar el frontend:

```bash
cd frontend
npm install # para instalar las dependencias del frontend, solo la 1º vez
npm run dev
```
En el navegador, abrir la siguiente URL: [http://localhost:5173](http://localhost:5173)

## Imágenes del proyecto

### Vista principal de usuario

![Vista principal de usuario](https://raw.githubusercontent.com/antncaballero/Proyecto-DAWEB/main/imagenes-readme/principal-user.png)

### Vista de usuario: Reservar espacio

![Vista de usuario](https://raw.githubusercontent.com/antncaballero/Proyecto-DAWEB/main/imagenes-readme/espacio-user.png)

### Vista de administrador: Gestión de eventos

![Vista de administrador](https://raw.githubusercontent.com/antncaballero/Proyecto-DAWEB/main/imagenes-readme/eventos-admin.png)

### Vista de reservas de usuario

![Reservas de usuario](https://raw.githubusercontent.com/antncaballero/Proyecto-DAWEB/main/imagenes-readme/reservas-user.png)

### Vista de reserva de plazas

![Reserva de plazas](https://raw.githubusercontent.com/antncaballero/Proyecto-DAWEB/main/imagenes-readme/reservaplazas-user.png)

### Vista responsive de la vista principal de usuario

![Vista responsive](https://raw.githubusercontent.com/antncaballero/Proyecto-DAWEB/main/imagenes-readme/responsive-user.png)
