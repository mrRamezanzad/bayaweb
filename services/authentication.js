const userModel = require('../models/user')

exports.register = (userInfo) => {
    const user = userModel.create(userInfo).then((doc) => {
        return `i have registered your user in database ${doc}`
    }).catch(err => err)
    // const user =  new userModel(userInfo).save((err, doc) => {
    //     if(err) return err
    //     return `i have registered your user in database ${doc}`
    // })
}