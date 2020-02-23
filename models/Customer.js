var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var customerSchema=new Schema({
Customer:{type:String},
SubscriberName:{type:String},
Branch:{type:String},
Address:{type:String},
MobileNo:{type:String},
STBNO:{type:String},
SmartcardNo:{type:String}
});

var Customer=mongoose.model('customer',customerSchema,'customer');
module.exports=Customer;