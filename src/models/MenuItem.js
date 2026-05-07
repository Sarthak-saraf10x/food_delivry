const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.ObjectId,
            ref: "Restaurant",
            required: [true, "Menu item must belong to a restaurant"],
        },
        name: {
            type: String,
            required: [true, "Menu item must have a name"],
            trim: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "Menu item must have a price"],
        },
        category: {
            type: String,
            required: [true, "Menu item must belong to a category"],
        },
        image: {
            type: String,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        customizations: [
            {
                name: String,
                options: [
                    {
                        optionName: String,
                        additionalPrice: {
                            type: Number,
                            default: 0,
                        },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
