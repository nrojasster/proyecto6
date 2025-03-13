const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

const userRouter = require('./routes/userRoutes');
const cartRouter = require('./routes/cartRoutes')
const productRouter = require('./routes/productRoutes')
require('dotenv').config()
connectDB();

app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    if (req.originalUrl === "/api/cart/create-order") {
      next();
    } else {
      express.json()(req, res, next);
    }
  });

app.use('/api/user', userRouter);  //Usuarios 
app.use('/api/cart', cartRouter);  //carrito y pasarela de pago
app.use('/api/product',productRouter);  //productos para la venta

app.listen(3001, () => {
    console.log('El servidor esta corriendo en el puerto 3001');
})