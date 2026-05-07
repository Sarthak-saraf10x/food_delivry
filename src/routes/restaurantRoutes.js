const express = require("express");
const restaurantController = require("../controllers/restaurantController");

const router = express.Router();

router
    .route("/")
    .get(restaurantController.getAllRestaurants)
    .post(restaurantController.createRestaurant);

router
    .route("/:id")
    .get(restaurantController.getRestaurantById);

router
    .route("/:restaurantId/menu")
    .get(restaurantController.getRestaurantMenu)
    .post(restaurantController.addMenuItem);

module.exports = router;
