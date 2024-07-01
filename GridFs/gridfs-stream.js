const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

let gfs;

// Create GridFS stream
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('tiffFiles'); // Name of the collection for TIFF files
});
