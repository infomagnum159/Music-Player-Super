import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {Box, Grid, Paper, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {fetchHistory} from "../../store/actions/mainActions";
import Spinner from "../../components/UI/Spinner/Spinner";

const useStyles = makeStyles()(() => ({
    text: {
        marginLeft: "20px",
        width: "70%",
    },
    margin: {
        marginBottom: "15px",
    },
}));
const TrackHistory = () => {
    const dispatch = useDispatch();
    const trackHistory = useSelector(state => state.main.history);
    const fetchLoading = useSelector(state => state.main.fetchLoading);
    const { classes } = useStyles();


    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Track History</Typography>
                </Grid>
            </Grid>
            {fetchLoading ? (
                    <Grid item>
                        <Spinner/>
                    </Grid>
            ) : trackHistory && (
                trackHistory.map((track, id) => (
                    <Paper
                        component={Box}
                        p={2}
                        key={track._id}
                        className={classes.margin}
                    >
                        <Grid container>
                            <Grid item>{id + 1}.</Grid>
                            <Grid item className={classes.text}>
                                <Typography variant="body1">Название песни: {track.track.name}</Typography>
                                <Typography variant="body1">Дата прослушивания: {dayjs(track.datetime).format('H:mm DD-MM-YYYY')}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )))}
        </Grid>
    );
};

export default TrackHistory;