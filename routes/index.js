var express = require('express');
var router = express.Router();
var fs = require('fs');
var jsonfile = require('jsonfile');
var projpath = '/home/ktbsh/werk/telka/node_web/kyoma';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { obrazky: fs.readdirSync(req.app.locals.basedir+'/public/images'), slidespeed: jsonfile.readFileSync(projpath+'/data.json').speed });
});

module.exports = router;
