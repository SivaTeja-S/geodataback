const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sivatejasivakavi:w60JE0iwdGAzB2ih@geodata.amfgtij.mongodb.net/?retryWrites=true&w=majority&appName=geodata");
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
