const express = require('express');
const router = express.Router();

const {logUserIn, logUserOut} = require("../services/auth.service");
const {update} = require("../services/users.service");
const {isLoggedIn} = require("../middlewares/permissions");

/* GET home page. */
router

.get('/', async (req, res, next) => res.render('index', { title: 'Express' }))

// registeration's view rendering
.get('/register', async (req, res, next) => res.render('register'))

.post('/auth/login', async (req, res, next) => {
 
  try{
    const {username, password} = req.body
    const loginResult = await logUserIn(username, password)
    res.send(loginResult)
    
  } catch(err) {next(err)}
})

.post('/auth/logout', isLoggedIn, async (req, res, next) => {
/**  logging out with help of res.user which is saved by isLoggedIn middleware check */
  try{

    const user = res.locals.user
    const isLoggedOut = await logUserOut(user)
    if(isLoggedOut) res.send('logged out succesfully')

  }catch(err) {next(err)}
})

module.exports = router;
