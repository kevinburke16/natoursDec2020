const jwt = require('jsonwebtoken');
 
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
 
module.exports = (user, statusCode, res) => {
  const token = signToken(user._id);
 
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};