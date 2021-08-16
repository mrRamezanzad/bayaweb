const {Schema, model}  = require('mongoose')

const userSchema = new Schema({
        username: {
          type: String,
          minLength: 5,
        },

        password: {
          type: String,
          minLength: 5,
          
        },
        email: {
          type: String
        },

        mobile: {
          type: String
        },

        access: {
          type: [String], enum:["add", "edit", "delete"], default: []
        },

        token: {
          type: String,
          default: ""
        },
        
})

module.exports = model('User', userSchema)