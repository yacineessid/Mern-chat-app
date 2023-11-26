// create  message routes
const express = require('express');
const { findMessagesByChatID, createMessage } = require('../controllers/MsgController');
const router = express.Router();

router.post('/',createMessage),
router.get('/:chatId',findMessagesByChatID)
module.exports=router;