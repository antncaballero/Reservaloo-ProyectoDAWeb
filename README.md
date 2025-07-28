# Reservaloo - Proyecto Desarrollo Web 2024/2025 

Reservaloo es un proyecto de desarrollo web que permite a los usuarios reservar espacios para los eventos, que serán gestionados por los administradores, al igual que los espacios físicos.   

## ⚙️ Arquitectura y Tecnologías

Este proyecto está desarrollado utilizando principalmente Node.js, Express, React, Tailwind CSS, MySQL y Docker como tecnologías. Aunque también se han utilizado otras tecnologías como Handlebars y Bootstrap para servir una mínima parte de la UI con Server-Side Rendering, para probar dichas tecnologías.

El proyecto está dividido en dos partes principales: el backend, que se encarga de la lógica de negocio y la gestión de datos, y el frontend, que se encarga de la presentación y la interacción con el usuario.

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

## 📸 Imágenes del proyecto

Aquí se muestran algunas capturas de pantalla de las vistas principales del proyecto, tanto del usuario como del administrador, no se muestran todas las vistas, ya que son demasiadas, pero sí algunas de las más relevantes.

#### Vista principal de usuario

![Vista principal de usuario](https://github.com/antncaballero/Proyecto-DAWEB/blob/main/imagenes-readme/principal-user.png)

#### Vista de usuario: Eventos asociados a un espacio

![Vista de usuario](https://github.com/antncaballero/Proyecto-DAWEB/blob/main/imagenes-readme/espacio-user.png)

#### Vista de administrador: Gestión de eventos

![Vista de administrador](https://github.com/antncaballero/Proyecto-DAWEB/blob/main/imagenes-readme/eventos-admin.png)

#### Vista de reservas de usuario

![Reservas de usuario](https://github.com/antncaballero/Proyecto-DAWEB/blob/main/imagenes-readme/reservas-user.png)

#### Vista de evento y de reserva de plazas

![Reserva de plazas](https://github.com/antncaballero/Proyecto-DAWEB/blob/main/imagenes-readme/reservaplazas-user.png)

#### Vista responsive de la vista principal de usuario

![Vista responsive](https://github.com/antncaballero/Proyecto-DAWEB/blob/main/imagenes-readme/responsive-user.png)
