const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();

router
    .route("/")
    .post(transactionController.createTransaction);

router
    .route("/:transactionId")
    .get(transactionController.getTransactionStatus);

module.exports = router;
