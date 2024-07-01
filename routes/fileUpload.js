// const express = require('express');
// const router = express.Router();
// const MapData = require('../models/MapData');
// const auth = require('../middleware/auth');

// // POST /api/mapdata
// // Example for uploading TIFF file using GridFS
// router.post('/', auth, upload.single('tiffFile'), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ msg: 'No file uploaded' });
//         }

//         const { name, geojson } = req.body;

//         // Create new map data document
//         const newMapData = new MapData({
//             userId: req.user.id,
//             name,
//             geojson: JSON.parse(geojson), // Assuming geojson is passed as a string
//             tiffFileId: req.file.id, // Store GridFS file ID
//         });

//         await newMapData.save();
//         res.json({ msg: 'Map data created successfully' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;
