import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import {useSelector} from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import UserMenu from "./Menu/UserMenu";
import {ToastContainer} from "react-toastify";
import Button from "@mui/material/Button";

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
  back: {
    backgroundColor: '#6a1b9a'
  }
}));

const AppToolbar = () => {
  const { classes } = useStyles();
  const user = useSelector(state => state.users.user)

  return (
      <>
        <AppBar position="fixed" className={classes.back}>
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
              {user ? <Button className={classes.mainLink} component={Link} to="/track_history"> Track History</Button> : null}
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