const {Router}= require('express')
const router = Router()

const indexController = require('../controllers/index.controller')
const usersController = require('../controllers/users.controller')
const {isLoggedIn} = require('../middlewares/permissions')

router.use('/', indexController)
router.use('/users', isLoggedIn, usersController)

module.exports = router