const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    information: String,
    photo: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

ArtistSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist