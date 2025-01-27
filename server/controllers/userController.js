// Establish connection w DB
const promisePool = require('../connectDB');

// Import for hashing password
const bcrypt = require('bcrypt')

// Import the jwt module
const jwt = require('jsonwebtoken');


// Function to hash the password
function hashPassword(password, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            callback(err);
        } else {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, hash);
                }
            });
        }
    });
}

const getAllUsers = async (req, res) => {
    // Extract the token from the cookies
    const token = req.cookies.authToken;

    // If no token is provided, return an error
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    
    // Verify the token using the secret key 
    // (using promise-based version of jwt.verify)
    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(new Error('Failed to authenticate token'));
            } else {
                resolve(decoded);
            }
        });
    });

    try {
        const [users] = await promisePool.query(`
            SELECT u.user_username, u.user_email, u.user_enabled, 
                   COALESCE(g.user_group_groupName, '') AS user_group_groupName
            FROM users u
            LEFT JOIN user_group g ON u.user_username = g.user_group_username
        `);
        console.log(users, "USERSSSSSS")
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
};

const createUserGroup = async (req, res) => {
    try {
        console.log(req)
        const { user_group_groupName } = req.body;

        if (!user_group_groupName) {
            return res.status(400).send('Group name is required');
        }

        // Insert new group into the user_group table
        await promisePool.query(
            'INSERT INTO user_group (user_group_username, user_group_groupName) VALUES (?, ?)',
            ['', user_group_groupName]
        );

        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).send('Error creating group');
    }
};


const getUserGroups = async (req, res) => {
    try {
        const [groups] = await promisePool.query('SELECT DISTINCT user_group_groupName FROM user_group');
        console.log(groups, "GROUPSSSSSSSSSSSSSSSS")
        res.json(groups);
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).send('Error fetching user groups');
    }
};


// Create User API
const createUser = async (req, res) => {
    console.log(req.body, "CREATEEEE")
    const { user_username, user_password, user_email, user_enabled, user_group } = req.body;
  
    console.log(user_group, "CREATEEEE")

    // Hash the password before saving
    hashPassword(user_password, async (err, hashedPassword) => {
        if (err) {
            return res.status(500).send('Error hashing password');
        }

        // Insert the new user into the database with the hashed password
        try {
            const result = await promisePool.query(
                'INSERT INTO users (user_username, user_password, user_email, user_enabled) VALUES (?, ?, ?, ?)',
                [user_username, hashedPassword, user_email, user_enabled] // user_enabled set to true initially
            );

            if (user_group && user_group.length > 0) {
                for (const group of user_group) {
                    await promisePool.query(
                        'INSERT INTO user_group (user_group_username, user_group_groupName) VALUES (?, ?)',
                        [user_username, group]
                    );
                }
            }
            res.status(201).json({ message: 'User created successfully', user_username: result.user_username });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Error creating user');
        }
    });
  };


  const updateUser = async (req, res) => {
    try {
        // const { user_username } = req.params;
        const { user_username, user_password, user_email, user_enabled, user_groups } = req.body;

        // Update user details in the users table
        const [result] = await promisePool.query(
            'UPDATE users SET user_username = ?, user_password = ?, user_email = ?, user_enabled = ? WHERE user_username = ?',
            [user_username, user_password, user_email, user_enabled, user_username]
        );

        // Remove existing groups
        await promisePool.query('DELETE FROM user_group WHERE user_group_username = ?', [user_username]);

        // Add the new groups
        if (user_groups && user_groups.length > 0) {
            for (const groupName of user_groups) {
                await promisePool.query(
                    'INSERT INTO user_group (user_group_username, user_group_groupName) VALUES (?, ?)',
                    [user_username, groupName]
                );
            }
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Error updating user');
    }
};


module.exports = {
    getAllUsers,
    createUserGroup,
    getUserGroups,
    createUser,
    updateUser,
};