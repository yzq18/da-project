// imports the Express framework, 
// which simplifies the process of building 
// and managing web servers in Node.js.
const express = require('express');

// // imports the Express session middleware, 
// // which allows you to manage user sessions, 
// // such as login sessions, in your application.
// const session = require('express-session');

// imports the Body Parser middleware, 
// which helps parse incoming request bodies in a middleware 
// before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

// connect to and interact with a MySQL database 
// from your Node.jsapplication
const mysql = require('mysql2');

// provides file I/O functions
const fs = require('fs');

const cors = require("cors");
// const corsOptions = {
//     origin: ["http://localhost:5173/"],
// };

// Import cookie-parser
const cookieParser = require('cookie-parser');


// Import APIs from routers folder
const login = require('./routers/loginRouter');
const user = require('./routers/userRouter');


const app = express();
app.use(express.json());
// app.use(session({secret: 'super-secret'}));

app.use(cors())
app.use(cookieParser())

app.use(login);
app.use(user);


// app.get('/test', (req, res) => {
//     console.log("TESTTTTT")
//   });


/** App listening on port */
const port = 3000
app.listen(port, () => {
  console.log(`App Server listening at http://localhost:${port}`);
});