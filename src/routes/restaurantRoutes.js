const express = require("express");
const restaurantController = require("../controllers/restaurantController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public: anyone can view restaurants
router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:restaurantId/menu", restaurantController.getRestaurantMenu);

// Protected: only restaurant owners can create/manage
router.post(
    "/",
    protect,
    restrictTo("restaurant_owner", "admin"),
    restaurantController.createRestaurant
);

router.post(
    "/:restaurantId/menu",
    protect,
    restrictTo("restaurant_owner", "admin"),
    restaurantController.addMenuItem
);

module.exports = router;

