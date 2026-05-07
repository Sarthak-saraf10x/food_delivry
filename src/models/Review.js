const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.ObjectId,
            ref: "Order",
            required: [true, "Review must belong to an order"],
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Review must belong to a user"],
        },
        restaurantId: {
            type: mongoose.Schema.ObjectId,
            ref: "Restaurant",
        },
        deliveryPartnerId: {
            type: mongoose.Schema.ObjectId,
            ref: "DeliveryPartner",
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
        },
        type: {
            type: String,
            enum: ["restaurant", "delivery"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Optional: Ensure a user can only review an order once per type
reviewSchema.index({ orderId: 1, type: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
