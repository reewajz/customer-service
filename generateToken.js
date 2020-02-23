function randomText(){
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var string_length = 22;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;

}

function generateToken(user){
    var plainText=`${user}||[]${randomText()}`;
    return plainText;
}


module.exports={generateToken:function(t){return generateToken(t)}};