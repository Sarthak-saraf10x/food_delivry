const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please tell us your name!"],
        },
        email: {
            type: String,
            required: [true, "Please provide your email"],
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: 8,
            select: false, // This ensures the password is NEVER sent to the frontend by default
        },
        role: {
            type: String,
            enum: ["customer", "restaurant_owner", "delivery_partner", "admin"],
            default: "customer",
        },
        addresses: [
            {
                street: String,
                city: String,
                state: String,
                zipCode: String,
                country: String,
            }
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// MIDDLEWARE: Hash the password BEFORE saving the user to the database
userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password")) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// INSTANCE METHOD: A function available on all user documents to check if passwords match
userSchema.methods.correctPassword = async function (
    candidatePassword, userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;