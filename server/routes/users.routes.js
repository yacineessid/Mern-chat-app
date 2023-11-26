const express=require('express')
const router=express.Router()
const { registerUser, loginUser, findUser, findAllUsers } = require('../controllers/user.controller')

// post new user
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/user',findAllUsers)
router.get('/user/:userId',findUser)

module.exports=router