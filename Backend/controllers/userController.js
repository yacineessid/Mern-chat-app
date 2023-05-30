const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema');
// const generateToken = require('../config/generateToken');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please enter all fields');
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('This user already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: token,
    });
    console.log(generateToken(user._id),'tokeeeeenn');
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;  
    const user = await User.findOne({email})
    // const users = await User.find();

    if(user && (await user.matchPassword(password))){
      console.log(`User`, user.matchPassword(password));
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: token
        })
    console.log(generateToken(user._id),'tokeeeeenn');

    }  
    else{
        res.status(401)
        throw new Error('invalid email or password')
    }    
                                         
})

module.exports = { registerUser ,authUser};
