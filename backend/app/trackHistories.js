const express = require('express');
const router = express.Router();
const TrackHistories = require('../models/TrackHistory');
const dayjs = require('dayjs');
const auth = require('../middleware/auth')


router.get('/', auth, async (req, res) => {
    const history = await TrackHistories.find(req.user._id).populate('track', 'name').sort({datetime: -1});
    try {
        res.send(history);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.post('/', auth, async (req, res) => {
    if (!req.body.track) {
        return res.status(400).send('Data Not valid');
    }
    const date = dayjs(new Date());
    const historyData = {
        datetime: date,
        track: req.body.track,
        user: req.user._id,
    }

    const history = new TrackHistories(historyData);
    try {
        await history.save();
        res.send(history);
    } catch (e) {
        res.status(500).send(e);
    }
});


module.exports = router;