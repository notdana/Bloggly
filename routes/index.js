const express = require('express')

const router = express.Router()

// Login/Langing page for GET /
router.get('/',(req,res)=>{
    res.render('login', {
        layout: 'login',
    })
})

// Dashboard for GET /dashboard
router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

router.get('/test',(req,res)=>{
    res.render('layouts/login')
})

module.exports = router
