const {Schema, model}  = require('mongoose')

const userSchema = new Schema({
        username: String,
        password: String,
        firstName: {type: String},
        access: {type: Number, enum:[1,2,3,4], default: 1}
        
})

module.exports = model('User', userSchema)