var express = require('express');
var router = express.Router();
var fileman = require('../classes/fileman');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', { config: fileman.getConfigSync(), files: fileman.getDirListingSync(fileman.dirs.images), lastset: req.param('id'), mode: req.param('mode')});
});

module.exports = router;
