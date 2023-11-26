//create chat routes
const express = require('express');
const router = express.Router();
//import controller
const { createChat, findUsersChat, findChat } = require('../controllers/chatController')
router.post('/', createChat);
router.get('/find/:firstId/:secondId', findChat)
router.get('/:userId', findUsersChat)
module.exports=router;