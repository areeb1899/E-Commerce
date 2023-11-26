const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const catchAsync = require('../core/catchAsync');
const { BadRequestError } = require('../core/ApiError');

// Get all products
router.get('/products', catchAsync(async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
}));

// Show new form
router.get('/products/new', (req, res) => {
    res.render('products/new');
});

// Create
router.post('/products',catchAsync(async (req, res) => {
    const { name, imageUrl, desc, price } = req.body;
    await Product.create({ name, imageUrl, desc, price });
    res.redirect('/products');
}));

// Show
router.get('/products/:id',catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate('reviews');
    if (!product) {
        throw new BadRequestError(`Product with this id: ${id} doesn't exists.`);
    }
    res.render('products/show', { product });
}));

// Write edit route yourself
// edit route
router.get('/products/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new BadRequestError(`Product with this id: ${id} doesn't exists.`);
    }
    res.render('products/edit', { product });
}));

// update
router.patch('/products/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, price, desc, imageUrl } = req.body;
    await Product.findByIdAndUpdate(id, { name, price, desc, imageUrl });
    res.redirect('/products');
}));

// Delete 
router.delete('/products/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
}));
module.exports = router;

