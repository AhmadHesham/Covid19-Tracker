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
    },
    container: {
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        marginTop: theme.mixins.toolbar.minHeight,
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
