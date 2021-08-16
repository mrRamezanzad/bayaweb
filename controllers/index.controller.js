const express = require('express');
const router = express.Router();

const {login} = require("../services/auth.service");

/* GET home page. */
router

.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

// registeration's view rendering
.get('/register', function (req, res) {
  res.render('register')
})

.post('/auth/login', async (req, res, next) => {
  try{
    const {username, password} = req.body
    const loginResult = await login(username, password)
    if(loginResult instanceof Error) return res.status(401).send('wrong credentials')
    // res.send(loginResult)
    res.setHeader('Authorization', loginResult.token)
    .status(200).send(loginResult)

  } catch(err) {res.status(500).send(err)}
})

module.exports = router;