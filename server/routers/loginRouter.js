const { Router } = require('express');
const { userLogin, userLogout } = require('../controllers/loginController');

const app = Router();


app.post('/login', userLogin);
app.post('/logout', userLogout);


module.exports = app;