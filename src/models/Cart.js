const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Cart must belong to a user"],
        },
        restaurantId: {
            type: mongoose.Schema.ObjectId,
            ref: "Restaurant",
            required: [true, "Cart must belong to a restaurant"],
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
                    default: 1,
                },
                customizations: [
                    {
                        name: String,
                        optionName: String,
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
