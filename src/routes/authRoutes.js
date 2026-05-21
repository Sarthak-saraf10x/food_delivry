const express = require("express");
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Returns the current user – useful for validating a stored JWT on frontend boot
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        status: "success",
        data: { user: req.user },
    });
});

module.exports = router;
