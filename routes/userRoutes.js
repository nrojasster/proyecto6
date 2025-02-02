const express = require('express');
const { createUser, login, verifyUser, updateUserById } = require('../controllers/userController');
const auth = require('../middleware/authorization');

const userRouter = express.Router();

userRouter.post('/register', createUser); 
userRouter.post('/login', login); 
userRouter.get('/verifyToken', auth, verifyUser) 
userRouter.put('/update/:id', auth, updateUserById) 

module.exports = userRouter