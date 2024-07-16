const router = require('express').Router();
const Category = require('../models/Category.js');
const { verifyTokenAndAdmin } = require('./verifyToken.js')

// CREATE
router.post('/create', verifyTokenAndAdmin, async (req, res) => {
    const newCategory = new Category(req.body)
    try {
        await newCategory.save()
        return res.status(200).json({
            errCode: 0,
            message: 'create category success',
            newCategory
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'create category fail'
        })
    }
})

// UPDATE
router.put('/update/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        return res.status(200).json({
            errCode: 0,
            message: 'update category success',
            updatedCategory
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'update category fail'
        })
    }
})

// DELETE
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            errCode: 0,
            message: 'delete category success',
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'delete category fail'
        })
    }
})

// GET ALL
router.get('/findAll', verifyTokenAndAdmin, async (req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json({
            errCode: 0,
            message: 'get all category success',
            categories
        })
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'get all category fail'
        })
    }
})

module.exports = router;