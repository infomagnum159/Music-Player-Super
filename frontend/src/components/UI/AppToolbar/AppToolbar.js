import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import {useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import UserMenu from "./Menu/UserMenu";
import {ToastContainer} from "react-toastify";

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
}));

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = useSelector(state => state.users.user)

  return (
      <>
        <AppBar position="fixed">
          <ToastContainer/>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  <Link to="/" className={classes.mainLink}>
                    Music app
                  </Link>
                </Typography>
              </Grid>
              <Grid item>
                {user ? <UserMenu user={user}/> : <Anonymous/>}

              </Grid>

              {/*<Button component={Link} to="/register" color="inherit">*/}
              {/*  Sign Up*/}
              {/*</Button>*/}
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar className={classes.staticToolbar}/>
      </>
  );
};

export default AppToolbar;