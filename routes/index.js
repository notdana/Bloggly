const express = require('express')

const router = express.Router()

// Login/Langing page for GET /

router.get('/',(req,res)=>{
    res.render('login')
})

// Dashboard for GET /dashboard
router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})

module.exports = router
