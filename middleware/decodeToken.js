const UserModel = require("../models/User");
const jwt = require('jsonwebtoken')

const decodeToken = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            return res.status(403).send({ error: 'Token is required.' });
        const decodeUserPayload = jwt.verify(token, process.env.TOKEN_KEY);
        let {
            userId,
            username,
            email,
            userType,
        } = decodeUserPayload;
        req.userId = userId;
        req.username = username;
        req.email = email;
        req.userType = userType;
        next();

    } catch (error) {
        return res.status(403).send({ error: 'Token is required.' });
    }
}

module.exports = decodeToken