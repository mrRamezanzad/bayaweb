const {Schema, model}  = require('mongoose')

const userSchema = new Schema({
        username: {
          type: String,
          required: true,
          trim: true,
          unique: true,
          minLength: 5,
          maxLength: 25
        },

        password: {
          type: String,
          required: true,
          trim: true,
          minLength: 5,
          maxLength: 25
          
        },
        email: {
          type: String,
          trim: true,
          unique: true,
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
          trim: true,
          unique: true,
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