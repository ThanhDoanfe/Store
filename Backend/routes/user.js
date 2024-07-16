const router = require('express').Router();
const User = require('../models/User.js');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const { updateUser, deleteUser, getUser, getAllUsers, getUserStats } = require('../controllers/userController.js')
const upload = require('../cloudinary.js');
const CryptoJS = require('crypto-js');

// CREATE
router.post('/create', upload.single('avatar'), async (req, res) => {
    const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSPHRASE
        ).toString(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        avatar: req.file ? req.file.path : ''
    });
    try {
        await newUser.save();
        const { password, __v, ...userInfo } = newUser._doc
        return res.status(200).json({
            errCode: 0,
            message: 'create user success',
            newAccount: userInfo
        });
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        });
    }
})

// UPDATE
router.put('/update/:id', verifyTokenAndAuthorization, upload.single('avatar'), async (req, res) => {
    console.log(req.body)
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASSPHRASE
        ).toString();
    }
    if (req.file) req.body.avatar = req.file.path

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({
            errCode: 0,
            message: 'update user success',
            updatedUser: {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                address: updatedUser.address,
                phoneNumber: updatedUser.phoneNumber,
                avatar: updatedUser.avatar,
                isAdmin: updatedUser.isAdmin
            }
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
        await User.findByIdAndDelete(req.params.id);
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

// GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'find user success',
            user: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                avatar: user.avatar,
                isAdmin: user.isAdmin
            },
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

// GET ALL USERS
router.get('/findAll', verifyTokenAndAdmin, async (req, res) => {
    const limit = 4;
    try {
        let users = req.query.getNewest
            ? await User.find().sort({ _id: -1 }).limit(limit)
            : await User.find();
        users = users.map(item => {
            return {
                _id: item._id,
                userName: item.userName,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                address: item.address,
                phoneNumber: item.phoneNumber,
                avatar: item.avatar,
                isAdmin: item.isAdmin,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
        })
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
})

// GET USERS STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
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
})

module.exports = router;