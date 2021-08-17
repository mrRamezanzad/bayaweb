const {compare} = require('bcrypt')

const {findOne} = require('./users.service')
const setToken = require('../utils/auth.util')

async function verifyPassword(enteredPassword, hashedPassword) {
    const passwordCompareResult = await compare(enteredPassword, hashedPassword)
    return passwordCompareResult
}

exports.login = async (username, password) => {
    const user = await findOne({username})
    if(!user) throw new Error('check your credentials')

    const isPasswordValid = await verifyPassword(password, user.password)
    if(!isPasswordValid) throw new Error('check your credentials')

    user.token = await setToken(user.id)
    user.save()
    return {success: true, token: user.token}
}
