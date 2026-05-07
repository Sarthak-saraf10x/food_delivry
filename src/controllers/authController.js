const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
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

        createSendToken(newUser, 201, res);
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

        // 4) If everything is ok, send token to client
        createSendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
