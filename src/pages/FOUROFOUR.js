import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: `calc(100% - 260px)`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '260px',
        [theme.breakpoints.down("xs")]: {
            width: '100%',
            marginLeft: 0
        }
    },
    container: {
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        marginTop: theme.mixins.toolbar.minHeight,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    }
}))

export default function FOUROFOUR() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <h1>404 NOT FOUND</h1>
            </div>
        </div>
    )
}
