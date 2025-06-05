const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const jwtSecret = "bhosadpappumadarchodrandi"

router.post("/createuser",
    [body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 })
    ]
    , async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, error: result.array()[0].msg });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);
        try {
            let existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ success: false, error: "User with this email already exists" });
            }
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
router.post("/loginuser",
    [body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
    ]
    , async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        let email = req.body.email;
        try {
            let userdata = await User.findOne({ email });
            if (!userdata) {
                return res.status(400).json({ result: "log with correct email" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userdata.password);
            if (!pwdCompare) {
                return res.status(400).json({ result: "log with correct password" });
            }
            const data = {
                user: {
                    id: userdata.id

                }
            }

            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: "true", authToken: authToken, email: userdata.email });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

module.exports = router;