import React, {useEffect} from 'react';
import {createTrackHistory, fetchTracks} from "../../store/actions/mainActions";
import {useDispatch, useSelector} from "react-redux";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";


const Tracks = () => {
    const dispatch = useDispatch();
    const paramsURL = new URLSearchParams(document.location.search.substring(1));
    const tracks = useSelector(state => state.main.tracks);
    const token = useSelector(state => state.users.user);
    useEffect(() => {
        if (paramsURL.get('album') && token) {
            dispatch(fetchTracks(paramsURL.get('album'), token.token));
        } else {
            dispatch(fetchTracks());
        }
    }, [dispatch]);

    const buttonHandler = id => {
        console.log(id);
        dispatch(createTrackHistory(token.token, id));
    };

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">{tracks && (paramsURL.get('artist')) ? paramsURL.get('artist') : "All"}</Typography>
                        <Typography variant="h4">{tracks && (tracks.length> 0) ? tracks[0].album.name : "Tracks"}</Typography>
                    </Grid>
                </Grid>
                {tracks && (
                    tracks.map((track, id) => (
                        <Grid
                            p={2}
                            key={track._id}
                        >
                            <Grid justifyContent="space-between" >
                                <Grid item>{id + 1}.</Grid>
                                <Card sx={{ maxWidth: '600px', height: '100px', background: '#b39ddb' }} >
                                    <CardContent>
                                        <Typography variant="body1">Название альбома: {track.name}</Typography>
                                        <Typography variant="body1">Длина трека: {track.lasting}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item>
                                <Button
                                    type="button"
                                    onClick={() => buttonHandler(track._id)}
                                >
                                    Play
                                </Button>
                            </Grid>
                        </Grid>
                    )))}
            </Grid>
        </>
    );
};

export default Tracks;