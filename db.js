const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',     // Change if needed
    password: '',     // Your MySQL password
    database: 'crud_demo'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

module.exports = db;
