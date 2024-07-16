let Cart = require('../models/Cart.js')

let createCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newCart = await new Cart(data).save()
            resolve(newCart)
        } catch (err) {
            reject(err)
        }
    })
}

let updateCart = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedCart = await Cart.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            resolve(updatedCart)
        } catch (err) {
            reject(err)
        }
    })
}

let deleteCart = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Cart.findByIdAndDelete(id);
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

let getUserCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userCart = await Cart.findOne({
                userId
            });
            resolve(userCart)
        } catch (err) {
            reject(err)
        }
    })
}

let getAllCarts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = await Cart.find()
            resolve(carts)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = { createCart, updateCart, deleteCart, getUserCart, getAllCarts }