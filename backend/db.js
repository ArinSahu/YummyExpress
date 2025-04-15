const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://arinsahu0:pragatikimkc@cluster0.behds7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function mongoDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}


module.exports = mongoDB;