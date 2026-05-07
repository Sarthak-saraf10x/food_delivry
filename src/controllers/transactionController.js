const Transaction = require("../models/Transaction");
const Order = require("../models/Order");

exports.createTransaction = async (req, res) => {
    try {
        const { orderId, userId, amount, paymentMethod } = req.body;

        // Simulate a payment gateway integration (e.g., Stripe, Razorpay)
        const transactionId = "txn_" + Math.random().toString(36).substring(2, 15);
        
        // 1. Create the transaction record
        const newTransaction = await Transaction.create({
            orderId,
            userId,
            amount,
            paymentMethod,
            transactionId,
            status: "success", // Assuming payment succeeds immediately for this happy path
        });

        // 2. Update the Order payment status
        await Order.findByIdAndUpdate(
            orderId,
            { paymentStatus: "paid" },
            { new: true, runValidators: true }
        );

        res.status(201).json({
            status: "success",
            data: {
                transaction: newTransaction,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getTransactionStatus = async (req, res) => {
    try {
        const transaction = await Transaction.findOne({ transactionId: req.params.transactionId });
        
        if (!transaction) {
            return res.status(404).json({
                status: "fail",
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                transaction,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};
