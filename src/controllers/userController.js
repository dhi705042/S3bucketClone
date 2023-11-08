const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register a new user
async function register(req, res) {
    const { username, email, password } = req.body;
    try {

        const newUser = new UserModel({ username, email, password });
        await newUser.save();

        // Issue a JWT token upon successful registration
        const token = jwt.sign({ email: newUser.email, roles: newUser.roles }, 'assignment');
        res.status(201).json({ message: 'Registration successful', token });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Registration failed' });
    }
}

// Log in and get a JWT token
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        console.log("user", user)

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const pass = user?.password;
        console.log("pass", pass)

        const isPasswordMatch = await bcrypt.compare(password,pass);
        console.log("isPasswordMatch", isPasswordMatch)

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Issue a JWT token upon successful login
        const token = jwt.sign({ email: user.email, roles: user.roles }, 'assignment');
        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Login failed' });
    }
}

module.exports = {
    register,
    login,
};
