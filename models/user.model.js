const {Schema, model}  = require('mongoose')

const userSchema = new Schema({
        username: {
          type: String,
          // minLength: 5,
        },

        password: {
          type: String,
          // minLength: 5,
          
        },
        email: {
          type: String,
          validate: {
            validator: (value) => {
              const emailPattern = /^.{4,}@(gmail|yahoo)\.(com|net|io)$/
              const isValidEmail = emailPattern.test(value)
              return isValidEmail
            },
            message: "please enter a valid email address"
          }
        },

        mobile: {
          type: String,
          validate: {
            validator: (value) => {
              iranianMobilePattern = /^(\+98|0)?9\d{9}$/
              isValidMobile = iranianMobilePattern.test(value)
              return isValidMobile
            },
            message: "your phone number is invalid"
         }
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