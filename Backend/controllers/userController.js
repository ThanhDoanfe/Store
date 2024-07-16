let userService = require('../services/userService.js');

// UPDATE USER
let updateUser = async (req, res) => {
    try {
        let updatedUser = await userService.update(req.params.id, req.body);
        return res.status(200).json({
            errCode: 0,
            message: 'update user success',
            updatedUser: {
                id: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                address: updatedUser.address,
                phoneNumber: updatedUser.phoneNumber,
                isAdmin: updatedUser.isAdmin
            }
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// DELETE USER
let deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
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

// GET USER
let getUser = async (req, res) => {
    try {
        let user = await userService.getUser(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'find user success',
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                isAdmin: user.isAdmin
            },
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// GET ALL USERS
let getAllUsers = async (req, res) => {
    try {
        let users = await userService.getAllUsers(req.query.getNewest);
        return res.status(200).json({
            errCode: 0,
            message: 'find all users success',
            users
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

// GET USERS STATS
let getUserStats = async (req, res) => {
    try {
        let data = await userService.getUserStats();
        return res.status(200).json({
            errCode: 0,
            message: 'get stats success',
            data
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
}

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getUserStats }