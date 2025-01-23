// imports the Express framework, 
// which simplifies the process of building 
// and managing web servers in Node.js.
const express = require('express');
// imports the Express session middleware, 
// which allows you to manage user sessions, 
// such as login sessions, in your application.
const session = require('express-session');
// imports the Body Parser middleware, 
// which helps parse incoming request bodies in a middleware 
// before your handlers, available under the req.body property.
const bodyParser = require('body-parser');
// connect to and interact with a MySQL database 
// from your Node.jsapplication
const mysql = require('mysql2');
// provides file I/O functions
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(session({secret: 'super-secret'}));
const port = 3000

const cors = require("cors");
// const corsOptions = {
//     origin: ["http://localhost:5173/"],
// };
app.use(cors())

require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// const connection = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Connected to the database.');
//     }
// });



// Function to retrieve a specific user by user_id
// Callback -> is used to handle the results or any errors that occur during the query execution.
function getUserByUsername(username, callback) {
    const query = 'SELECT * FROM users WHERE user_username = ?';
    pool.execute(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            callback(err, null);
        } else {
            if (results.length == 0) {
                err = "Invalid login"
                console.error('Error fetching user:', err);
                callback(err, null);
            }
            else {
                console.log('User details:', results);
                callback(null, results[0]);
            }
        }
    });
}




// User Authentication API
app.post('/login', (req, res) => {
    // Get login data from client side
    console.log(req.body)
    const {username, password} = req.body;

    getUserByUsername(username, (err, user) => {
        if (err) {
            console.error('Error retrieving user:', err);
            res.status(500).json({error: 'Invalid login!'});
        } else {
            console.log(user.user_username)
            var user = user;

            // Check if both login data matches
            if (user.user_username === username && user.user_password === password) {
                req.session.isLoggedIn = true;

                // Return user data (E.g. Admin(?) and authState) if true
                // return true
                // console.log("REDIRECT FROM SERVER SIDE")
                // res.redirect('http://localhost:5173/');
                res.json({success: "User is authenticated!"})
                // return res.status(200).json({success: "User is authenticated!"})
            } else {
                // Show error message if false
                console.log("ERRORRRRR")
                res.status(500).json({error: 'Invalid login!'});
            }
        }
    });

});


// Create User API
app.post('/createUser', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).send('User registered successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });
















// app.get('/test', (req, res) => {
//     console.log("TESTTTTT")
//   });


/** App listening on port */
app.listen(port, () => {
  console.log(`App Server listening at http://localhost:${port}`);
});


module.exports = { app, pool }