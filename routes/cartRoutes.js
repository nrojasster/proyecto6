const express = require('express');
const { editCart, getCart, getCart2, createOrder, createCheckoutSession, deleteCartById, editCart2 } = require('../controllers/cartController');
const auth = require('../middleware/authorization');

const cartRouter = express.Router();

cartRouter.get("/get-cart", auth, getCart);
cartRouter.put("/edit-cart/:id", auth, editCart);
cartRouter.get("/cart/:id", auth, getCart2);
cartRouter.get("/create-checkout-session/:id", auth, createCheckoutSession);
cartRouter.delete("/delete-cart/:id", auth, deleteCartById);
cartRouter.put("/edit-cart2/:id", auth, editCart2);

cartRouter.post(
    "/create-order",
    express.raw({ type: "application/json" }),
    createOrder
  );

module.exports = cartRouter