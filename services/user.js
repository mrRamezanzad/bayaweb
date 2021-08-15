const userModel = require('../models/user')

exports.create = async (userInfo) => {
    return new Promise(async (resolve, reject) => {
        const user = userModel.create(userInfo).then((doc) => {
            resolve(`i have registered your user in database ${doc}`)
            
        }).catch(reject)
    })
}

exports.findAll = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const users = await userModel.find()
            resolve(users)
            
        } catch (err) {reject(err)}
    })
}

exports.findOne = async (userId) => {
    return new Promise (async (resolve, reject) => {
        try {
            const user = await userModel.findOne({_id: userId})
            resolve(user)

        } catch (err) {reject(err)}
    })
}

exports.update = async (userId, updateUserInfo) => {
    return new Promise (async (resolve, reject) => {
        try{
            const updatedUser = (await userModel.updateOne({_id: userId}, updateUserInfo, {new: true})).ok
            resolve(Boolean(updatedUser))

        } catch (err) {reject(err)}
    })
}

exports.delete = (userId) => {
    return new Promise (async (resolve, reject) => {
        try{
            const isUserDeleted = (await userModel.deleteOne({_id: userId})).ok
            resolve(Boolean(isUserDeleted))

        } catch (err) {reject(err)}
    })
}