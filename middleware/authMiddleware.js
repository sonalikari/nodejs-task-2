const User = require('../models/user');
exports.validateAccessToken = async (req, res, next) => {
    const accessToken = req.headers['access_token'];

    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }
    try {
        const user = await User.findById(accessToken);
        if (!user) {
            return res.status(400).json({ error: 'User not found or invalid access token' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Error while validating access token' });
    }
};
