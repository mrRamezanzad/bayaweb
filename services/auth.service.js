const {compare} = require('bcrypt')
const {verify} = require('jsonwebtoken')

const {findOne, update} = require('./users.service')
const setToken = require('../utils/auth.util')

const {JWT_SECRET} = require('../configs')
const { badRequest } = require('../errors/ApiError')

async function verifyPassword(enteredPassword, hashedPassword) {
    const passwordCompareResult = await compare(enteredPassword, hashedPassword)
    return passwordCompareResult
}

exports.logUserIn = async (username, password) => {
    const user = await findOne({username})
    if(!user) throw badRequest('user not found')

    const isPasswordValid = await verifyPassword(password, user.password)
    if(!isPasswordValid) throw badRequest('invalid password')

    let isTokenValid = false
    try {
        if (!user['token'].trim()) throw badRequest('invalid token')
        isTokenValid = Boolean(await verify(user.token, JWT_SECRET))

    } catch (err) {isTokenValid = false}
    if (isTokenValid) throw badRequest('you should logout first')

    user.token = await setToken(user.id)
    user.save()
    return {success: true, token: user.token}
}

exports.logUserOut = async user => await update(user.id, {token: ""})