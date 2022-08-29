const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Blog = require('../models/Blog')

// Login/Langing page for GET /
router.get('/', ensureGuest, (req,res)=>{
    res.render('login', {
        layout: 'login',
    })
})

// Dashboard for GET /dashboard
router.get('/dashboard',ensureAuth, async (req,res)=>{
    try {
        const blogs = await Blog.find({user: req.user.id}).lean()
        console.log(blogs)
        res.render('dashboard', {
            name: req.user.firstName,
            blogs
        })
    } catch (error) {
        console.log(error)
        res.render('error/500')
    }
})

router.get('/test',(req,res)=>{
    "MEOW"
})

module.exports = router
