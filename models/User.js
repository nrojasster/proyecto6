const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart",
        default: [],
      },
}, {
    timestamps: true
})

const User = mongoose.model('User', UserSchema);

module.exports = User;