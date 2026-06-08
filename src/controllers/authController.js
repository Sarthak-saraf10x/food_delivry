const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res, extraData = {}) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        cookieOptions.secure = true;
    }

    res.cookie("jwt", token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
            ...extraData
        },
    });
};

exports.register = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });

        let extraData = {};
        if (req.body.role === "restaurant_owner") {
            const newRestaurant = await Restaurant.create({
                name: req.body.restaurantName || req.body.name + "'s Restaurant",
                ownerId: newUser._id,
                address: req.body.address || "Not specified",
                image: req.body.image || "",
                cuisine: req.body.cuisine ? req.body.cuisine.split(',').map(c => c.trim()) : [],
                openingHours: req.body.openingHours || "",
            });
            extraData.restaurantId = newRestaurant._id;
        }

        createSendToken(newUser, 201, res, extraData);
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // 1) Check if email, password, and role exist
        if (!email || !password || !role) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide email, password, and role!",
            });
        }

        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: "fail",
                message: "Incorrect email or password",
            });
        }

        // 3) Check if user has the requested role
        if (user.role !== role) {
            return res.status(403).json({
                status: "fail",
                message: "Access denied: Incorrect role for this login.",
            });
        }

        // 4) Fetch restaurant details if restaurant_owner
        let extraData = {};
        if (user.role === "restaurant_owner") {
            const restaurant = await Restaurant.findOne({ ownerId: user._id });
            if (restaurant) {
                extraData.restaurantId = restaurant._id;
            }
        }

        // 5) If everything is ok, send token to client
        createSendToken(user, 200, res, extraData);
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    try {
        const { token, role } = req.body;
        
        if (!token) {
            return res.status(400).json({
                status: "fail",
                message: "Please provide google token",
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            // Create a new user if one doesn't exist
            // Using a random secure password since they login with google
            const crypto = require('crypto');
            const randomPassword = crypto.randomBytes(20).toString('hex');
            
            user = await User.create({
                name,
                email,
                password: randomPassword,
                role: role || 'customer',
            });
        }

        // Check if user has the requested role
        if (role && user.role !== role) {
            return res.status(403).json({
                status: "fail",
                message: "Access denied: Incorrect role for this login.",
            });
        }

        let extraData = {};
        if (user.role === "restaurant_owner") {
            const restaurant = await Restaurant.findOne({ ownerId: user._id });
            if (restaurant) {
                extraData.restaurantId = restaurant._id;
            }
        }

        createSendToken(user, 200, res, extraData);
    } catch (err) {
        console.error("Google Login Error:", err);
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
