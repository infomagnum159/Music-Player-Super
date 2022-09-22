import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton,} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link} from "react-router-dom";

import {apiUrl} from "../../config";
import imageNotAvailable from "../../assets/images/not_available.png";

const MainItem = ({name, information, id, image}) => {

    let cardImage = imageNotAvailable;
    if (image) {
        cardImage = apiUrl + '/uploads/' + image;
    }
    return (

    <Grid item xs={12} sm={6} lg={3} sx={{margin: '20px'}}>
        <Card sx={{height: '100%', background: '#9c4dcc'}}>
            <CardHeader title={name}/>
            <CardMedia
                title={name}
                image={cardImage}
                sx={{paddingTop: '56.25%', height: 0}}
            />
            <CardContent>
                <strong>
                    Information: {information}
                </strong>
            </CardContent>
            <CardActions>
                <IconButton component={Link} to={'/albums?artist=' + id}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </CardActions>
        </Card>
    </Grid>
    );
};

// MainItem.propTypes = {
//     name: PropTypes.string.isRequired,
//     information: PropTypes.string.isRequired,
//     id: PropTypes.string.isRequired,
//     image: PropTypes.string,
//     // count: PropTypes.number.isRequired,
// };

export default MainItem;