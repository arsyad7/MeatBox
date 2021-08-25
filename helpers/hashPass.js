const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

function hashPass(password) {
    return bcrypt.hashSync(password, salt);
}

function checkPass(password, hashedPass) {
    return bcrypt.compareSync(password, hashedPass);
}

module.exports = {hashPass, checkPass};