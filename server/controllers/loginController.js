// Establish connection w DB
const promisePool = require('../connectDB');

// Import for comparing password
const bcrypt = require('bcrypt')


function getUserByUsername(username, callback) {
    const query = 'SELECT * FROM users WHERE user_username = ?';
    promisePool.query(query, [username], (err, results) => {
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


const userLogin = (req, res) => {
    // Get login data from client side
    console.log(req.body)
    const {username, password} = req.body;

    getUserByUsername(username, (err, user) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(401).json({ error: 'Invalid login!' });
        }
        
        // Compare provided password with hashed password
        comparePassword(password, user.user_password, (err, isMatch) => {
            if (err || !isMatch) {
                console.error('Invalid login');
                return res.status(401).json({ error: 'Invalid login!' });
            } else {
                req.session.isLoggedIn = true;
                return res.json({ success: "User is authenticated!" });
            }
        });
    });

};


module.exports = {
    userLogin
}