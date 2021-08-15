const express = require('express');
const router = express.Router();
const {create} = require('../services/user')
const {dbConnection} = require('../utils/db')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// registeration's view rendering
router.get('/register', function (req, res) {
  res.render('register')
})

// handling registration proccess 
router.post('/register', async ({body}, res) => {
  const userInfo = body
  try {
    const newUser = await create(userInfo)
    res.status(201).send(newUser)

  } catch (err) {res.status(500).send(err)}

})

module.exports = router;
