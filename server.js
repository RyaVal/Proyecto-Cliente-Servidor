const express = require('express');
const path = require('path');
const connection = require('./db')
const app = express();
const port = 3000;
const PUBLIC = path.join(__dirname, 'public')
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Servir archivos estáticos (HTML, CSS, imágenes, etc.)
app.use(express.static(PUBLIC));

app.get('/', (req, res) => {
  console.log('Loading main page...');
  res.sendFile(path.join(PUBLIC, 'main.html'));
});

app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener productos:', error.stack);
          res.status(500).send('Error al obtener productos');
          return;
      }
      res.json(results);
  });
});

app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener productos:', error.stack);
      res.status(500).send('Error al obtener productos');
      return;
    }
    res.json(results);
  });
});

app.post('/productos', (req, res) => {
  const { nombre_producto, descripcion, precio, stock, imagen_url, id_categoria } = req.body;
  const query = 'INSERT INTO productos (nombre_producto, descripcion, precio, stock, imagen_url, id_categoria) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [nombre_producto, descripcion, precio, stock, imagen_url, id_categoria], (error, results) => {
    if (error) {
      console.error('Error al insertar producto:', error);
      res.status(500).json({ error: 'Error al agregar producto' });
      return;
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

app.get('/productos/categorias/:id', (req, res) => {
  const categoryId = req.params.id;
  const query = 'SELECT * FROM productos WHERE id_categoria = ?';
  connection.query(query, [categoryId], (error, results) => {
    if (error) {
      console.error('Error al obtener productos:', error.stack);
      res.status(500).send('Error al obtener productos');
      return;
    }
    res.json(results);
  });
});


app.get('/categorias', (req, res) => {
  const query = 'SELECT * FROM categorias';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener categorías:', error.stack);
      res.status(500).send('Error al obtener categorías');
      return;
    }
    res.json(results);
  });
});

app.post('/categorias', (req, res) => {
  const { nombre_categoria } = req.body;
  const query = 'INSERT INTO categorias (nombre_categoria) VALUES (?)';
  connection.query(query, [nombre_categoria], (error, results) => {
    if (error) {
      console.error('Error al insertar categoría:', error);
      res.status(500).json({ error: 'Error al agregar categoría' });
      return;
    }
    res.status(201).json({ id: results.insertId, nombre_categoria });
  });
});


app.get('/usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener usuarios:', error.stack);
      res.status(500).send('Error al obtener usuarios');
      return;
    }
    res.json(results);
  });
});


app.post('/register', (req, res) => {
  const { name, lastname, email, username, password } = req.body;

  // Primero, insertamos el cliente
  const insertClientQuery = 'INSERT INTO clientes (nombre, apellido, email) VALUES (?, ?, ?)';
  connection.query(insertClientQuery, [name, lastname, email], (error, clientResults) => {
    if (error) {
      console.error('Error al insertar cliente:', error);
      res.status(500).json({ error: 'Error al registrar usuario' });
      return;
    }

    const clientId = clientResults.insertId;

    
    const insertUserQuery = 'INSERT INTO usuarios (username, contrasenia, rol, id_cliente) VALUES (?, ?, ?, ?)';
    connection.query(insertUserQuery, [username, password, 'user', clientId], (error, userResults) => {
      if (error) {
        console.error('Error al insertar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
        return;
      }

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT u.*, c.nombre, c.apellido FROM usuarios u LEFT JOIN clientes c ON u.id_cliente = c.id_cliente WHERE u.username = ? AND u.contrasenia = ?';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
      return;
    }

    if (results.length > 0) {
      const user = results[0];
      res.json({
        success: true,
        user: {
          id: user.id_usuario,
          username: user.username,
          rol: user.rol,
          nombre: user.nombre,
          apellido: user.apellido
        }
      });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
