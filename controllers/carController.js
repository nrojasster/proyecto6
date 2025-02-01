const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({}) 
        return res.json({ cars })
    } catch (error) {
        return res.status(500).json({ msg: "There was an error obtaining data all Cars" })
    }
}

exports.getOneCar = async (req, res) => {
    const { id } = req.params;
    try {
        const cars = await Car.findById(id, {}) 
        return res.json({ cars })
    } catch (error) {
        return res.status(500).json({ msg: "There was an error obtaining data Cars by id" })
    }
}

exports.createCar = async (req, res) => {
    const { name, year, model } = req.body;
    try {
        const newCar = await Car.create({ name, year, model })
        res.json({ newCar })
    } catch (error) {
        res.status(500).json({ msg: 'There was an error creating a new car' })
    }
}

exports.updateCarById = async (req, res) => {
    const { id } = req.params;
    const { name, year, model } = req.body
    try {
        const upCar = 
	        await Car.findByIdAndUpdate(id, { name, year, model }, { new: true })
        res.json(upCar)
    } catch (error) {        
        res.status(500).json({ msg: "There was an error updating the Car" })
    }
}

exports.deleteCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const carDeleted = await Car.findByIdAndDelete(id)
        return res.json({ carDeleted })
    } catch (error) {
        res.status(500).json({
            msg: "There was an error erasing the specified car by id",
            error
        })
    }
}