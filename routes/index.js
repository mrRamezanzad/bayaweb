const express = require('express');
const router = express.Router();
const {register} = require('../services/authentication')


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
  res.send(await register(userInfo))

})

module.exports = router;
