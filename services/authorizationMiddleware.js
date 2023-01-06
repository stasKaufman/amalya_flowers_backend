const User = require('../models/user')

async function isAuthorized (req, res, next) {
    const name = req.userName
    let user;
    try {
        user = await User.findOne({where: {name}})
    } catch (error) {
        return next(error)
    }
    
    if (+user.role !== 200) {
        const error = new Error('Not Authrized')
        error.statusCode = 401;
        return next(error)
    }
    next()
}

module.exports = {
    isAuthorized
}