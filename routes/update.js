var express = require('express');
var router = express.Router();
var fileman = require('../classes/fileman');


/* GET users listing. */
router.post('/', function(req, res, next) {
  fileman.setConfigSync('speed', req.body.speed*1000);
  fileman.setConfigSync('screens', req.body.nOfScreens);
  res.render('admin');
});

router.post('/filemgr/', function(req, res, next) {
  if(req.body.mode === 'remove') {
    for (var file in req.body) {
      if (file !== 'mode' && file !== 'screenselect') {
        fileman.deleteFileSync(file);
      }
    }
  }
  else if (req.body.mode === 'assign') {
    var screenselect = req.body.screenselect;
    for (var file in req.body) {
      if (file !== 'mode' && file !== 'screenselect') {
        fileman.assignFileSync(file, screenselect);
      }
    }
  }
  else if (req.body.mode === 'unassign') {
    var screenselect = req.body.screenselect;
    for (var file in req.body) {
      if (file !== 'mode' && file !== 'screenselect') {
        fileman.unassignFileSync(file, screenselect);
      }
    }
  }
  res.redirect('/admin');
})

router.post('/remove/', function(req, res, next) {
  console.log("removing", req.body.screenID);
  fileman.removeScreen(Number(req.body.screenID));
  res.redirect('/admin');
});

router.post('/create/', function(req, res, next) {
  console.log("creating", req.body.screenID);
  fileman.addScreen(Number(req.body.screenID))
  res.redirect('/admin');
});


module.exports = router;

