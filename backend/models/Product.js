const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productId: { type: String, unique: true, required: true }, 
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    email: { type: String, required: true }, // Manufacturer's email
    quantity: { type: Number, default: 10 },
    timestamp: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true }
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
