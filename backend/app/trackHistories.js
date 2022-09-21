const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Track = require('../models/Track');
const TrackHistories = require('../models/TrackHistory')


router.post('/', async (req, res) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            return res.status(401).send({error: "No authorization header!"});
        }
        const user = await User.findOne({token});
        
        if (!user) {
            return res.status(401).send({error: "Token is incorrect!"});
        }
        const track = await Track.findOne({_id: req.body.track});

        if (!track) {
            return res.status(404).send({error: "Track is not found!"});
        }
        const trackHistory = new TrackHistories({user,track, datetime: new Date().toISOString()});
        await trackHistory.save();
        return res.send(trackHistory);
    } catch (error) {
        return res.status(400).send(error);
    }
});

module.exports = router;