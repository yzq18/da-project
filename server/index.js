const { app, pool } = require('./app');

// app.use(express.json());

// // // Ensure the MySQL connection is properly closed when the app is terminated
// // const gracefulShutdown = () => {
// //     connection.end((err) => {
// //         if (err) {
// //             console.error('Error closing the database connection:', err);
// //         } else {
// //             console.log('Database connection closed.');
// //         }
// //         process.exit();
// //     });
// // };

// // var cors = connectDB.cors();
// // const corsOptions = {
// //     origin: ["http://localhost:5173"],
// // };

// // app.use(cors(corsOptions))


// // Function to retrieve a specific user by user_id
// // Callback -> is used to handle the results or any errors that occur during the query execution.
// function getUserByUsername(username, callback) {
//     const query = 'SELECT * FROM users WHERE user_username = ?';
//     connection.execute(query, [username], (err, results) => {
//         if (err) {
//             console.error('Error fetching user:', err);
//             callback(err, null);
//         } else {
//             console.log('User details:', results);
//             callback(null, results);
//         }
//     });
// }




// /** Handle login display and form submit */
// app.post('/login', (req, res) => {
//     // Get login data from client side
//     const {username, password} = req.body;

//     // connection.query(
//     //     "SELECT * FROM users", 
        
//     //     (err, users) => {
//     //     if (err) {
//     //         console.error("Error selecting users:", err);
//     //         return;
//     //     }
    
//     //     console.log("Users:", users);
//     //     res.json({ users: users });
//     // });

//     getUserByUsername(username, (err, user) => {
//         if (err) {
//             console.error('Error retrieving user:', err);
//         } else {
//             var user = user;
//         }
//     });

//     console.log(user + " USER DETAILSSS");

//     // Check if both login data matches
//     if (user.user_username === username && user.user_password === password) {
//         req.session.isLoggedIn = true;

//         // Return user data (E.g. Admin(?) and authState) if true
//         // return true
//         console.log("REDIRECT FROM SERVER SIDE")
//         res.redirect('/login');
//     } else {
//         // Show error message if false
//         res.render('login', {error: 'Invalid login!'});
//     }
// });

// /** Handle logout function */
// app.get('/logout', (req, res) => {
//   req.session.isLoggedIn = false;
//   res.redirect('/login');
// });

app.get('/test', (req, res) => {
    console.log("TESTTTTT")
  });

// // /** Simulated bank functionality */
// // app.get('/', (req, res) => {
// //   res.render('index', {isLoggedIn: req.session.isLoggedIn});
// // });

// // app.get('/balance', (req, res) => {
// //   if (req.session.isLoggedIn === true) {
// //     res.send('Your account balance is $1234.52');
// //   } else {
// //     res.redirect('/login?redirect_url=/balance');
// //   }
// // });

// // app.get('/account', (req, res) => {
// //   if (req.session.isLoggedIn === true) {
// //     res.send('Your account number is ACL9D42294');
// //   } else {
// //     res.redirect('/login?redirect_url=/account');
// //   }
// // });

// // app.get('/contact', (req, res) => {
// //   res.send('Our address : 321 Main Street, Beverly Hills.');
// // });


/** App listening on port */
app.listen(3000, () => {
    console.log(`App Server listening at http://localhost:${port}`);
  });