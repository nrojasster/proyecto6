const express = require('express');
const { getAllCars, createCar, updateCarById, deleteCarById, getOneCar } = require('../controllers/carController');
const auth = require('../middleware/authorization');

const carRouter = express.Router();

carRouter.post('/create', auth, createCar); // localhost:3001/api/car/register
carRouter.put('/update/:id', auth, updateCarById); // localhost:3001/api/car/updateCar/id
carRouter.get('/readAll', getAllCars) // localhost:3001/api/car/redAll
carRouter.get('/readOne/:id', auth, getOneCar) // localhost:3001/api/car/redOne/id
carRouter.delete('/delete/:id', auth, deleteCarById)  // localhost:3001/api/car/deleteCar/id

module.exports = carRouter
