const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos (HTML, CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
