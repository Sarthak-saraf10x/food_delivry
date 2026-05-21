const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect: Verifies the JWT from the Authorization header or cookie.
 * Attaches the decoded user to req.user for downstream controllers.
 */
exports.protect = async (req, res, next) => {
    try {
        let token;

        // 1) Get token from Authorization header (Bearer <token>) or cookie
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "You are not logged in. Please log in to get access.",
            });
        }

        // 2) Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: "fail",
                message: "The user belonging to this token no longer exists.",
            });
        }

        // 4) Attach user to request
        req.user = currentUser;
        next();
    } catch (err) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid or expired token. Please log in again.",
        });
    }
};

/**
 * restrictTo: Role-based access control.
 * Pass allowed roles as arguments: restrictTo('restaurant_owner', 'admin')
 */
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: "fail",
                message: "You do not have permission to perform this action.",
            });
        }
        next();
    };
};
