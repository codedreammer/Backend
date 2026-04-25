    const User = require("../models/userModel");
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");

    // SIGNUP
    const signup = async (req, res) => {
    try {
        const { name, username, email, password, bio } = req.body;
        const displayName = name || username;

        // check user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create({
        name: displayName,
        username,
        email,
        password: hashedPassword,
        bio
        });

        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    // LOGIN
    const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate token
        const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    module.exports = { signup, login };
