const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./src/app");

// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to MongoDB
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => console.log("DB Connection Error:", err));

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});