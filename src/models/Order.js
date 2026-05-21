const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            unique: true,
            required: true,
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Order must belong to a user"],
        },
        restaurantId: {
            type: mongoose.Schema.ObjectId,
            ref: "Restaurant",
            required: [true, "Order must belong to a restaurant"],
        },
        deliveryPartnerId: {
            type: mongoose.Schema.ObjectId,
            ref: "DeliveryPartner",
        },
        items: [
            {
                menuItemId: {
                    type: mongoose.Schema.ObjectId,
                    ref: "MenuItem",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
                customizations: [
                    {
                        name: String,
                        optionName: String,
                        additionalPrice: Number,
                    },
                ],
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        deliveryFee: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: [
                "pending",
                "preparing",
                "ready",
                "completed",
                "cancelled",
            ],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
    },
    {
        timestamps: true, // Includes createdAt and updatedAt
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
