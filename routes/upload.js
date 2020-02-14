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
        let files = req.files.img;
        /*
        for (let file of fileman.getDirListingSync(path)) {
          fs.unlinkSync(path+file);
          console.log("Removing "+path+file);
        }
        */
        
        if (isIterable(files)) {
            for (let file of files) {
              if (fileman.getDirListingSync(path).indexOf(file.name) === -1) {
                file.mv(path+file.name, (err)=> {
                    if (err) console.log(err);
                    console.log("Adding "+path+file.name);
                });
              }
              else {
                console.log(path + files.name + " -- Already exists, skipping");
              }

            };
        }
        else {
          if (fileman.getDirListingSync(path).indexOf(files.name) === -1){
            files.mv(path+files.name, (err)=> {
              if (err) console.log(err);
              console.log("Adding "+path+files.name);
          })
          }
           else {
             console.log(path + files.name + " -- Already exists, skipping");
           } 
        }
        res.redirect('/admin');
});

function isIterable(obj) {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

module.exports = router;
