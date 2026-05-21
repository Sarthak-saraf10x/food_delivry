const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Restaurant must have a name"],
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        ownerId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Restaurant must belong to an owner"],
        },
        address: {
            type: String,
            required: [true, "Restaurant must have an address"],
        },
        location: {
            // GeoJSON
            type: {
                type: String,
                default: "Point",
                enum: ["Point"],
            },
            coordinates: {
                type: [Number],
                default: [0, 0], // [longitude, latitude]
            },
        },
        image: {
            type: String,
        },
        logo: {
            type: String,
        },
        cuisine: [String],
        openingHours: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0,
            min: [0, "Rating must be above 0"],
            max: [5, "Rating must be below 5.0"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        deliveryTime: {
            type: String,
        },
        minOrderAmount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for geospatial queries
restaurantSchema.index({ location: "2dsphere" });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
