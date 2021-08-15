const jwt = require('jsonwebtoken')
const {findOne} = require('../services/user')
const JWT_SECRET = 'SECRET'

exports.isLoggedIn = async (req, res, next) => {
    try {
        if(!req.header("Authorization")) return next(new Error('you should provide credentials'))
        const token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, JWT_SECRET)
        const userId = decodedToken.id
        const user = await findOne({_id: userId, token})
        if(!user) throw new Error('credentials required')
        next()
        res.locals.user = user

    } catch (err){next(err)}
}

exports.isPermittedToAdd = async () => {
    if(res.locals.user.access.indexOf('add') === -1) next(new Error("you are not permitted to add"))
    next()
}

exports.isPermittedToEdit = async () => {
    if(res.locals.user.access.indexOf('edit') === -1) next(new Error("you are not permitted to edit"))
    next()
}

exports.isPermittedToDelete= async () => {
    if(res.locals.user.access.indexOf('delete') === -1) next(new Error("you are not permitted to delete"))
    next()
}