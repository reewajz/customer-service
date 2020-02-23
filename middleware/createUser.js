const User = require('../models/User');
const bcrypt = require('bcryptjs');

function createuser(req, res, next) {
    const tempUser = 'reewaj@gmail.com';
    const passUser = 'reewaj';
    User.findOne({
        Email: tempUser
    }).then(result => {
        if (result) {
            next();
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(passUser, salt, (err, hash) => {
                    // if(err) throw err;
                    var u = new User({
                        Password: hash,
                        Email: tempUser
                    });
                    u.save().then(user => {
                        console.log(user);
                        next();
                    });

                });
            });
        }
    }).catch(err => {

    });
}
module.exports = createuser;