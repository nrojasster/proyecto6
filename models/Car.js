const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    model: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Car = mongoose.model('Car', UserSchema);

module.exports = Car;