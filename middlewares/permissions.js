const jwt = require('jsonwebtoken')
const {findOne} = require('../services/users.service')
const JWT_SECRET = 'SECRET'

exports.isLoggedIn = async (req, res, next) => {
    if(!req.header("Authorization")) return next(new Error('you should provide credentials'))
    const token = req.header("Authorization").replace("Bearer ", "")
    let decodedToken  
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if(err) throw new Error("we're suffering difficulties validating your token")
        decodedToken = decoded

        const userId = decodedToken.id
        const user = await findOne({_id: userId, token})
        if(!user) throw new Error('credentials required')
        res.locals.user = user
        next()
    })
}

exports.isPermittedToAdd = async (req, res, next) => {
    const isPermitted = res.locals.user.access.indexOf('add') !== -1
    if(isPermitted) return next()
    next(new Error("you are not permitted to add"))
}

exports.isPermittedToEdit = async (req, res, next) => {
    const isPermitted = res.locals.user.access.indexOf('edit') !== -1
    if(isPermitted) return next()
    next(new Error("you are not permitted to edit"))
}

exports.isPermittedToDelete= async (req, res, next) => {
    const isPermitted = res.locals.user.access.indexOf('delete') !== -1
    if(isPermitted) return next()
    next(new Error("you are not permitted to delete"))
}