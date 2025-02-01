const express = require('express');
const { createUser, login, verifyUser, updateUserById } = require('../controllers/userController');
const auth = require('../middleware/authorization');

const userRouter = express.Router();

userRouter.post('/register', createUser); // localhost:3001/api/user/register
userRouter.post('/login', login); // localhost:3001/api/user/login
userRouter.get('/verifyToken', auth, verifyUser) // localhost:3001/api/user/verificar-usuario
userRouter.put('/update/:id', auth, updateUserById) // localhost:3001/api/user/update

module.exports = userRouter