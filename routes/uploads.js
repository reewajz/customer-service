var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var Customer = require('../models/Customer');
var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');
var byline= require('byline');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var multer = require('multer');
/* GET home page. */
router.get('/rest/v1', function (req, res, next) {
  res.render('uploads', { title: 'Express' });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var d1 = new Date();
    var y = d1.getFullYear();
    var m = d1.getMonth() + 1;
    var d = d1.getDate();
    var des = `./csv/files/${y}/${m}/${d}/`;
    fse.ensureDirSync(des);
    cb(null, des);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});



const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('csvfile');

function checkFileType(file, cb) {
  const fileTypes = /csv|xlsx|txt/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // const mimetype = fileTypes.test(file.mimetype);

  if (extname) {
    return cb(null, true);
  } else {
    cb('Error! ');
  }
}


router.post('/rest/v1', function (req, res, next) {

  upload(req, res, err => {
    if (err) {
      console.log(err);
    }
    if (req.file == undefined) {
      res.render('uploads', { msg: 'file is undefined!' });

    } else {
      var d1 = new Date();
      var y = d1.getFullYear();
      var m = d1.getMonth() + 1;
      var d = d1.getDate();
      var  temp;
      var prevline;
      var date = y + '/' + m + '/' + d;
      fs.createReadStream('csv/files/' + y + '/' + m + '/' + d + '/' + req.file.filename)
      .pipe(csv())
        .on('data', function (data) {
          temp=data;
          if(data[1]==""){
            let stbno=temp[6].replace(/^,/i,'');
            let scno=temp[7].replace(/^,/i,'');

            var customer = new Customer(
              {
                Customer: prevline[1],
                SubscriberName: prevline[2],
                Branch: prevline[3],
                Address: prevline[4],
                MobileNo: prevline[5],
                STBNO: stbno,
                SmartcardNo: scno
  
              });
              customer.save(function (err) {
              if (err) {
                console.log('error');
              } else {
                // console.log('sucindcess');
              }
            });
          }if(data[1]){
            let stbno=data[6].replace(/^,/i,'');
            let scno=data[7].replace(/^,/i,'');

            var customer = new Customer(
              {
                Customer: data[1],
                SubscriberName: data[2],
                Branch: data[3],
                Address: data[4],
                MobileNo: data[5],
                STBNO: stbno,
                SmartcardNo: scno
  
              });
              customer.save(function (err) {
              if (err) {
                console.log('error');
              } else {
                // console.log('sucindcess');
              }
            });
          }
        if(temp[1]!=""){
          prevline=temp;
        }    
        
        })
        .on('end', function (data) {
          res.render('uploads', { msg: 'data inserted' });
        });


    }
  });

});

module.exports = router;
