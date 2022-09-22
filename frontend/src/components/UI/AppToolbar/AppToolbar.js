import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit'
    },
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
  back:{
    background: "#9c4dcc"
  }
}));

const AppToolbar = () => {
  const {classes} = useStyles();

  return (
    <>
     <AppBar position="fixed">
       <Toolbar className={classes.back}>
         <Grid container justifyContent="space-between" alignItems="center">
           <Typography variant="h6">
               Music App
           </Typography>
         </Grid>
       </Toolbar>
     </AppBar>
     <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;