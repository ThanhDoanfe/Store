let Product = require('../models/Product.js')

let createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newProduct = await new Product(data).save()
            resolve(newProduct)
        } catch (err) {
            reject(err)
        }
    })
}

let updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedProduct = await Product.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            resolve(updatedProduct)
        } catch (err) {
            reject(err)
        }
    })
}

let deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.findByIdAndDelete(id);
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}

let getProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let product = await Product.findById(id);
            resolve(product)
        } catch (err) {
            reject(err)
        }
    })
}

let getAllProducts = (getNewest, getByCategories) => {
    let products, limit = 3;
    return new Promise(async (resolve, reject) => {
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
            resolve(products)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = { createProduct, updateProduct, deleteProduct, getProduct, getAllProducts }