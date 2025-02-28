const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

// Function to generate Product ID
const generateProductId = async (productName, manufacturerName, count) => {
    const productPrefix = productName.substring(0, 3).toUpperCase();
    const manufacturerPrefix = manufacturerName.substring(0, 3).toUpperCase();
    return `${productPrefix}${count}${manufacturerPrefix}`;
};

// ➤ Create a new product
router.post("/add", async (req, res) => {
    try {
        const { productName, email } = req.body;

        // Find the manufacturer by email
        const manufacturer = await User.findOne({ email, role: "manufacturer" });
        if (!manufacturer) {
            return res.status(400).json({ error: "Manufacturer not found!" });
        }

        // Count existing products for unique ID
        const productCount = await Product.countDocuments();
        const productId = await generateProductId(productName, manufacturer.name, productCount + 1);

        // Calculate expiry date (3 years from now)
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 3);

        // Create new product
        const newProduct = new Product({
            productId,
            name: productName,
            manufacturer: manufacturer.name,
            email,
            expiryDate
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully!", product: newProduct });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
