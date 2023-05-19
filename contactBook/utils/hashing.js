const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const verifyPassword = async (password1, password2) => {
    return await bcrypt.compare(password1, password2);
}

module.exports = {
    hashPassword, 
    verifyPassword
}