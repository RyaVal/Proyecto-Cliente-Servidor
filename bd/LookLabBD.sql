/*Se crea la base de datos */
drop schema if exists looklab;
drop user if exists usuario_proyecto;
CREATE SCHEMA looklab;

/*Se crea un usuario para la base de datos llamado "usuario_prueba" y tiene la contraseña "Usuario_Clave."*/
create user 'usuario_proyecto'@'%' identified by 'Usuar1o_ClaveProyecto.';

/*Se asignan los prvilegios sobr ela base de datos TechShop al usuario creado */
grant all privileges on looklab.* to 'usuario_proyecto'@'%';
flush privileges;

-- Tabla de Clientes
CREATE TABLE looklab.clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(255)
);

-- Tabla de Categorías
CREATE TABLE looklab.categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL
);

-- Tabla de Productos
CREATE TABLE looklab.productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT,
    imagen_url VARCHAR(255), -- Nueva columna para la URL de la imagen
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE looklab.Hombres (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT,
    imagen_url VARCHAR(255), -- Nueva columna para la URL de la imagen
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE looklab.Mujeres (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT,
    imagen_url VARCHAR(255), -- Nueva columna para la URL de la imagen
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE looklab.Niños (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    descripcion VARCHAR(500),
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_categoria INT,
    imagen_url VARCHAR(255), -- Nueva columna para la URL de la imagen
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Tabla de Pedidos
CREATE TABLE looklab.pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    fecha_pedido DATETIME NOT NULL,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Tabla de Detalles de Pedido
CREATE TABLE looklab.detalles_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_producto INT,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

-- Tabla de Usuarios
CREATE TABLE looklab.usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'user') NOT NULL,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- Insertar clientes
INSERT INTO looklab.clientes (nombre, apellido, email, telefono, direccion) VALUES
('Ana', 'Gómez', 'ana.gomez@example.com', '1234567890', 'Av. Principal 123, Ciudad A'),
('Luis', 'Martínez', 'luis.martinez@example.com', '0987654321', 'Calle Secundaria 456, Ciudad B'),
('Carla', 'Pérez', 'carla.perez@example.com', '1122334455', 'Plaza Mayor 789, Ciudad C');

-- Insertar categorías
INSERT INTO looklab.categorias (nombre_categoria) VALUES
('Hombre'),
('Mujer'),
('Niños'),
('Calzado');

-- Insertar productos
INSERT INTO looklab.productos (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url) VALUES
('Camisa Casual', 'Camisa de algodón con diseño moderno.', 18593.80, 100, 1, 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Pantalón Formal', 'Pantalón de tela elegante para ocasiones especiales.', 30999.80, 50, 2, 'https://images.pexels.com/photos/5556643/pexels-photo-5556643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Zapatos de Cuero', 'Zapatos de cuero genuino para uso diario.', 55793.80, 30, 4, 'https://images.pexels.com/photos/1854220/pexels-photo-1854220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Sombrero de Sol', 'Sombrero ligero para protegerse del sol.', 12393.80, 75,2, 'https://images.pexels.com/photos/13780818/pexels-photo-13780818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Chaqueta', 'Chaqueta ideal para climas fríos.', 68999.80, 20, 1, 'https://images.pexels.com/photos/1833082/pexels-photo-1833082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');


INSERT INTO looklab.Hombres (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url) VALUES
('Camisa Casual', 'Camisa de algodón con diseño moderno.', 18593.80, 100, 1, 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Jeans Rasgados', 'Pantalón elegante para ocasiones especiales.', 30999.80, 50, 2, 'https://i.pinimg.com/236x/eb/4e/57/eb4e575dd40dcf8769c58737a6ec08aa.jpg'),
('Zapatos de Cuero', 'Zapatos de cuero genuino para uso diario.', 55793.80, 30, 4, 'https://media.gq.com.mx/photos/5fa30cbd6125b094d54f390c/4:3/w_1999,h_1499,c_limit/zapatos%204.jpg'),
('Chaqueta', 'Chaqueta ideal para climas fríos.', 68999.80, 20, 1, 'https://images.pexels.com/photos/1833082/pexels-photo-1833082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');

INSERT INTO looklab.Mujeres (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url) VALUES
('Vestido Elegante', 'Vestido elegante con diseño moderno.', 18593.80, 100, 1, 'https://image.made-in-china.com/318f0j00MtwfFbosfDkg/LIdvxzvdWsRxi0G85hY-320977533184-mp4-264-hd-mp4.webp'),
('Pantalón Formal', 'Pantalón de tela elegante para ocasiones especiales.', 30999.80, 50, 2, 'https://images.pexels.com/photos/5556643/pexels-photo-5556643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Zapatos de Cuero', 'Zapatos de cuero genuino para uso diario.', 55793.80, 30, 4, 'https://images.pexels.com/photos/1854220/pexels-photo-1854220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'),
('Sombrero de Sol', 'Sombrero ligero para protegerse del sol.', 12393.80, 75,2, 'https://images.pexels.com/photos/13780818/pexels-photo-13780818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');

INSERT INTO looklab.Niños (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url) VALUES
('Chaqueta', 'Chaqueta ideal para climas fríos.', 18593.80, 100, 1, 'https://i.pinimg.com/736x/a1/ce/b8/a1ceb89c0615fb1a51695991559c9801.jpg'),
('Piyama para bebe', 'Un conjunto cómodo de piyama para climas fríos.', 30999.80, 50, 2, 'https://chilicu.com/wp-content/uploads/2019/12/A62A1419-683x1024.jpg'),
('Vistido niña', 'Un vestido cómodo para el uso diario.', 55793.80, 30, 4, 'https://mariacorrales.com/wp-content/uploads/2024/01/B4114__B411__1-1024x1536.jpg'),
('Zapato bebe', 'Un zapato cómodo que se amolda al pie del bebe.', 12393.80, 75,2, 'https://zapaticoscr.com/wp-content/uploads/2023/09/Raccoon_Avanzados_683_042_1-800x800.jpg');

-- Insertar pedidos
INSERT INTO looklab.pedidos (fecha_pedido, id_cliente) VALUES
('2024-07-30 10:00:00', 1),
('2024-07-30 14:30:00', 2),
('2024-07-29 09:15:00', 3);

-- Insertar detalles de pedido
INSERT INTO looklab.detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 2, 18593.80),
(1, 4, 1, 12393.80),
(2, 2, 1, 30999.80),
(3, 3, 1, 55793.80);

-- Insertar usuarios
INSERT INTO looklab.usuarios (username, contrasenia, rol, id_cliente) VALUES
('admin', 'admin_pass', 'admin', NULL),
('usuario1', 'user1_pass', 'user', 1),
('usuario2', 'user2_pass', 'user', 2);

select * from looklab.productos