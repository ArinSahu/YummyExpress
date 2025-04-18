const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://arinsahu0:lodu@cluster0.behds7e.mongodb.net/ChomatoMERN?retryWrites=true&w=majority&appName=Cluster0';

async function mongoDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
       
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        // console.log("Fetched Food Items:", fetched_data);
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

module.exports = mongoDB;