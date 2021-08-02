import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserData from '../components/cards/UserData';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: `calc(100% - 260px)`,
        display: 'flex',
        justifyContent: 'centerPaper',
        alignItems: 'center',
        marginLeft: '260px',
        [theme.breakpoints.down("xs")]: {
            width: '95%',
            marginLeft: 0
        }
    },
    container: {
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        marginTop: theme.mixins.toolbar.minHeight,
        width: '100%',
    }
}))

export default function DataEntry() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <UserData />
            </div>
        </div>
    )
}
