const express = require('express');
const { getAllCars, createCar, updateCarById, deleteCarById, getOneCar } = require('../controllers/carController');
const auth = require('../middleware/authorization');

const carRouter = express.Router();

carRouter.post('/create', auth, createCar); 
carRouter.put('/update/:id', auth, updateCarById); 
carRouter.get('/readAll', getAllCars) 
carRouter.get('/readOne/:id', auth, getOneCar) 
carRouter.delete('/delete/:id', auth, deleteCarById)  

module.exports = carRouter
