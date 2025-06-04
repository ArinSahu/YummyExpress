const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Create this model
const jwt = require('jsonwebtoken');

// Store order data
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ email: req.body.email });
        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            })
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            )
        }
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post('/myorder', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const myData = await Order.findOne({ email: userEmail });

        if (!myData) {
            return res.status(404).json({ success: false, message: "No orders found." });
        }

        res.json({ success: true, orderData: myData.order_data });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;