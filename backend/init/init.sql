-- Eliminamos tablas si ya existen (por orden de dependencias)
DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS eventos;
DROP TABLE IF EXISTS espacios;
DROP TABLE IF EXISTS usuarios;

-- Tabla usuarios
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  rol VARCHAR(20),
  CHECK (rol IN ('gestor', 'usuario'))
);

-- Tabla espacios
CREATE TABLE espacios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  propietario VARCHAR(100),
  capacidad INT,
  direccion TEXT,
  descripcion TEXT,
  estado VARCHAR(20),
  CHECK (estado IN ('ACTIVO', 'CERRADO'))
);

-- Tabla eventos
CREATE TABLE eventos (
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
  FOREIGN KEY (espacio_id) REFERENCES espacios(id),
  CHECK (categoria IN ('ACADEMICOS', 'CULTURALES', 'ENTRETENIMIENTO', 'DEPORTES', 'OTROS'))
);

-- Tabla reservas
CREATE TABLE reservas (
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
('Ana Pérez', 'ana@daweb.com', 'pass', 'gestor'),
('Luis Gómez', 'luis@daweb.com', 'pass', 'usuario'),
('Marta López', 'marta@daweb.com', 'pass', 'usuario'),
('Carlos Ruiz', 'carlos@daweb.com', 'pass', 'gestor'),
('Elena Torres', 'elena@daweb.com', 'pass', 'usuario');

-- Insertar espacios
INSERT INTO espacios (nombre, propietario, capacidad, direccion, descripcion, estado) VALUES
('Auditorio Central', 'Ana Pérez', 200, 'Av. Universidad 123', 'Auditorio para eventos grandes', 'ACTIVO'),
('Sala de Conferencias 1', 'Carlos Ruiz', 50, 'Calle 10 #45-20', 'Sala equipada con proyector', 'ACTIVO'),
('Cancha de Fútbol', 'Ana Pérez', 22, 'Parque Municipal', 'Espacio al aire libre', 'ACTIVO'),
('Salón Cultural', 'Carlos Ruiz', 100, 'Centro Cultural, piso 2', 'Ideal para eventos artísticos', 'CERRADO'),
('Aula 204', 'Ana Pérez', 30, 'Edificio B, segundo piso', 'Aula para talleres académicos', 'ACTIVO');

-- Insertar eventos
INSERT INTO eventos (nombre, descripcion, organizador, plazas, categoria, cancelado, fecha_inicio, fecha_fin, espacio_id) VALUES
('Conferencia de Tecnología', 'Evento sobre innovación y tecnología', 'Ana Pérez', 150, 'ACADEMICOS', FALSE, '2025-05-10', '2025-05-10', 1),
('Taller de Escritura Creativa', 'Aprende técnicas narrativas', 'Carlos Ruiz', 25, 'CULTURALES', FALSE, '2025-05-12', '2025-05-12', 5),
('Partido de Fútbol Amistoso', 'Encuentro deportivo entre facultades', 'Ana Pérez', 22, 'DEPORTES', FALSE, '2025-05-15', '2025-05-15', 3),
('Feria del Libro', 'Exposición de editoriales y autores', 'Carlos Ruiz', 80, 'CULTURALES', TRUE, '2025-04-20', '2025-04-22', 4),
('Cine al Aire Libre', 'Proyección gratuita de películas', 'Ana Pérez', 100, 'ENTRETENIMIENTO', FALSE, '2025-05-18', '2025-05-18', 3);

-- Insertar reservas
INSERT INTO reservas (usuario_id, evento_id, cantidad) VALUES
(2, 1, 2),
(3, 2, 1),
(5, 3, 2),
(2, 5, 1),
(3, 5, 1);

