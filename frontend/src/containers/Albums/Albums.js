import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {apiUrl} from "../../config";
import {Link} from "react-router-dom";
import { Grid, Paper, Typography} from "@mui/material";
import {fetchAlbums} from "../../store/actions/mainActions";
import imageNotAvailable from "../../assets/images/not_available.png";
import Spinner from "../../components/UI/Spinner/Spinner";

const Albums = () => {
    const dispatch = useDispatch();
    let albums = useSelector(state => state.main.albums);
    const fetchLoading = useSelector(state => state.main.fetchLoading);
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
            <Grid  >
                <Grid item container justifyContent="space-between"  >
                    <Grid item>
                        <Typography sx={{color: '#6a1b9a'}}
                            variant="h4">{paramsURL.get('artist') && albums && (albums.length > 0)? albums[0].artist.name : "All Albums"}</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid item container direction="row" spacing={1}>
                {fetchLoading ? (
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Spinner/>
                            </Grid>
                        </Grid>
                    ) : albums && (
                    albums.map((album, id) => (
                        <Paper

                            key={album._id}
                            sx={{marginBottom: '30px', background: '#6a1b9a'}}
                        >
                            <Grid component={Link}  container justifyContent="center" alignItems="center"
                                  to={'/tracks?album=' + album._id + '&artist=' + album.artist.name} sx={{margin: '10px', width: "300px"}} >
                                <img src={cardImage}  alt={albums[id].image}/>
                                <Grid item sx={{margin: '30px', color: 'black', textDecoration: 'none'}} >
                                    <Typography sx={{fontWeight: 'bold'}} variant="body1">Название альбома: {album.name}</Typography>
                                    <Typography sx={{fontWeight: 'bold'}} variant="body1">Год выпуска: {album.year}</Typography>

                                </Grid>
                            </Grid>
                        </Paper>
                    )))}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Albums;
