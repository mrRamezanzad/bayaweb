const express = require('express');
const router = express.Router();

const {login} = require("../services/auth.service");

/* GET home page. */
router

.get('/', async (req, res, next) => res.render('index', { title: 'Express' }))

// registeration's view rendering
.get('/register', async (req, res, next) => res.render('register'))

.post('/auth/login', async (req, res, next) => {
 
  try{
    const {username, password} = req.body
    const loginResult = await login(username, password)
    res.send(loginResult)
    
  } catch(err) {res.status(500).send(err)}
})

module.exports = router;
