var express = require('express');
var router = express.Router();
const Customer = require('../models/Customer');

router.get('/rest/v1/:id?', function (req, res, next) {
    if (req.params.id) {
        Customer.findOne({ _id: req.params.id })
            .then(data => {
                res.render('insert', { data: data });
            }).catch(err => {
                res.json({ result: false, message: err.message });
            });
    } else {
        res.render('insert', {});
    }
});




router.post('/rest/v1', (req, res) => {
    if (req.body.Customer && req.body.SubscriberName && req.body.Branch && req.body.Address && req.body.MobileNo && req.body.STBNO && req.body.SmartcardNo) {
       if(req.body.id!=''){
            Customer.updateOne({_id:req.body.id},
                {$set:{
                    Customer:req.body.Customer,
                    Subscriber:req.body.Subscriber,
                    Branch:req.body.Branch,
                    Address:req.body.Address,
                    MobileNo:req.body.MobileNo,
                    STBNO:req.body.STBNO,
                    SmartcardNo:req.body.SmartcardNo
                }}).then(result=>{
                    res.redirect('/rest/v1/customer');
                }).catch(err=>{
                    res.json({result:false,message:err.message});
                });
       }else{
        Customer.create(req.body)
            .then(result => {
                if (result) {
                    res.redirect('/rest/v1/customer');
                }
            }).catch(err => {
                res.json({ result: false, message: err.message })
            });
       }
    } else {
        res.render('insert', { msg: 'please field all the fields required!' })
    }

});

module.exports = router;
