const { Router } = require('express');
const { getAllUsers, createUserGroup, getUserGroups, createUser, updateUser } = require('../controllers/userController');

const app = Router();

app.get('/getAllUsers', getAllUsers);
app.post('/createUser', createUser);
app.post('/updateUser', updateUser);

app.post('/createUserGroup', createUserGroup);
app.get('/getUserGroups', getUserGroups);



module.exports = app;