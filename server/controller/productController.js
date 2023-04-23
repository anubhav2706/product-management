const Product = require("../models/product");
const socket = require('../server');

module.exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity } = req.body;
        // create new product
        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            category: category,
            quantity: quantity
        });
        // Save new user to database
        await newProduct.save();
        await socket.io.on("connection", (socket) => {
            console.log("New client connected");
            socket.emit("updatePage", "hello");
          });
        //   socket.io.close();
        res.status(201).send(`New Product created successfully `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}



module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, quantity } = req.body;
        // create new product
        const product = await Product.findOne({ _id: id });

        if (!product) {
            console.log('Product not found');
            return res.send(`Product not found`);
        }
        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.quantity = quantity;
        product.updatedAt = Date.now();

        await product.save();
        res.status(201).send(`Product updated successfully `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}


module.exports.findProductList = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.findProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.deleteProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
