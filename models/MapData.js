const mongoose = require('mongoose');

const MapDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    geojson: {
        type: Object,
        required: true,
    },
    tiffFileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TiffFile',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('MapData', MapDataSchema);
