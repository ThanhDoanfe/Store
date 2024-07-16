const router = require('express').Router();
const Order = require('../models/Order.js');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')

// CREATE
router.post('/create', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        await newOrder.save();
        return res.status(200).json({
            errCode: 0,
            message: 'save order success'
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            errCode: 0,
            message: 'update order success',
            updatedOrder
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
        await Order.findByIdAndDelete(req.params.id);
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

// GET USER'S ORDER
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.find({
            userId: req.params.userId
        });
        return res.status(200).json({
            errCode: 0,
            message: 'find order success',
            order
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET ALL ORDERS
router.get('/findAll', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(200).json({
            errCode: 0,
            message: 'find all orders success',
            orders
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        return res.status(200).json({
            errCode: 0,
            message: 'get income success',
            income
        });
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

module.exports = router;