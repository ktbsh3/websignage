var express = require('express');
var router = express.Router();
var fileman = require('../classes/fileman');


/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body.speed);
  console.log(req.body.nOfScreens);
  fileman.setConfigSync('speed', req.body.speed*1000);
  fileman.setConfigSync('screens', req.body.nOfScreens);
  res.render('admin');
});

router.post('/remove/', function(req, res, next) {
  console.log("removing", req.body.screenID);
  fileman.removeScreen(Number(req.body.screenID));
  res.redirect('/admin')
});

router.post('/create/', function(req, res, next) {
  console.log("creating", req.body.screenID);
  fileman.addScreen(Number(req.body.screenID))
  res.redirect('/admin');
});


module.exports = router;

