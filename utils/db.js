// ========================================-=========================================================
//          this file is for modulizing db connection and initializing adming for our project

const {connect} = require('mongoose')
const userModel = require('../models/user')
const {create} = require('../services/user')

const dbConnection = connect('mongodb+srv://keystar:X3Z4hCYqkzEMzr@cluster0.xfczv.mongodb.net/bayaweb?retryWrites=true&w=majority',
                                {
                                    useNewUrlParser: true,
                                    useUnifiedTopology: true,
                                    // useCreateIndex: true,
                                })
                    .then(console.log('[+] successfully connected to DB'))
                    .catch((err) => console.log('[+] DB connection failed!!!', `\n ${err}`))


async function checkAdminExistance() {
    const admin = await userModel.findOne({username: "admin"})
    return Boolean(admin)
}

async function createAdmin() {
    try {
        const admin = await create({username: "admin", password: "admin", firstName: "root", access: 4})
        console.log(`i created Admin: ${admin}`)
    } catch(err) {return err}
}

(async () => {
    try{    
        const adminExists = await checkAdminExistance()
        
        if(!adminExists) createAdmin()

    } catch (err) {console.log(err)}
})()

module.exports = dbConnection
