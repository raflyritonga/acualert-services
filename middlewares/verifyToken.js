const jwt = require('jsonwebtoken')

const generateToken = async (tokenData, secret_key, jwt_expires) => {
     return jwt.sign(tokenData, secret_key, {expiresIn: jwt_expires});
}

module.exports = generateToken