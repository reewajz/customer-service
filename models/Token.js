var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var tokenSchema=new Schema({
Token:{type:String},
ExpDate:{type:Date}
});

var token=mongoose.model('token',tokenSchema,'token');
module.exports=token;