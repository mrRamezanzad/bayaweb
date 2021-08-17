// ========================================-=========================================================
//          this file is for modulizing db connection and initializing adming for our project

const {connect} = require('mongoose')
const {create, findOne} = require('../services/users.service')

const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://localhost:27017/bayaweb'
const dbConnection = connect(DB_ADDRESS,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                })
    .then(console.log('[+] successfully connected to DB'))
    .catch((err) => console.log('[+] DB connection failed!!!', `\n ${err}`)
)


async function checkAdminExistance() {
    try{
        const admin = await findOne({username: "admin"})
        return Boolean(admin)

    } catch(err) {console.log(err)}
}

async function createAdmin() {
    try {
        let admin = {
                username: "admin",
                password: "admin",
                email: "admin@gmail.com",
                mobile: "09122345564",
                access: ['add', 'edit', 'delete']
        }

        admin = await create(admin)
        console.log(`Admin Created: ${admin}`)

    } catch(err) {return err}
}

(async () => {
    try{    
        const adminExists = await checkAdminExistance()
        
        if(!adminExists) createAdmin()

    } catch (err) {console.log(err)}
})()

module.exports = dbConnection