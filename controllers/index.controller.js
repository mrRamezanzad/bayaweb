const express = require('express');
const { badRequest } = require('../errors/ApiError');
const router = express.Router();

const {isLoggedIn, notLoggedIn} = require("../middlewares/permissions");
const {logUserIn, logUserOut} = require("../services/auth.service");
const { findAll } = require('../services/users.service');

/* GET home page. */
router

.get('/', async (req, res, next) =>{
  if(!req['session']['token']) return res.status(401).redirect('/login')
  try{

    const users = await findAll()
    res.render('index', {users})

  } catch (err) {res.redirect('/login')}
})

// registeration's view rendering
.get('/login', notLoggedIn, async (req, res, next) => res.render('login', {title: 'login'}))

.post('/auth/login', notLoggedIn, async (req, res, next) => {
  
  try{
    const {username, password} = req.body
    const loginResult = await logUserIn(username, password)
    req['session']['token'] = loginResult.token
    res.redirect('/')
  } catch(err) {res.redirect('/login')}
    
})

.get('/auth/logout', isLoggedIn, async (req, res, next) => {
  try{

    const user = res.locals.user
    const isLoggedOut = await logUserOut(user)
    if(isLoggedOut) {
      req['session']['token'] = ''
      res.redirect('/login')
    }

  }catch(err) {res.redirect('/login')}
})

module.exports = router;
