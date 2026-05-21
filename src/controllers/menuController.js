const MenuItem = require("../models/MenuItem");

exports.createMenuItem = async (req, res) => {
    try {
        const newItem = await MenuItem.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                menuItem: newItem,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getMenuItemsByRestaurant = async (req, res) => {
    try {
        const items = await MenuItem.find({ restaurantId: req.params.restaurantId });
        res.status(200).json({
            status: "success",
            results: items.length,
            data: {
                menuItems: items,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.itemId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                status: "fail",
                message: "Menu item not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                menuItem: updatedItem,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.itemId);

        if (!item) {
            return res.status(404).json({
                status: "fail",
                message: "Menu item not found",
            });
        }

        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.toggleItemAvailability = async (req, res) => {
    try {
        // Find the item first to get its current status
        const item = await MenuItem.findById(req.params.itemId);

        if (!item) {
            return res.status(404).json({
                status: "fail",
                message: "Menu item not found",
            });
        }

        // Toggle the status
        item.isAvailable = !item.isAvailable;
        await item.save();

        res.status(200).json({
            status: "success",
            data: {
                menuItem: item,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
