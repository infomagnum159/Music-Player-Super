import React, {useEffect} from 'react';
import {createTrackHistory, fetchTracks} from "../../store/actions/mainActions";
import {useDispatch, useSelector} from "react-redux";
import {Box, Card, CardContent, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import musicImage from "../../assets/images/istockphoto-1076840920-612x612.jpg";


const Tracks = () => {
    const dispatch = useDispatch();
    const paramsURL = new URLSearchParams(document.location.search.substring(1));
    const tracks = useSelector(state => state.main.tracks);
    const user = useSelector(state => state.users.user);
    let cardImage = musicImage;
    useEffect(() => {
        if (paramsURL.get('album')) {
            dispatch(fetchTracks(paramsURL.get('album')));
        } else {
            dispatch(fetchTracks());
        }
    }, [dispatch]);

    const buttonHandler = id => {
        console.log(id);
        dispatch(createTrackHistory(user.token, id));
    };

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4" sx={{color: "#6a1b9a"}}>{tracks && (paramsURL.get('artist')) ? paramsURL.get('artist') : "All"}</Typography>
                        <Typography variant="h4">{tracks && (tracks.length> 0) ? tracks[0].album.name : "Tracks"}</Typography>
                    </Grid>
                </Grid>
                {tracks && (
                    tracks.map((track, id) => (
                        <Card sx={{ display: 'flex', }} key={track._id}>
                            <Grid item sx={{color: "#6a1b9a", fontWeight: "bold"}}>{id + 1}.</Grid>
                            <Box sx={{ display: 'flex', flexDirection: 'column', background: '#b39ddb', width: '400px', marginBottom: "20px",marginLeft: "15px" }}>
                                <CardContent>
                                    <Typography component="div" variant="h5">
                                        {track.lasting}
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {track.name}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="play/pause" onClick={() => buttonHandler(track._id)}>
                                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151, height: 153 }}
                                image={cardImage}
                                alt="Live from space album cover"
                            />
                        </Card>
                    )))}

                {/*{tracks && (*/}
                {/*    tracks.map((track, id) => (*/}
                {/*        <Grid*/}
                {/*            p={2}*/}
                {/*            key={track._id}*/}
                {/*        >*/}
                {/*            <Grid justifyContent="space-between" >*/}
                {/*                <Grid item>{id + 1}.</Grid>*/}
                {/*                <Card sx={{ maxWidth: '600px', height: '100px', background: '#b39ddb' }} >*/}
                {/*                    <CardContent>*/}
                {/*                        <Typography variant="body1">Название альбома: {track.name}</Typography>*/}
                {/*                        <Typography variant="body1">Длина трека: {track.lasting}</Typography>*/}
                {/*                    </CardContent>*/}
                {/*                </Card>*/}
                {/*            </Grid>*/}
                {/*            <Grid item>*/}
                {/*                <Button*/}
                {/*                    type="button"*/}
                {/*                    onClick={() => buttonHandler(track._id)}*/}
                {/*                >*/}
                {/*                    Play*/}
                {/*                </Button>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    )))}*/}
            </Grid>
        </>
    );
};

export default Tracks;