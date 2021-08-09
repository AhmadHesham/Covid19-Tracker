import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
            width: '100%',
            marginLeft: 0
        }
    },
    container: {
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
        marginTop: theme.mixins.toolbar.minHeight,
        width: '100%',
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function DataEntry() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <UserData handleOpen={handleOpen}/>
                <Snackbar TransitionProps={{appear: false}} open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Data Registered Successfully!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}
