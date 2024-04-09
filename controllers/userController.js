const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const { username, password, confirmPassword, email, firstname, lastname } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }
        const hashedPassword = await bcrypt.hash(password, 8); 

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            firstname,
            lastname
        });

        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: "Error occurred! Try Again" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ access_token: user._id });
    } catch (error) {
        res.status(500).json({ error: 'Error while log in the user' });
    }
};

exports.getUserData = async (req, res) => {
    try {
        const accessToken = req.headers['access_token'];
        const user = await User.findById(accessToken);
        if (!user) {
            return res.status(400).json({ error: 'User not found or invalid access token' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error while fetching user data' });
    }
};

exports.deleteUserData = async (req, res) => {
    try {
        const accessToken = req.headers['access_token'];
        const user = await User.findById(accessToken);
        if (!user) {
            return res.status(400).json({ error: 'User not found or invalid access token' });
        }
        await User.findByIdAndDelete(accessToken);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting user data' });
    }
};