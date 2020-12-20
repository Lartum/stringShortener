import React from 'react';
import { AppBar, Typography, makeStyles } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:20
      },
      title: {
        flexGrow: 1,
        padding:15,
      },
}))

function Header() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Typography variant='h6' className={classes.title}>    
                    String Shortener
                </Typography>
            </AppBar>
        </div>
    );
}

export default Header;