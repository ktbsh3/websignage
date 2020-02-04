var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var projpath = '/home/ktbsh/werk/telka/node_web/kyoma';


/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body.speed*1000);
  jsonfile.writeFileSync(projpath+'/data.json', { speed: req.body.speed*1000 });
  res.render('admin');
});


module.exports = router;
