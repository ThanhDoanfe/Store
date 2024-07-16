let Order = require('../models/Order.js')

let createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newOrder = await new Order(data).save()
            resolve(newOrder)
        } catch (err) {
            reject(err)
        }
    })
}

let updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedOrder = await Order.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            resolve(updatedOrder)
        } catch (err) {
            reject(err)
        }
    })
}

let deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Order.findByIdAndDelete(id);
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

let getUserOrder = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userOrder = await Order.findOne({
                userId
            });
            resolve(userOrder)
        } catch (err) {
            reject(err)
        }
    })
}

let getAllOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let orders = await Order.find()
            resolve(orders)
        } catch (err) {
            reject(err)
        }
    })
}

let getMonthlyIncome = () => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    return new Promise(async (resolve, reject) => {
        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: previousMonth } } },
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
            resolve(income)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrders, getMonthlyIncome }