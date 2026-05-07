const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.ObjectId,
            ref: "Order",
            required: [true, "Transaction must belong to an order"],
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Transaction must belong to a user"],
        },
        amount: {
            type: Number,
            required: [true, "Transaction must have an amount"],
        },
        paymentMethod: {
            type: String,
            required: [true, "Transaction must have a payment method"],
        },
        transactionId: {
            type: String,
            required: [true, "Transaction must have a provider transaction ID"],
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
