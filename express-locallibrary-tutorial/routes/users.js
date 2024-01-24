const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a MySQL connection
const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'locallibrary' // Use the name of the database you created
});

// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
  }
    console.log('Connected to the database as ID ' + connection.threadId);
});

// Define a GET route
app.get('/api/users', (req, res) => {
  
    // Fetch users from the database
  connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
          console.error('Error fetching users from the database: ' + error.stack);
          return res.status(500).json({ error: 'Failed to fetch users' });
    }

    // Send the fetched data as a response
     res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

