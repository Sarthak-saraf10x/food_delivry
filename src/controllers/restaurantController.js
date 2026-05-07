const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");

exports.createRestaurant = async (req, res) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: newRestaurant,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json({
            status: "success",
            results: restaurants.length,
            data: {
                restaurants,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({
                status: "fail",
                message: "Restaurant not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                restaurant,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.addMenuItem = async (req, res) => {
    try {
        const menuItemData = {
            ...req.body,
            restaurantId: req.params.restaurantId,
        };
        const newMenuItem = await MenuItem.create(menuItemData);
        res.status(201).json({
            status: "success",
            data: {
                menuItem: newMenuItem,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getRestaurantMenu = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({
            restaurantId: req.params.restaurantId,
        });
        res.status(200).json({
            status: "success",
            results: menuItems.length,
            data: {
                menuItems,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
