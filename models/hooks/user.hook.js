const {hashSync} = require('bcrypt')

module.exports = (userSchema) => {

/** hashing password before saving users in database */
  userSchema.pre('save', {document: true, query: false}, async function (next) {
    let doc = this
    if(!doc.isNew) return next()

    doc.password = hashSync(doc.password, 12)
    if(doc.password) return next()
    throw new Error('there seems to be difficulties in password hashing')
  })

  // userSchema.pre('updateOne', {document: true, query: false}, async function (next) {
  //   let doc = this
  //   console.log('im in pre updateOne hook')
  // })

/** this hook cheks if an update is changing psswrod 
 *  if true then hashes password before updating user in database 
 */
  userSchema.pre('updateOne', async function (next) {
    let doc = this
    let isChangingPassword = Boolean(doc._update.$set['password'])
    if (!isChangingPassword) next()
    doc._update.$set['password'] = hashSync(doc._update.$set['password'], 12)
  })

  return userSchema
}