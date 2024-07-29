const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'usuario_proyecto',
    password: 'Usuar1o_ClaveProyecto.',
    database: 'looklab'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con el ID', connection.threadId);
});

module.exports = connection;