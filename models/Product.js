const mongoose = require('mongoose');
// const ProductSchema = mongoose.Schema({
//     name: {
//         type: String, required: true
//     },
//     price: {
//         type: Number, required: true
//     },
//     image: {
//         type: String, required: true
//     }
// }, {
//     timestamps: true
// })
const ProductSchema = mongoose.Schema({
    idProd: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    currency: {
      type: "String",
      required: true,
    },
    prices: [
      {
        id: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        priceDescription: {
          type: String,
          required: true,
        },
      },
    ],
    img: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
        type: Number, required: true
    },
    image: {
        type: String, required: true
    }},
    {
        timestamps: true
  });

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;