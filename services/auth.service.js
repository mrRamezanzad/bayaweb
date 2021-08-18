const {compare} = require('bcrypt')
const {verify} = require('jsonwebtoken')

const {findOne, update} = require('./users.service')
const setToken = require('../utils/auth.util')

const {JWT_SECRET} = require('../configs')

async function verifyPassword(enteredPassword, hashedPassword) {
    const passwordCompareResult = await compare(enteredPassword, hashedPassword)
    return passwordCompareResult
}

exports.logUserIn = async (username, password) => {
    const user = await findOne({username})
    if(!user) throw new Error('check your credentials')

    const isPasswordValid = await verifyPassword(password, user.password)
    if(!isPasswordValid) throw new Error('check your credentials')

    let isTokenValid = false
    try {
        if (!user['token'].trim()) throw new Error('empty token field')
        isTokenValid = Boolean(await verify(user.token, JWT_SECRET))

    } catch (err) {isTokenValid = false}
    if (isTokenValid) throw new Error("you are already logged in")

    user.token = await setToken(user.id)
    user.save()
    return {success: true, token: user.token}
}

exports.logUserOut = async user => await update(user.id, {token: ""})