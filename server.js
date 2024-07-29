const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const PUBLIC = path.join(__dirname, 'public')

// Servir archivos estáticos (HTML, CSS, imágenes, etc.)
app.use(express.static(PUBLIC));

app.get('/', (req, res) => {
  console.log('Loading main page...');
  res.sendFile(path.join(PUBLIC, 'main.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
