const mongoose = require("mongoose");

const deliveryPartnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Delivery partner must have a name"],
            trim: true,
        },
        phone: {
            type: String,
            required: [true, "Delivery partner must have a phone number"],
        },
        vehicleType: {
            type: String,
            required: [true, "Vehicle type is required"],
            enum: ["bike", "scooter", "car"],
        },
        location: {
            // GeoJSON for live tracking
            type: {
                type: String,
                default: "Point",
                enum: ["Point"],
            },
            coordinates: [Number], // [longitude, latitude]
        },
        isAvailable: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

// Index for geospatial queries
deliveryPartnerSchema.index({ location: "2dsphere" });

const DeliveryPartner = mongoose.model(
    "DeliveryPartner",
    deliveryPartnerSchema
);
module.exports = DeliveryPartner;
