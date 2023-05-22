var express = require ('express')
const { registerUser, authUser } = require('../controllers/userController');
const  router = express.Router();
/* GET users listing. */


router.post('/user',registerUser)
router.post('/login',authUser)
module.exports = router;
