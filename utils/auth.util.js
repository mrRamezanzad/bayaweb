const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'SECRET'

function setToken(userId) {
   return jwt.sign({id: userId.toString()}, JWT_SECRET,{ expiresIn: '1h'})
}

module.exports = setToken