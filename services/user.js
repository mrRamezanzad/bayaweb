const userModel = require('../models/user')

exports.create = (userInfo) => {
    return new Promise(async (resolve, reject) => {
        const user = userModel.create(userInfo).then((doc) => {
            resolve(`i have registered your user in database ${doc}`)
            
        }).catch(reject)
    })
}