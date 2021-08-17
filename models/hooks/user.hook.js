const {hashSync} = require('bcrypt')

module.exports = (userSchema) => {

  userSchema.pre('save', {document: true, query: false}, async function (next) {
    let user = this
    user.password = hashSync(user.password, 10)
    if(user.password) return next()
    throw new Error('there seems to be difficulties in password hashing')
  })

  return userSchema
}
  