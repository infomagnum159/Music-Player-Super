const express = require('express');
const Track = require('../models/Track');
const Album = require('../models/Album')
const router = express.Router();

router.get('/',async (req, res) => {
    try {
        const query = {}
        if(req.query.album) {
            query.album = req.query.album;
            const albumTracks = await Track.find(query).populate('album');
            res.send(albumTracks);

        }else if(req.query.artist) {
            const albums = await Album.find({artist: req.query.artist}, "_id name");
            const tracks = await Track.find({album: {$in: albums}}).populate('album');
            res.send(tracks);
        }else {
            const tracks = await Track.find();
            res.send(tracks);
        }
    }catch (e){
        return res.status(404).send({message: "Not found", e});
    }
});

router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.album) {
        return res.status(400).send('Data Not valid');
    }

    const trackData = {
        name: req.body.name,
        album: req.body.album,
        lasting: req.body.lasting || null
    }


    const track = new Track(trackData);
    try {
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;