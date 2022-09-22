import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {apiUrl} from "../../config";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link} from "react-router-dom";
import {Grid, IconButton, Paper, Typography} from "@mui/material";
import {fetchAlbums} from "../../store/actions/mainActions";
import imageNotAvailable from "../../assets/images/not_available.png";

const Albums = () => {
    const dispatch = useDispatch();
    let albums = useSelector(state => state.main.albums);
    const paramsURL = new URLSearchParams(document.location.search.substring(1));
    let cardImage = imageNotAvailable;

    useEffect(() => {
        if (paramsURL.get('artist')) {
            dispatch(fetchAlbums(paramsURL.get('artist')));
        } else {
            dispatch(fetchAlbums());
        }
    }, [dispatch]);

    if (albums) {
        albums.map(album => {
            if (album.image) {
                return  cardImage = apiUrl + '/uploads/' + album.image;
            }
            return album;
        })
    }
    return (
        <>
            <Grid container direction="column" spacing={2} >
                <Grid item container justifyContent="space-between" alignItems="center" >
                    <Grid item>
                        <Typography sx={{color: '#6a1b9a'}}
                            variant="h4">{paramsURL.get('artist') && albums && (albums.length > 0)? albums[0].artist.name : "All"}</Typography>
                    </Grid>
                </Grid>

                {albums && (
                    albums.map((album, id) => (
                        <Paper
                            key={album._id}
                            sx={{marginBottom: '30px', background: '#6a1b9a'}}
                        >
                            <Grid container>
                                <img src={cardImage}  alt={albums[id].image}/>
                                <Grid item sx={{margin: '30px'}}>
                                    <Typography sx={{fontWeight: 'bold'}} variant="body1">Название альбома: {album.name}</Typography>
                                    <Typography sx={{fontWeight: 'bold'}} variant="body1">Год выпуска: {album.year}</Typography>

                                </Grid>
                                <Grid container item justifyContent="flex-end">
                                    <IconButton component={Link}
                                                to={'/tracks?album=' + album._id + '&artist=' + album.artist.name}>
                                        <ArrowForwardIosIcon/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Paper>
                    )))}
            </Grid>
        </>
    );
};

export default Albums;
