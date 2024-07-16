const router = require('express').Router();
const Cart = require('../models/Cart.js');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

// CREATE
router.post('/create', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)
    try {
        await newCart.save();
        return res.status(200).json({
            errCode: 0,
            message: 'save cart success'
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// UPDATE
router.put('/update/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
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
})

// DELETE
router.delete('/delete/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
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

// GET USER'S CART
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId
        });
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
})

// GET ALL CARTS
router.get('/findAll', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
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
})

module.exports = router;