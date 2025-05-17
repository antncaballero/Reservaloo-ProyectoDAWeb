-- Eliminamos tablas si ya existen (por orden de dependencias)
-- DROP TABLE IF EXISTS reservas;
-- DROP TABLE IF EXISTS eventos;
-- DROP TABLE IF EXISTS espacios;
-- DROP TABLE IF EXISTS usuarios;

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  rol VARCHAR(20),
  CHECK (rol IN ('gestor', 'usuario'))
);

-- Tabla espacios
CREATE TABLE IF NOT EXISTS espacios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  propietario VARCHAR(100),
  capacidad INT,
  direccion TEXT,
  descripcion TEXT,
  estado VARCHAR(20),
  imagen TEXT,
  CHECK (estado IN ('ACTIVO', 'CERRADO'))
);

-- Tabla eventos
CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  organizador VARCHAR(100),
  plazas INT,
  categoria VARCHAR(50),
  cancelado BOOLEAN,
  fecha_inicio DATE,
  fecha_fin DATE,
  espacio_id INT,
  imagen TEXT,
  FOREIGN KEY (espacio_id) REFERENCES espacios(id),
  CHECK (categoria IN ('ACADEMICOS', 'CULTURALES', 'ENTRETENIMIENTO', 'DEPORTES', 'OTROS'))
);

-- Tabla reservas
CREATE TABLE IF NOT EXISTS reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  evento_id INT,
  cantidad INT,
  fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (evento_id) REFERENCES eventos(id)
);

-- Insertar usuarios
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Ana Ballesta', 'ana@daweb.com', 'pass', 'gestor'),
('Luis Caballero', 'luis@daweb.com', 'pass', 'usuario'),
('Marta Abenza', 'marta@daweb.com', 'pass', 'usuario'),
('Carlos Ruiz', 'carlos@daweb.com', 'pass', 'gestor'),
('Elena Torres', 'elena@daweb.com', 'pass', 'usuario');

-- Insertar espacios
INSERT INTO espacios (nombre, propietario, capacidad, direccion, descripcion, estado, imagen) VALUES
('Auditorio Central', 'Ana Ballesta', 200, 'Av. Universidad 123', 'Auditorio para eventos grandes', 'ACTIVO', 'https://th.bing.com/th/id/OIP.Hixd5vQqo0YMmxvVlSTfDAHaE8?rs=1&pid=ImgDetMain'),
('Sala de Conferencias 1', 'Carlos Ruiz', 50, 'Calle 10 #45-20', 'Sala equipada con proyector', 'ACTIVO', 'https://th.bing.com/th/id/OIP.lFzdi24wxELce4Nd4idOgAHaFj?rs=1&pid=ImgDetMain'),
('Cancha de Fútbol', 'Ana Ballesta', 22, 'Parque Municipal', 'Espacio al aire libre', 'ACTIVO', 'https://th.bing.com/th/id/OIP.zDyEhLdNgZ9zAmv1RdNt4AHaEK?rs=1&pid=ImgDetMain'),
('Salón Cultural', 'Carlos Ruiz', 100, 'Centro Cultural, piso 2', 'Ideal para eventos artísticos', 'CERRADO', 'https://th.bing.com/th/id/OIP.Hixd5vQqo0YMmxvVlSTfDAHaE8?rs=1&pid=ImgDetMain'),
('Aula 204', 'Ana Ballesta', 30, 'Edificio B, segundo piso', 'Aula para talleres académicos', 'ACTIVO', 'https://th.bing.com/th/id/OIP.tyfWl3sBrKIW5M8GuAJMlQHaEK?rs=1&pid=ImgDetMain');

-- Insertar eventos
INSERT INTO eventos (nombre, descripcion, organizador, plazas, categoria, cancelado, fecha_inicio, fecha_fin, espacio_id, imagen) VALUES
('Conferencia de Tecnología', 'Evento sobre innovación y tecnología', 'Ana Ballesta', 150, 'ACADEMICOS', FALSE, '2025-05-10', '2025-05-10', 1, 'https://th.bing.com/th/id/OIP.Hixd5vQqo0YMmxvVlSTfDAHaE8?rs=1&pid=ImgDetMain'),
('Taller de Escritura Creativa', 'Aprende técnicas narrativas', 'Carlos Ruiz', 25, 'CULTURALES', FALSE, '2025-05-12', '2025-05-12', 5, 'https://th.bing.com/th/id/OIP.JOi9y7g9xagFFNm5iCsGlAHaE8?rs=1&pid=ImgDetMain'),
('Partido de Fútbol Amistoso', 'Encuentro deportivo entre facultades', 'Ana Ballesta', 22, 'DEPORTES', FALSE, '2025-05-15', '2025-05-15', 3, 'https://th.bing.com/th/id/OIP.zDyEhLdNgZ9zAmv1RdNt4AHaEK?rs=1&pid=ImgDetMain'),
('Feria del Libro', 'Exposición de editoriales y autores', 'Carlos Ruiz', 80, 'CULTURALES', TRUE, '2025-04-20', '2025-04-22', 4, 'https://th.bing.com/th/id/OIP.JOi9y7g9xagFFNm5iCsGlAHaE8?rs=1&pid=ImgDetMain'),
('Cine al Aire Libre', 'Proyección gratuita de películas', 'Ana Ballesta', 100, 'ENTRETENIMIENTO', FALSE, '2025-05-18', '2025-05-18', 3, 'https://th.bing.com/th/id/OIP.onHirexJ4IsNUTMjbYKDRQHaEK?rs=1&pid=ImgDetMain'),
('Concierto de Jazz', 'Noche de música en vivo', 'Elena Torres', 80, 'ENTRETENIMIENTO', FALSE, '2025-05-22', '2025-05-22', 1, 'https://th.bing.com/th/id/OIP.5eYyoWKMP1-TUdaIg_AJpgHaE8?rs=1&pid=ImgDetMain'),
('Concierto de Rock', 'Presentación de bandas locales', 'Carlos Ruiz', 200, 'ENTRETENIMIENTO', FALSE, '2025-05-20', '2025-05-20', 1, 'https://th.bing.com/th/id/OIP.5eYyoWKMP1-TUdaIg_AJpgHaE8?rs=1&pid=ImgDetMain'),
('Exposición de Arte', 'Muestra de artistas emergentes', 'Ana Ballesta', 50, 'CULTURALES', FALSE, '2025-05-25', '2025-05-27', 4, 'https://th.bing.com/th/id/OIP.JOi9y7g9xagFFNm5iCsGlAHaE8?rs=1&pid=ImgDetMain');

-- Insertar reservas
INSERT INTO reservas (usuario_id, evento_id, cantidad) VALUES
(2, 1, 2),
(3, 2, 1),
(5, 3, 2),
(2, 5, 1),
(3, 5, 1);

