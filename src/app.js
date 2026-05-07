const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
const orderRouter = require("./routes/orderRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const deliveryRouter = require("./routes/deliveryRoutes");
const reviewRouter = require("./routes/reviewRoutes");

const app = express();

// Middlewares
app.use(cors()); // Allow cross-origin requests from React
app.use(express.json()); // Parse JSON data from req.body
app.use(cookieParser()); // Parse cookies

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/delivery", deliveryRouter);
app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/users", userRouter);
app.use("/api/auth", authRouter);

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Food Delivery API is running!",
    });
});

module.exports = app;