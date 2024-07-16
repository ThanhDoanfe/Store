let orderService = require('../services/orderService.js')

// CREATE
let createOrder = async (req, res) => {
    try {
        let newOrder = await orderService.createOrder(req.body)
        return res.status(200).json({
            errCode: 0,
            message: 'create order success',
            newOrder
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// UPDATE
let updateOrder = async (req, res) => {
    try {
        let updatedOrder = await orderService.updateOrder(req.params.id, req.body)
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
}

// DELETE
let deleteOrder = async (req, res) => {
    try {
        await orderService.deleteOrder(req.params.id)
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

// GET USER'S ORDER
let getUserOrder = async (req, res) => {
    try {
        let order = await orderService.getUserOrder(req.params.userId)
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
}

// GET ALL ORDERS
let getAllOrders = async (req, res) => {
    try {
        let orders = await orderService.getAllOrders()
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
}

// GET MONTHLY INCOME
let getMonthlyIncome = async (req, res) => {
    try {
        let income = await orderService.getMonthlyIncome()
        return res.status(200).json({
            errCode: 0,
            message: 'get monthly income success',
            income
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

module.exports = { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders, getMonthlyIncome }