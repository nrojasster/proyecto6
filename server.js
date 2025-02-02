const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

const userRouter = require('./routes/userRoutes');
const carRouter1 = require('./routes/carRoutes')
require('dotenv').config()
connectDB();

app.use(cors())
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/car',carRouter1);

app.listen(3001, () => {
    console.log('El servidor esta corriendo en el puerto 3001');
})