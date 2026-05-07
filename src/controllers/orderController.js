const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        // Generate a random orderId for now (could use a library like uuid later)
        const orderId = "ORD-" + Math.floor(Math.random() * 1000000);
        
        const orderData = {
            ...req.body,
            orderId,
        };

        const newOrder = await Order.create(orderData);
        res.status(201).json({
            status: "success",
            data: {
                order: newOrder,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        // Ideally we would filter by req.user.id, but for now we just return all
        // or filter by query params if provided e.g. /api/orders?userId=123
        const orders = await Order.find(req.query);
        res.status(200).json({
            status: "success",
            results: orders.length,
            data: {
                orders,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                order,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                status: "fail",
                message: "Order not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                order,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
