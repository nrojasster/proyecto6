const Product = require('../models/Product');

// const stripe = require("stripe")(process.env.STRIPE_KEY)
//
exports.getAllProducts = async (req, res) => {
    try {
        const product = await Product.find({}) 
      
        return res.json({ product })
    } catch (error) {
        return res.status(500).json({ msg: "There was an error obtaining data all Product" })
    }
}

exports.getOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id, {}) 
        return res.json({ product })
    } catch (error) {
        return res.status(500).json({ msg: "There was an error obtaining data Product by id", err: {error} })
    }
}

exports.createProduct = async (req, res) => {
    const { name, price, image } = req.body;
    try {
        const newProduct = await Product.create({ name, price, image })
        res.json({ newProduct })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'There was an error creating a new Product', err: {error} })
    }
}

exports.updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body
    try {
        const upProduct = 
	        await Product.findByIdAndUpdate(id, { name, price, image }, { new: true })
        res.json(upProduct)
    } catch (error) {       
        res.status(500).json({ msg: "There was an error updating the Product" })
    }
}

exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const productDeleted = await Product.findByIdAndDelete(id)
        return res.json({ productDeleted })
    } catch (error) {
        res.status(500).json({
            msg: "There was an error erasing the specified Product by id",
            error
        })
    }
}

//Crear productos en MongoBD y en Stripe ****
exports.create = async (req, res) => {
    const { name, description, currency, price, prices, image, img, slug } = req.body;
    const stripe = require("stripe")(process.env.STRIPE_KEY)
  
    // STRIPE
    // A. PRODUCTO
    // CREAR EL PRODUCTO EN STRIPE
    try {
      const product = await stripe.products.create({
        name,
        description,
        images: [...img],
        metadata: {
          productDescription: description,
          slug,
        },
      });
  
      // B. PRECIO
      // CREAR LOS PRECIOS PARA EL PRODUCTO EN STRIPE
  
      const stripePrices = await Promise.all(
        prices.map(async (e) => {
          return await stripe.prices.create({
            unit_amount: e.price,
            currency: currency,
            product: product.id,
            nickname: e.size,
            metadata: {
              size: e.size,
              priceDescription: e.priceDescription,
            },
          });
        })
      );
  
      // 2. MODIFICACIÓN EN BASE DE DATOS
      const productPrices = stripePrices.map((e) => {
        return {
          id: e.id,
          size: e.metadata.size,
          priceDescription: e.metadata.priceDescription,
          price: e.unit_amount,
        };
      });
    
      const newProduct = await Product.create({
        idProd: product.id,
        name: product.name,
        price: price,
        prices: [...productPrices],
        img,
        image,
        currency,
        description: product.description,
        slug,
      });
  
      // DEVOLVER UNA RESPUESTA EN UN FORMATO JSON
      res.json({
        msg: "Producto creado con éxito",
        data: newProduct,
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        msg: "Hubo un error creando el Producto",
      });
    }
  };