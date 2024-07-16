let cartService = require('../services/cartService.js')

// CREATE
let createCart = async (req, res) => {
    try {
        let newCart = await cartService.createCart(req.body)
        return res.status(200).json({
            errCode: 0,
            message: 'create cart success',
            newCart
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// UPDATE
let updateCart = async (req, res) => {
    try {
        let updatedCart = await cartService.updateCart(req.params.id, req.body)
        return res.status(200).json({
            errCode: 0,
            message: 'update cart success',
            updatedCart
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// DELETE
let deleteCart = async (req, res) => {
    try {
        await cartService.deleteCart(req.params.id)
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

// GET USER'S CART
let getUserCart = async (req, res) => {
    try {
        let cart = await cartService.getUserCart(req.params.userId)
        return res.status(200).json({
            errCode: 0,
            message: 'find cart success',
            cart
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// GET ALL CARTS
let getAllCarts = async (req, res) => {
    try {
        let carts = await cartService.getAllCarts()
        return res.status(200).json({
            errCode: 0,
            message: 'find all carts success',
            carts
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

module.exports = { createCart, updateCart, deleteCart, getUserCart, getAllCarts }