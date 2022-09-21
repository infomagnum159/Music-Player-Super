const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const users = require('./app/users');
const artists = require('./app/artists');
const albums = require('./app/albums');
const tracks = require('./app/tracks');
const track = require('./app/trackHistories')
const config = require('./config');


const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.use('/users', users);
app.use('/artists', artists);
app.use('/albums', albums);
app.use('/tracks', tracks);
app.use('/track_history', track);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('Mongoose disconnect');
    });
};

run().catch(e => console.error(e));