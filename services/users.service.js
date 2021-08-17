const mongoose = require('mongoose')
const userModel = require('../models/user.model')

exports.create = async (userInfo) => await userModel.create(userInfo)

exports.findAll = async () => await userModel.find()

exports.findOne = async (match) => await userModel.findOne(match)

exports.update = async (userId, updateUserInfo) => {
    let result = await userModel.updateOne({_id: userId}, {$set: updateUserInfo}, {new: true})
    return Boolean(result)
}

exports.delete = async (userId) => Boolean((await userModel.deleteOne({_id: userId})).ok)