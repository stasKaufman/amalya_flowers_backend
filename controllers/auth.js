const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login (req, res, next) {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ where: { name } });
        // name is not in the database.
        if (!user) {
            const error = new Error('Wrong credentials');
            error.statusCode = 401
            throw error
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        // password not valid
        if (!isPassValid) {
            const error = new Error('Wrong credentials');
            error.statusCode = 401
            throw error
        }
        // credential are valid, create token and sand to the client.
        const token = jwt.sign({ name, role: user.role }, process.env.TOKEN_SECRET || 'testing',
         {expiresIn: '24h'});

        res.json({token: token, userName: name, expirationTimeInHours: 24, role: user.role });
    } catch (error) {
        let statusCode = 500;
        if(error.statusCode) {
            statusCode = error.statusCode;
        }
        next(error)
    }
}

async function isAuthenticated (req, res, next) {
    const NOT_AUTH_MESSAGE = 'Not authenticated'
    const authHeader = req.get('Authorization');
    // header not exist.
    if (!authHeader) {
        const error = new Error(NOT_AUTH_MESSAGE)
        error.statusCode = 401;
        return next(error);
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || 'testing')
    } catch (error) {
        error.statusCode = 500
        return next(error)
    }
    // token not valid.
    if (!decodedToken) {
        const error = new Error(NOT_AUTH_MESSAGE)
        error.statusCode = 401;
        return next(error);
    }
    // all good. save data to req, and go to next middlewares.
    req.userName = decodedToken.name;
    req.role = decodedToken.role;
    next();
}
module.exports = {
    login,
    isAuthenticated
}