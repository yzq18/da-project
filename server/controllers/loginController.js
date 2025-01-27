// Establish connection w DB
const promisePool = require('../connectDB');

// Import for comparing password
const bcrypt = require('bcrypt');

// Import the jwt module
const jwt = require('jsonwebtoken');

require('dotenv').config();


// function getUserByUsername(username, callback) {
//     const query = 'SELECT * FROM users WHERE user_username = ?';
//     promisePool.query(query, [username], (err, results) => {
//         console.log("bloodyyyyyyy")
//         if (err) {
//             console.log("bloodyyyyyyy")

//             console.error('Error fetching user:', err);
//             callback(err, null);
//         } else {
//             console.log("bloodyyyyyyy")

//             if (results.length == 0) {
//                 err = "Invalid login"
//                 console.error('Error fetching user:', err);
//                 callback(err, null);
//             }
//             else {
//                 console.log('User details:', results);
//                 callback(null, results[0]);
//             }
//         }
//     });
// }


function getUserByUsername(username) {
    const query = 'SELECT * FROM users WHERE user_username = ?';
    return promisePool.query(query, [username])
        .then(results => {
            if (results.length === 0) {
                throw new Error("Invalid login");
            }
            return results[0][0];  // Return the first result if found
        })
        .catch(err => {
            console.error('Error fetching user:', err);
            throw err;  // Re-throw the error if needed
        });
}



// Function to compare the password
function comparePassword(inputPassword, storedPassword, callback) {
    bcrypt.compare(inputPassword, storedPassword, (err, isMatch) => {
        if (err) {
            callback(err);
        } else {
            callback(null, isMatch);
        }
    });
}


// Function to generate JWT token
function generateToken(user_username) {
    const token = jwt.sign(
        { username: user_username },
        process.env.JWT_SECRET, // Make sure this is set correctly in the .env file
        { expiresIn: '1h' }
    );
    return token;
}


const userLogin = async (req, res) => {
    // Get login data from client side
    console.log(req.body)
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);
        console.log(user);

        // Compare provided password with hashed password
        comparePassword(password, user.user_password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ error: 'Invalid login!' });
            } else {
                console.log(user.user_username + "BLOODYYYYYYYY")

                // Generate JWT token if login is successful
                const token = generateToken(user.user_username);

                // Set the token in an HttpOnly cookie
                res.cookie('authToken', token, {
                    httpOnly: true,       // The cookie can only be accessed by the server
                    secure: process.env.NODE_ENV === 'production', // Set 'secure' to true in production for HTTPS
                    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
                    // sameSite: 'Strict'    // To prevent CSRF attacks
                });

                // Respond with success
                return res.json({
                    success: "User is authenticated!",
                    message: "JWT token has been set in the cookie."
                });
            }
        });

    } catch (error) {
        return res.status(401).json({ error: error + ' Invalid login!' });
    }
};


const userLogout = (req, res) => {
    // Clear the authToken cookie
    res.clearCookie('authToken');
    res.json({ message: 'Logged out successfully' });
};


module.exports = {
    userLogin,
    userLogout
}