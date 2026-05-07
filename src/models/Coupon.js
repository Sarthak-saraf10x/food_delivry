const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, "Coupon must have a code"],
            unique: true,
            uppercase: true,
            trim: true,
        },
        discountType: {
            type: String,
            enum: ["percentage", "flat"],
            required: [true, "Coupon must have a discount type"],
        },
        discountValue: {
            type: Number,
            required: [true, "Coupon must have a discount value"],
        },
        minOrder: {
            type: Number,
            default: 0,
        },
        expiryDate: {
            type: Date,
            required: [true, "Coupon must have an expiry date"],
        },
        applicableRestaurants: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Restaurant",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
