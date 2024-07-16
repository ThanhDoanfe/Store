let productService = require('../services/productService.js')

// CREATE
let createProduct = async (req, res) => {
    try {
        let newProduct = await productService.createProduct(req.body)
        return res.status(200).json({
            errCode: 0,
            message: 'create product success',
            newProduct
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// UPDATE
let updateProduct = async (req, res) => {
    try {
        let updatedProduct = await productService.updateProduct(req.params.id, req.body)
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
}

// DELETE
let deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id)
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
}

// GET PRODUCT
let getProduct = async (req, res) => {
    try {
        let product = await productService.getProduct(req.params.id)
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
}

// GET ALL PRODUCTS
let getAllProducts = async (req, res) => {
    try {
        let products = await productService.getAllProducts(req.query.getNewest, req.query.getByCategories)
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
}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts }