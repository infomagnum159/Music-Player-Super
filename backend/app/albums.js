const express = require('express');
const path = require('path');
const multer = require('multer');
const {nanoid} = require('nanoid');
const Album = require('../models/Album');
const config = require('../config');
const auth = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    try {
        const query = {};

        if (req.query.artist) {
            query.artist = req.query.artist;
        }
        console.log(query);
        const albums = await Album.find(query).populate('artist', 'name').sort({"year": 1});
        res.send(albums);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const album = await Album.findOne({_id: req.params.id}).populate('artist', 'name');
        if(!album) {
            res.status(404).send({message: 'Album not found'});
        }
        res.send(album);
    } catch (e) {
        res.sendStatus(500);
    }
});


router.post('/', auth, upload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.artist) {
        return res.status(400).send('Data Not valid');
    }

    const albumData = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year || null,
        user: req.user._id,
    }

    if (req.file) {
        albumData.image = req.file.filename;
    }

    const album = new Album(albumData);
    try {
        await album.save();
        res.send(album);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;