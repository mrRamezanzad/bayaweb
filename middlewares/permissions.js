/**
 *  this file controlls all permissions that a use needs to grant for doing several defined
    operations in our services
 *  - isLoggedIn fn(): next() | next(err: <Error>)
 *  - isPermittedToAdd fn(): next() | next(err: <Error>)
 *  - isPermittedToEdit fn(): next() | next(err: <Error>)
 *  - isPermittedToDelete fn(): next() | next(err: <Error>)
 */

const {verify} = require('jsonwebtoken')

const { badRequest, forbidden } = require('../errors/ApiError')
const {findOne} = require('../services/users.service')

const {JWT_SECRET } = require('../configs')

exports.isLoggedIn = async (req, res, next) => {
    if(!req.header("Authorization")) return  next(badRequest('you should provide proper credentials'))
    const token = req.header("Authorization").replace("Bearer ", "")
        
    verify(token, JWT_SECRET, async (err, decoded) => {
        if(err) return next(badRequest('you should provide proper credentials'))
        
        const userId = decoded['id']
        const user = await findOne({_id: userId, token})

        if(!user) return next(badRequest('you should provide proper credentials'))
        res.locals.user = user
        next()
    })
}

exports.isPermittedToAdd = async (req, res, next) => {
    const isPermitted = res.locals.user.access.indexOf('add') !== -1
    if(isPermitted) return next()
    next(forbidden('you are not allowed to add'))
}

exports.isPermittedToEdit = async (req, res, next) => {
    const isPermitted = res.locals.user.access.indexOf('edit') !== -1
    if(isPermitted) return next()
    next(forbidden('you are not allowed to edit'))
}

exports.isPermittedToDelete= async (req, res, next) => {
    const isPermitted = res.locals.user.access.indexOf('delete') !== -1
    if(isPermitted) return next()
    next(forbidden('you are not allowed to delete'))
}