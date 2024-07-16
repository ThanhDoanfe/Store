const router = require('express').Router();
const Product = require('../models/Product.js');
const { verifyTokenAndAdmin } = require('./verifyToken');
const upload = require('../cloudinary.js');

// CREATE
router.post('/create', verifyTokenAndAdmin, upload.array('img'), async (req, res) => {
    if (req.files.length === 0) {
        console.log('there are no selected files')
    }
    const urls = []
    for (const file of req.files) {
        urls.push(file.path)
    }
    req.body.img = [...urls];
    const newProduct = new Product(req.body)
    try {
        await newProduct.save();
        return res.status(200).json({
            errCode: 0,
            message: 'save product success',
            newProduct
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, upload.array('img'), async (req, res) => {
    const urls = []
    for (let file of req.files) {
        urls.push(file.path)
    }
    if (urls && urls.length > 0) req.body.img = [...urls]

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            errCode: 0,
            message: 'update product success',
            updatedProduct
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'delete success'
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET PRODUCT
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'find product success',
            product
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET ALL PRODUCTS
router.get('/findAll', async (req, res) => {
    let products;
    const getNewest = req.query.getNewest;
    const getByCategories = req.query.getByCategories;
    const limit = 8;
    try {
        if (getNewest) {
            if (getByCategories) {
                products = await Product.find({
                    categories: {
                        $in: [getByCategories],
                    }
                }).sort({ _id: -1 }).limit(limit);
            } else {
                products = await Product.find().sort({ _id: -1 }).limit(limit);
            }
        } else {
            if (getByCategories) {
                products = await Product.find({
                    categories: {
                        $in: [getByCategories],
                    }
                });
            } else {
                products = await Product.find();
            }
        }

        return res.status(200).json({
            errCode: 0,
            message: 'find all products success',
            products
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// Search api
router.get('/search/:key', async (req, res) => {
    const limit = 10
    try {
        const searchedProducts = await Product.find({
            '$or': [
                {
                    title: { $regex: req.params.key }
                }
            ]
        }).sort({ _id: -1 }).limit(limit);
        return res.status(200).json({
            errCode: 0,
            message: 'search product success',
            searchedProducts
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'search product failure'
        })
    }
})

module.exports = router;