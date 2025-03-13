const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    products: [
        {
            idProd: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            priceID: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            size: {
                type: String,
                required: true,
            },
            priceDescription: {
                type: String,
            },
            price: {
                type: Number,
                required: true,
            },
            img: {
                type: String,
            },
            slug: {
                type: String,
            },
        },
    ]
})

const Product = mongoose.model('carts', ProductSchema);

module.exports = Product;