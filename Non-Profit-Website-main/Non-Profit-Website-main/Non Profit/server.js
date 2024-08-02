const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Supriya@6648',
    database: 'nonprofit_db;'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Serve static files (your HTML form)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission
app.post('/submit-donation', (req, res) => {
    const { name, phone, email, amount } = req.body;
    const sql = 'INSERT INTO donations (name, phone, email, amount) VALUES (?, ?, ?, ?)';
    const values = [name, phone, email, amount];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log('Donation record inserted');
        res.redirect(`/qr.html?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&amount=${encodeURIComponent(amount)}`);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
