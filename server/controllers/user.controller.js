const User = require("../models/userSchema");
const bcrypt =require('bcrypt')
const jwt= require('jsonwebtoken')
const validator = require('validator');



function generateToken(userId) {
    const payload = { id: userId };
    const secretKey=process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey, { expiresIn: '10h' }); // You can change the expiration as needed
    
    return token;
  }
  const registerUser = async (req, res) => {
    try {
      const { email, name, password } = req.body;
      let user = await User.findOne({ email });
  
      if (user) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      if (!email || !name || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Email must be in email format' });
      }
  
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'You must enter a strong password' });
      }
        res.setHeader('Content-Type', 'application/json');

      user = new User({ email, name, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      await user.save();
      const token = generateToken(user._id);

      res.status(200).json({ _id: user._id, email, name, token });
    } catch (error) {
      // Send the error message as part of the response
      res.status(500).json({ error: error.message });
    }
  };
  
  

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log(user, 'userrrr server');
      if (!user) {
        return res.status(400).json('email or password is invalid');
      }
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(400).json('email or password is invalid');
      }
      const token = generateToken(user._id);
      return res.status(200).json({ _id: user._id, email, name: user.name, token });
    } catch (error) {
      // Send the error message as part of the response
      return res.status(500).json({ error: error.message });
    }
  }
  

  const findUser=async(req,res)=>{
const userId=req.params.userId
    try{
const user=await User.findById(userId)
res.status(200).json(user)
}
 catch (error) {
    res.status(500).json({ error: error.message }); 
}}

const findAllUsers=async(req,res)=>{
        try{
    const users=await User.find()
    res.status(200).json(users)
    }
     catch (error) {
        res.status(500).json({ error: error.message }); 
    }}
    
    

module.exports={
    registerUser,loginUser,findUser,findAllUsers
}
