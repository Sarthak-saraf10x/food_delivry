const express = require("express");
const deliveryController = require("../controllers/deliveryController");

const router = express.Router();

router
    .route("/available")
    .get(deliveryController.getAvailablePartners);

router
    .route("/:partnerId/location")
    .patch(deliveryController.updateLocation);

// This would typically be an admin or system route, but keeping it here for simplicity
router
    .route("/orders/:orderId/assign")
    .patch(deliveryController.assignDeliveryPartner);

module.exports = router;
