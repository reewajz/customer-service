var express = require('express');
var router = express.Router();
var Customer = require('../models/Customer');
const ensureAuth = require('../middleware/enaureAuth');

var config = require('../config.json');
/* GET home page. */
router.get('/rest/v1/customer/:page?',ensureAuth, function (req, res, next) {
  var p = req.params.page || 1;
  Customer.find({}).sort({ SubscriberName: 1 })
    .skip((50 * p) - 50)
    .limit(50)
    .then(data => {
      Customer.countDocuments({}).then(count => {
        res.render('index', { data: data, pages: Math.ceil(count / 50), current: p });

      })
    }).catch(err => {
      res.send(err);
    });
});



router.get('/rest/v1/customer/delete/:delete?',ensureAuth, function (req, res, next) {
  var p= req.params.page || 1;
  var d= req.params.delete;
  Customer.deleteOne({ Customer: d })
    .then(result => {
      if (result) {
        Customer.find({}).sort({ SubscriberName: 1 })
        .skip((50 * p) - 50)
        .limit(50)
        .then(data => {
          Customer.countDocuments({}).then(count => {
            res.render('index', { data: data, pages: Math.ceil(count / 50), current: p });
    
          })
        }).catch(err => {
          res.send(err);
        });
      }
    }).catch(err => {
      res.json({ result: false, message: err.message });
    });
});

router.post('/rest/v1/customer/search',ensureAuth, function (req, res, next) {
  var svalue = req.body.svalue;
  Customer.find({ $or: [{ Customer: new RegExp(svalue) }, { STBNO: new RegExp(svalue) },{ Branch: {$regex:new RegExp(svalue),$options:'i'}},{ Address:{$regex:new RegExp(svalue),$options:'i'} },{ MobileNo: new RegExp(svalue) }, { SmartcardNo: new RegExp(svalue) },{ SubscriberName: {$regex:new RegExp(svalue),$options:'i'}}] })
    .then(data => {
      if (data) {
        res.json({ result: true, data: data });
      }
    }).catch(err => {
      res.json({ result: false, message: err.message });
    });
});

module.exports = router;
