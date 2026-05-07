const Review = require("../models/Review");
const Order = require("../models/Order");

exports.createReview = async (req, res) => {
    try {
        const { orderId, userId, rating, comment, type } = req.body;

        // 1. Verify the order exists and is delivered
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }

        if (order.status !== "delivered") {
            return res.status(400).json({
                status: "fail",
                message: "You can only review an order after it has been delivered",
            });
        }

        // 2. Prepare review data
        const reviewData = {
            orderId,
            userId,
            rating,
            comment,
            type,
        };

        if (type === "restaurant") {
            reviewData.restaurantId = order.restaurantId;
        } else if (type === "delivery") {
            if (!order.deliveryPartnerId) {
                return res.status(400).json({
                    status: "fail",
                    message: "No delivery partner was assigned to this order",
                });
            }
            reviewData.deliveryPartnerId = order.deliveryPartnerId;
        }

        // 3. Create the review
        const newReview = await Review.create(reviewData);

        res.status(201).json({
            status: "success",
            data: {
                review: newReview,
            },
        });
    } catch (err) {
        // Handle MongoDB duplicate key error (if they try to review the same type twice)
        if (err.code === 11000) {
            return res.status(400).json({
                status: "fail",
                message: "You have already submitted a review of this type for this order",
            });
        }

        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getRestaurantReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ 
            restaurantId: req.params.restaurantId,
            type: "restaurant" 
        });

        res.status(200).json({
            status: "success",
            results: reviews.length,
            data: {
                reviews,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
