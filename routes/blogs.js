const express = require('express')
const router = express.Router()
const { ensureAuth} = require('../middleware/auth')
const Blog = require('../models/Blog')

// show add page, GET /blogs/add
router.get('/add', ensureAuth, (req,res)=>{
    res.render('blogs/add')
})

//Process add form, POST /blogs
router.post('/', ensureAuth, async (req,res)=>{

    try {
        req.body.user = req.user.id
        await Blog.create(req.body)
        res.send({error:false, response: "Blog created"});
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})

module.exports = router
