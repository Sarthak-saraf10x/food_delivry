const express = require("express");
const menuController = require("../controllers/menuController");

const router = express.Router();

router
    .route("/")
    .post(menuController.createMenuItem);

router
    .route("/:restaurantId")
    .get(menuController.getMenuItemsByRestaurant);

router
    .route("/:itemId")
    .put(menuController.updateMenuItem)
    .delete(menuController.deleteMenuItem);

router
    .route("/:itemId/toggle-status")
    .patch(menuController.toggleItemAvailability);

module.exports = router;
