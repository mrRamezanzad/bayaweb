const userModel = require('../models/user.model')
const { badRequest } = require('../errors/ValidationError')

exports.create = async (userInfo) => { 
    try{
        return await userModel.create(userInfo)

    } catch(err) {
        throw badRequest(err)
    }
}

exports.findAll = async () => { 
    return await userModel.find()
}

exports.findOne = async (match) => { 
    return await userModel.findOne(match)
}

exports.update = async (userId, updateUserInfo) => { 
    let result = await userModel.updateOne({_id: userId}, {$set: updateUserInfo}, {new: true})
    return Boolean(result)
}

exports.delete = async (userId) => {
    return  Boolean((await userModel.deleteOne({_id: userId})).ok)
}