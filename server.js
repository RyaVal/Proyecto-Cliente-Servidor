const express = require('express');
const path = require('path');
const connection = require('./db')
const app = express();
const port = 3000;
const PUBLIC = path.join(__dirname, 'public')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// Servir archivos estáticos (HTML, CSS, imágenes, etc.)
app.use(express.static(PUBLIC));

app.get('/', (req, res) => {
  console.log('Loading main page...');
  res.sendFile(path.join(PUBLIC, 'main.html'));
});

app.get('/productos', (req, res) => {
  const query = 'SELECT * FROM Productos';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener productos:', error.stack);
          res.status(500).send('Error al obtener productos');
          return;
      }
      res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
