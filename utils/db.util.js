// ========================================-=========================================================
//          this file is for modulizing db connection and listening for db's important events 
//                   furthermore: initializing adming for our projects first build

const {connect, connection} = require('mongoose')
const {create, findOne} = require('../services/users.service')

const {DB_ADDRESS} = require('../configs')

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

connection.on('error', err => {
    console.log('================================================================================')
    console.log('   there was a problem during database connection I have to shut down server')
    console.log('================================================================================\n ',err)
    process.exit(1)}
)
    
// connection.on('reconnectTries', err => {
//     console.log('================================================================================')
//     console.log('   there was a problem during database connection I have to shut down server')
//     console.log('================================================================================\n ',err)
//     process.exit(1)}
// )


// ===========================================================================================================
//  if there is no admin in database, this part will create it for us and logs it's data in terminal, for now
// ===========================================================================================================
                    //   TODO:  send newly created admin details to it's email address

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