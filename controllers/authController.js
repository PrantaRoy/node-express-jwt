const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
     return jwt.sign({id}, process.env.JWT_SECRET, {
          expiresIn: '1h',
     });
}

exports.registerUser = async (req , res) => {
     const {name, email, phone, address, password } = req.body;

     try {
          const userExists = await User.findOne({email});

          if(userExists){
               return res.status(400).json({ message: 'Email Already Exist'});
          }
          const user = await User.create({
               name, email, address, phone, password 
          });

          res.status(201).json({
               _id : user._id,
               name: user.name,
               email: user.email,
               phone: user.phone,
               address: user.address,
               token: generateToken(user.id),
          });
     } catch (error) {
          console.log(error);
          res.status(500).json({
               'message' : 'Server Error'
          })
     };


};


exports.authUser = async (req, res) => {
     const {email, password} = req.body;

     try {
          const user = await User.findOne({email});
          if(user && (await user.matchPassword(password))){
               res.json({
                    _id : user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    token: generateToken(user.id),
               });
          }else{
               res.status(401).json({ message: 'Invalid email or password' });
          }
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Server error' });
     }
};

exports.getProfile = async (req, res) => {
     const user = await User.findById(req.user.id).select('-password');
 
     if (user) {
         res.json(user);
     } else {
         res.status(404).json({ message: 'User not found' });
     }
 };