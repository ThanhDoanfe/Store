let User = require('../models/User.js');

let updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: data },
                { new: true }
            );
            resolve(updatedUser);
        } catch (err) {
            reject(err)
        }
    })
}

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.findByIdAndDelete(id);
            resolve();
        } catch (err) {
            reject(err)
        }
    })
}

let getUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(id);
            resolve(user);
        } catch (err) {
            reject(err)
        }
    })
}

let getAllUsers = (getNewest) => {
    const limit = 3;
    return new Promise(async (resolve, reject) => {
        try {
            let users = getNewest
                ? await User.find().sort({ _id: -1 }).limit(limit)
                : await User.find();
            resolve(users);
        } catch (err) {
            reject(err)
        }
    })
}

let getUserStats = () => {
    let date = new Date();
    let lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    return new Promise(async (resolve, reject) => {
        try {
            let data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } },
                {
                    $project: {
                        month: { $month: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: "$month",
                        total: { $sum: 1 },
                    },
                },
            ]);
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getUserStats }