const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

const mongoURI = process.env.MONGO_URI;

async function mongoDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
       
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.food_items = fetched_data;
        global.foodCategory = foodCategory;
        // console.log("Fetched Food Items:", fetched_data);
        // console.log("Fetched Food Category:", foodCategory);
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

module.exports = mongoDB;