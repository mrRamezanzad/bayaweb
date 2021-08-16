const {findOne} = require('./users.service')
const setToken = require('../utils/auth.util')

function verifyPassword(password) {
    return true
}

exports.login = (username, password) => {
    return new Promise (async (resolve, reject) => {
        try {

            const user = await findOne({username})
            if(!user) throw new Error('wrong username or password')
            if(!verifyPassword(password)) throw new Error('check your password')
            
            user.token = setToken(user.id)
            user.save()
            resolve({success: true, token: user.token})
        } catch (err) {reject(err)}

    })
}