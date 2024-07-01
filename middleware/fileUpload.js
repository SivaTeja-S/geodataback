const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const path = require('path');

// MongoDB URI
const mongoURI ="mongodb+srv://sivatejasivakavi:w60JE0iwdGAzB2ih@geodata.amfgtij.mongodb.net/?retryWrites=true&w=majority&appName=geodata"; // Replace with your MongoDB URI

let storage;

// Connect to MongoDB and initialize GridFS storage
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected...');

        storage = new GridFsStorage({
            url: mongoURI,
            options: { useNewUrlParser: true, useUnifiedTopology: true },
            file: (req, file) => {
                return {
                    filename: file.fieldname + '-' + Date.now() + path.extname(file.originalname), // Generate unique filename
                    bucketName: 'uploads', // Bucket name for GridFS
                };
            },
        });

        console.log('GridFS storage initialized...');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Initialize multer with GridFS storage
const upload = multer({ storage });

module.exports = upload;
