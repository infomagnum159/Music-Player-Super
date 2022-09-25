const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    year: String,
    image: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

AlbumSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

const Album = mongoose.model('Album', AlbumSchema);
module.exports = Album;