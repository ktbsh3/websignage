var express = require('express');
var router = express.Router();
var fileman = require('../classes/fileman');

for (let i = 1; i <= 100; i++) {
  router.get('/'+i, function(req, res, next) {
    res.render('index', { screen: fileman.getScreen(i), slidespeed: 5000 });
  });
}

router.get('/', function(req, res, next) {
  res.render('index', { obrazky: fileman.getDirListingSync(fileman.dirs.images), slidespeed: fileman.getConfigSync('speed') });
});



module.exports = router;
