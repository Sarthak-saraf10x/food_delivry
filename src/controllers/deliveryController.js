const DeliveryPartner = require("../models/DeliveryPartner");
const Order = require("../models/Order");

exports.assignDeliveryPartner = async (req, res) => {
    try {
        const { partnerId } = req.body;
        const orderId = req.params.orderId;

        // 1. Update Order with deliveryPartnerId
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { deliveryPartnerId: partnerId, status: "out_for_delivery" },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }

        // 2. Mark Delivery Partner as unavailable
        await DeliveryPartner.findByIdAndUpdate(
            partnerId,
            { isAvailable: false },
            { runValidators: true }
        );

        res.status(200).json({
            status: "success",
            data: {
                order: updatedOrder,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateLocation = async (req, res) => {
    try {
        const { coordinates } = req.body; // [longitude, latitude]
        const partnerId = req.params.partnerId;

        const updatedPartner = await DeliveryPartner.findByIdAndUpdate(
            partnerId,
            { 
                location: {
                    type: "Point",
                    coordinates,
                } 
            },
            { new: true, runValidators: true }
        );

        if (!updatedPartner) {
            return res.status(404).json({
                status: "fail",
                message: "Delivery partner not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                deliveryPartner: updatedPartner,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getAvailablePartners = async (req, res) => {
    try {
        const partners = await DeliveryPartner.find({ isAvailable: true });
        
        res.status(200).json({
            status: "success",
            results: partners.length,
            data: {
                partners,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
