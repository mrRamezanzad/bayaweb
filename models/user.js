const {Schema, model}  = require('mongoose')

const userSchema = new Schema({
        username: String,
        password: String,
        firstName: {type: String},
        access: {type: [String], enum:["add", "edit", "delete"]},
        token: String,
        
})

module.exports = model('User', userSchema)