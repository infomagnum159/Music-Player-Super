import React from 'react';
import {Box, CircularProgress} from "@mui/material";


const Spinner = () => {
    return (
        <Box sx={{ display: 'flex' , marginTop: '5rem'}}>
            <CircularProgress />
        </Box>
    )
}

export default Spinner;
