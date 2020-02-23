var mongoose= require('mongoose');
var commonConfig = require('./config.json');

var host= commonConfig.DBURL;
const options = {
    useNewUrlParser: true,
};
mongoose.connect(host, options).then(()=>{
    // console.log('listening on port'+commonConfig.SitePort);
}).catch(err=>{
    console.log(err);
})

module.exports=mongoose;
