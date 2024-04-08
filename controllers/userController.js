const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const { username, password, confirmPassword, email, id, firstname, lastname } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, 8); 

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            id,
            firstname,
            lastname
        });

        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
