const express = require('express');
const { getAllProducts, getOneProduct, createProduct, updateProductById, deleteProductById, create } = require('../controllers/productController');
const auth = require('../middleware/authorization');

const productRouter = express.Router();
// no olvidar agregar los auth
productRouter.post('/create', create); 
productRouter.put('/update/:id', updateProductById); 
productRouter.get('/readAll', getAllProducts) 
productRouter.get('/readOne/:id', getOneProduct) 
productRouter.delete('/delete/:id', deleteProductById)  

module.exports = productRouter