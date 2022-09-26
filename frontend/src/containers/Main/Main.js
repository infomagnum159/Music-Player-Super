import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/actions/mainActions";
import {Grid, Typography} from "@mui/material";
import MainItem from "../../components/MainItem/MainItem";
import Spinner from "../../components/UI/Spinner/Spinner";

const Main = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.main.artists);
    const fetchLoading = useSelector(state => state.main.fetchLoading);


    useEffect( () => {
        dispatch(fetchArtists())
    }, [dispatch]);


    return (
            <Grid container direction="column" spacing={2}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item sx={{margin: 'auto'}}>
                        <Typography sx={{color: '#6a1b9a'}} variant="h4">Artists</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid item container direction="row" spacing={1}>
                        {fetchLoading ? (
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <Spinner/>
                                </Grid>
                            </Grid>
                        ) : artists.map(artist => (
                            <MainItem
                                key={artist._id}
                                id={artist._id}
                                name={artist.name}
                                information={artist.information}
                                image={artist.photo}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

    );
};

export default Main;