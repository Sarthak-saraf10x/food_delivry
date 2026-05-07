const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router
    .route("/")
    .post(reviewController.createReview);

router
    .route("/restaurant/:restaurantId")
    .get(reviewController.getRestaurantReviews);

module.exports = router;
