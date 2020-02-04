var express = require('express');
var router = express.Router();
var fs = require('fs');
var projpath = '/home/ktbsh/werk/telka/node_web/kyoma';


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res)=> {
        var path = projpath+"/public/images/";
        let files = req.files.img;
        for (let file of fs.readdirSync(path)) {
          fs.unlinkSync(path+file);
          console.log("Removing "+path+file);
        }
        
        if (isIterable(files)) {
            for (let file of files) {
                file.mv(path+file.name, (err)=> {
                    if (err) console.log(err);
                });
            };
        }
        else {
            files.mv(path+files.name, (err)=> {
                if (err) console.log(err);
            })
        }
        res.render('admin');
});

function isIterable(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

module.exports = router;
