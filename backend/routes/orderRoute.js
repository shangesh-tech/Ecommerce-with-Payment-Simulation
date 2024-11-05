const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const { protect } = require("../middleware/authMiddleware");

// Create New Order
router.post("/order/new",protect, async (req, res) => {
    try {
        const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
        } = req.body;

        const order = await Order.create({
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo,
            paidAt: Date.now(),
            user: req.user.id
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get Single Order
router.get("/order/:id",protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({
                success: false,
                error: `Order not found with id: ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get Logged-in User Orders
router.get("/myorders",protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Admin: Get All Orders
router.get("/orders", protect,async (req, res) => {
    try {
        const orders = await Order.find();

        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;
        });

        res.status(200).json({
            success: true,
            totalAmount,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Admin: Update Order / Order Status -
router.put("/order/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: `Order not found with id: ${req.params.id}`
            });
        }

        if (order.orderStatus == 'Delivered') {
            return res.status(400).json({
                success: false,
                error: 'Order has already been delivered!'
            });
        }

        // Updating the product stock of each order item
        for (const orderItem of order.orderItems) {
            const product = await Product.findById(orderItem.product);
            product.stock -= orderItem.quantity;
            await product.save({ validateBeforeSave: false });
        }

        order.orderStatus = req.body.orderStatus;
        order.deliveredAt = Date.now();
        await order.save();

        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});


// Admin: Delete Order
router.delete("/order/:id",protect, async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: `Order not found with id: ${req.params.id}`
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
