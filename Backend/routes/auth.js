const router = require('express').Router();
const User = require('../models/User.js');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const upload = require('../cloudinary.js');

// REGISTER
router.post('/register', upload.single('avatar'), async (req, res) => {
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
        return res.status(200).json({
            errCode: 0,
            message: 'register success'
        });
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        });
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName,
        });
        if (user) {
            let token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_KEY, { expiresIn: '3d' });

            const decrypted = CryptoJS.AES.decrypt(user.password, process.env.PASSPHRASE);
            return decrypted.toString(CryptoJS.enc.Utf8) === req.body.password
                ? res.status(200).json({
                    errCode: 0,
                    message: 'login success',
                    user: {
                        _id: user._id,
                        userName: user.userName,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address,
                        phoneNumber: user.phoneNumber,
                        isAdmin: user.isAdmin,
                        avatar: user.avatar
                    },
                    token
                })
                : res.status(200).json({
                    errCode: 1,
                    message: 'wrong password'
                })
        } else {
            return res.status(200).json({
                errCode: 1,
                message: 'invalid username'
            })
        }
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: err
        })
    }
})

module.exports = router;