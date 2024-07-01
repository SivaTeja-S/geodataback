const express = require('express');
const router = express.Router();
const MapData = require('../models/MapData');
const auth = require('../middleware/auth');
const upload = require('../middleware/fileUpload');

// @route   GET /api/mapdata
// @desc    Get all map data for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const mapData = await MapData.find({ userId: req.user.id });
        res.json(mapData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/mapdata/:id
// @desc    Get map data by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const mapData = await MapData.findById(req.params.id);
        
        if (!mapData) {
            return res.status(404).json({ msg: 'Map data not found' });
        }

        // Ensure the user has access to this map data
        if (mapData.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        res.json(mapData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/mapdata
// @desc    Create new map data
// @access  Private
router.post('/', auth, upload.fields([{ name: 'geojsonFile', maxCount: 1 }, { name: 'tiffFile', maxCount: 1 }]), async (req, res) => {
    const { name, geojson } = req.body;
    const geojsonFileId = req.files['geojsonFile'] ? req.files['geojsonFile'][0].id : null;
    const tiffFileId = req.files['tiffFile'] ? req.files['tiffFile'][0].id : null;

    try {
        const newMapData = new MapData({
            userId: req.user.id,
            name,
            geojson: JSON.parse(geojson), // Assuming geojson is passed as a string
            geojsonFileId,
            tiffFileId,
        });

        const mapData = await newMapData.save();
        res.json(mapData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/mapdata/:id
// @desc    Update map data by ID
// @access  Private
router.put('/:id', auth, upload.fields([{ name: 'geojsonFile', maxCount: 1 }, { name: 'tiffFile', maxCount: 1 }]), async (req, res) => {
    const { name, geojson } = req.body;
    const geojsonFileId = req.files['geojsonFile'] ? req.files['geojsonFile'][0].id : null;
    const tiffFileId = req.files['tiffFile'] ? req.files['tiffFile'][0].id : null;

    try {
        let mapData = await MapData.findById(req.params.id);

        if (!mapData) {
            return res.status(404).json({ msg: 'Map data not found' });
        }

        // Ensure the user has access to update this map data
        if (mapData.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        // Update map data fields
        mapData.name = name;
        mapData.geojson = JSON.parse(geojson); // Assuming geojson is passed as a string
        if (geojsonFileId) {
            mapData.geojsonFileId = geojsonFileId;
        }
        if (tiffFileId) {
            mapData.tiffFileId = tiffFileId;
        }

        mapData = await mapData.save();
        res.json(mapData);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/mapdata/:id
// @desc    Delete map data by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let mapData = await MapData.findById(req.params.id);

        if (!mapData) {
            return res.status(404).json({ msg: 'Map data not found' });
        }

        // Ensure the user has access to delete this map data
        if (mapData.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        await mapData.remove();
        res.json({ msg: 'Map data removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
