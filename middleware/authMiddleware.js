const User = require('../models/user');

exports.validateAccessToken = async (req, res, next) => {

    const accessToken = req.headers['access_token'];

    const user = await User.findById(accessToken);

    if (!user) {
        return res.status(400).json({ error: 'User not found or invalid access token' });
    }
    req.user = user;
    next();
};
