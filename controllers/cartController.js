const Cart = require("../models/Cart");
const User = require("../models/User");

// Función para modificar carrito
exports.editCart = async (req, res) => {
    // Obtiene el ID del usuario de la solicitud
    const userID = req.params;

    try {
        // Encuentra al usuario en la base de datos por su ID
        const foundUser = await User.findOne({ _id: userID.id });

        // Toma los nuevos datos de los productos de la solicitud
        const { products } = req.body;

        const prices = products.prices[0];

        // Actualiza el carrito con los nuevos datos de los productos
        //buscar el producto en cart, si esta lo aumento en 1 caso contrario lo ingreso con cantidad=1
        const oldCart = await Cart.findOne({ _id: foundUser.cart.toHexString() })

        const filterCart = oldCart.products.filter((p) => p.idProd === products.idProd)

        if (filterCart.length > 0) {
            const newCant = filterCart[0].quantity + 1

            const xx = await Cart.updateOne({ "products._id": filterCart[0]._id.toHexString() },
                { $set: { "products.$.quantity": newCant } }, { upsert: true })


        } else {
            const newProd = {
                idProd: products.idProd,
                quantity: 1, priceID: prices.id, name: products.name,
                size: prices.size, priceDescription: prices.priceDescription,
                price: products.price, img: products.image, slug: products.slug
            }

            await Cart.updateOne({ _id: foundUser.cart.toHexString() },
                {
                    $push: { products: newProd }
                })
        };

        const updatedCart = await Cart.findOne({ _id: foundUser.cart.toHexString() })

        res.json({
            msg: "carrito actualizado (1)",
            updatedCart,
        });

    } catch (error) {
        console.log('editCart Error: ', error)
    }

};

//modifica cantidad de producto existente en el carrito
exports.editCart2 = async (req, res) => {
    // Obtiene el ID del usuario de la solicitud
    const userID = req.params;

    try {
        // Encuentra al usuario en la base de datos por su ID
        const foundUser = await User.findOne({ _id: userID.id });

        // Toma los nuevos datos de los productos de la solicitud
        const { products } = req.body;

        // Actualiza el carrito con los nuevos datos de los productos
        //buscar el producto en cart, si esta actualizo cantidad segun products.quantity
        const oldCart = await Cart.findOne({ _id: foundUser.cart.toHexString() })
        const filterCart = oldCart.products.filter((p) => p.idProd === products.idProd)

        if (filterCart.length > 0) {
            const newCant = products.quantity

            await Cart.updateOne({ "products._id": filterCart[0]._id.toHexString() },
                { $set: { "products.$.quantity": newCant } })

        };

        const updatedCart = await Cart.findOne({ _id: foundUser.cart.toHexString() })

        res.json({
            msg: "carrito actualizado (4)",
            updatedCart,
        });

    } catch (error) {
        console.log('editCart Error (4): ', error)
    }

};

//elimina producto del carro
exports.deleteCartById = async (req, res) => {
    const userID = req.params;
    //
    const { idProd } = req.body;
    try {
        const foundUser = await User.findOne({ _id: userID.id });
        const oldCart = await Cart.findOne({ _id: foundUser.cart.toHexString() })
        const filterCart = oldCart.products.filter((p) => p.idProd != idProd)
        const idCart = foundUser.cart.toHexString()

        const upCart = await Cart.findByIdAndUpdate(idCart, { products: filterCart }, { new: true })

        return res.json({
            msg: "carrito actualizado (3)",
            upCart,
        });
    } catch (error) {
        res.status(500).json({
            msg: "There was an error erasing the specified cartProduct by idProd",
            error
        })
    }
}

// Función para obtener carrito
exports.getCart = async (req, res) => {
    // Obtiene el ID del usuario de la solicitud
    const userID = req.user.id;

    try {
        // Encuentra al usuario en la base de datos por su ID
        const foundUser = await User.findOne({ _id: userID });

        // Encuentra el carrito del usuario en la base de datos
        const foundCart = await Cart.findOne({ _id: foundUser.cart });

        // Envía el carrito encontrado en la respuesta
        res.json({
            cart: foundCart,
        });
    } catch (error) {
        console.log('getCart Error: ', error)
    }

};

// Función para obtener carrito segun id en params y mostrar en /carrito
exports.getCart2 = async (req, res) => {
    // Obtiene el ID del usuario de la solicitud
    const userCart = req.params.id;

    try {

        // Encuentra el carrito del usuario en la base de datos
        const foundCart = await Cart.findOne({ _id: userCart });
        // Envía el carrito encontrado en la respuesta
        res.json({
            cart: foundCart.products,
        });


    } catch (error) {
        console.log('getCart2 Error: ', error)
    }
};

// Función para crear una orden
exports.createOrder = async (req, res) => {
    // Obtiene la firma de Stripe de los headers
    const sig = req.headers["stripe-signature"];
    const stripe = require("stripe")(process.env.STRIPE_KEY)
    const endpointSecret = process.env.STRIPE_WH_SIGNING_SECRET;

    let event;

    try {
        // Construye el evento de Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        // Si hay un error, registra el error y envía una respuesta de error
        console.log(err);
        res.status(400).send(`Hubo un problema relacionado con el evento.`);
        return;
    }

    // Dependiendo del tipo de evento
    switch (event.type) {
        case "charge.succeeded":
            // Si la carga fue exitosa
            const paymentIntent = event.data.object;

            const email = paymentIntent.billing_details.email;

            const receiptURL = paymentIntent.receipt_url;

            const receiptID = receiptURL
                .split("/")
                .filter((item) => item)
                .pop();

            const amount = paymentIntent.amount;

            const date_created = paymentIntent.created;

            // Actualiza el usuario con los datos del recibo
            await User.findOneAndUpdate(
                { email },
                {
                    $push: {
                        receipts: {
                            receiptURL,
                            receiptID,
                            date_created,
                            amount,
                        },
                    },
                },
                { new: true }
            );

            break;
        default:
            // Si el tipo de evento no se maneja, registra el tipo de evento
            console.log(`Unhandled event type ${event.type}`);
    }

    // Envía una respuesta vacía
    res.send();
};


// Importa stripe y configura con la clave de stripe en las variables de entorno
// Función para crear una sesión de checkout en Stripe
exports.createCheckoutSession = async (req, res) => {
    // Obtiene el ID del usuario de la solicitud
    const userID = req.params.id;
    const stripe = require("stripe")(process.env.STRIPE_KEY)

    try {
        // Encuentra al usuario en la base de datos por su ID
        const foundUser = await User.findOne({ _id: userID });

        // Encuentra el carrito del usuario en la base de datos y llena los productos
        const foundCart = await Cart.findById(foundUser.cart).populate({
            path: "products",
        });

        // Crea line_items para la sesión de Stripe a partir de los productos en el carrito
        const line_items = foundCart.products.map((e) => {
            return {
                price: e.priceID,
                quantity: e.quantity,
            };
        });

        // Crea una sesión de checkout en Stripe
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${process.env.REACT_BASE_URL}`,
            cancel_url: `${process.env.REACT_BASE_URL_CANCEL}`,
            customer_email: foundUser.email,
        });

        //Vaciar Carro
        const upCart = await Cart.findByIdAndUpdate(foundCart._id, { products: [] }, { new: true })

        res.json({
            session_url: session.url,
            session: session,
        });
    } catch (error) {
        console.log('createCheckoutSession: ', error)
    }



};