const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../configs')

async function setToken(userId) {
   //FIXME: REPLACE LINES BELOW IN CASE OF PRODUCTION TO HAVE A SECURE LOGIN 
   //  return jwt.sign({id: userId.toString()}, JWT_SECRET,{ expiresIn: '1h'})
   return jwt.sign({id: userId.toString()}, JWT_SECRET)
}

module.exports = setToken