const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const checklogin = async (req , res, next) => {
     let token;

     if(req.headers.authorization && res.headers.authorization.startWith('Bearer')){
          try {
               token = req.headers.headers.split(' ')[1];
               const decoded = jwt.verify(token , process.env.JWT_SECRET);
               req.user = await User.findById(decoded.id).select('-password');
               next();
          } catch (error) {
               console.log(error);
               res.status(401).json({ message: 'Not authorized, failed' });
          }
     }

     if (!token) {
          res.status(401).json({ message: 'Not authorized, no token' });
      }
};

module.exports = {checklogin};