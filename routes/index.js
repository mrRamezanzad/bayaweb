const express = require('express');
const router = express.Router();
const {create} = require('../services/user')
const {login} = require("../services/auth");
const { isPermittedToAdd, isLoggedIn } = require('../middlewares/permissions');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// registeration's view rendering
router.get('/register', function (req, res) {
  res.render('register')
})

// handling registration proccess 
router.post('/register', isLoggedIn, isPermittedToAdd, async ({body}, res) => {
  const userInfo = body
  userInfo.access = JSON.parse(userInfo.access)
  try {
    const newUser = await create(userInfo)
    res.status(201).send(newUser)

  } catch (err) {res.status(500).send(err)}

})

router.post('/auth/login', async (req, res, next) => {
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
