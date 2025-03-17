const mongoose = require("mongoose")

const connectDB = async () => {
    try {
	    // conexión a base de datos.
        await mongoose.connect(process.env.MONGODB_URI)
	    console.log("connected to the database")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB