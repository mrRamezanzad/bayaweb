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
    if(!req['session']['token']) return  res.redirect('/login')
    
    const token = req['session']['token']
    verify(token, JWT_SECRET, async (err, decoded) => {
        if(err){ 
            req['session']['token'] = ''
            return res.redirect('/login')
    }
        
        const userId = decoded['id']
        const user = await findOne({_id: userId, token})

        if(!user) {
            req['session']['token'] = ''
            return res.redirect('/login')
        }
        res.locals.user = user
        next()
    })
}

exports.notLoggedIn = async (req, res, next) => {
    if(!req['session']['token']) {
        return next()
    }
    
    const token = req['session']['token']
    verify(token, JWT_SECRET, async (err, decoded) => {
        if(err) return next()
        
        const userId = decoded['id']
        const user = await findOne({_id: userId, token})

        if(!user) return next()
        res.locals.user = user
        res.redirect('/')
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