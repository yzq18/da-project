const { Router } = require('express');
const { userLogin } = require('../controllers/loginController');

const app = Router();


app.post('/login', userLogin);




module.exports = app;