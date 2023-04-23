const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

module.exports.signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            // User already found
            return res.send('emailId already exist');
        }
        const checkUsername = await User.findOne({ username });
        if (checkUsername) {
            // User already found
            return res.send('username already exist');
        }
        // Create new user document
        const newUser = new User({ username, email, password });

        // Save new user to database
        await newUser.save();
        res.status(201).send(`User account created successfully `);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        // Find user with provided email
        const user = await User.findOne({ email });
        if (!user) {

            // User not found
            return res.status(401).send('Invalid email or password');
        }
        // Verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {

            // Password is incorrect
            return res.status(401).send('Invalid email or password');
        }

        // Create JWT token with user data and secret key
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
}

