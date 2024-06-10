const jwt = require('jsonwebtoken');

const getJwtToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1 day',
    });
}

module.exports = getJwtToken;