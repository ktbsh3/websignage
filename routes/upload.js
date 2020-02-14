var express = require('express');
var router = express.Router();
var fs = require('fs');
var fileman = require('../classes/fileman');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res)=> {
        var path = fileman.dirs.images;
        console.log(path)
        let files = req.files.img;
        for (let file of fileman.getDirListingSync(path)) {
          fs.unlinkSync(path+file);
          console.log("Removing "+path+file);
        }
        
        if (isIterable(files)) {
            for (let file of files) {
                file.mv(path+file.name, (err)=> {
                    if (err) console.log(err);
                    console.log("Adding "+path+file.name);
                });
            };
        }
        else {
            files.mv(path+files.name, (err)=> {
                if (err) console.log(err);
                console.log("Adding "+path+files.name);
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
