import React from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        width: '90%',
        height: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        flexDirection: 'column'
    },
    map: {
        width: '100%',
        height: '100%'
    },
    textWrapper: {
        height: '10%',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }
}))


export default function Map() {
    const classes = useStyles();
    React.useEffect(() => {
        let map;
        const loader = new Loader({
            apiKey: "AIzaSyBWuDcbo205YywWKT0IN18IQe8SRSzJ6U0",
            version: "weekly",
        });
        loader.load().then((google) => {
            map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            });
        });
    }, [])
    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <div className={classes.textWrapper}>
                    <Typography variant="h3">Dashboard</Typography>
                    <Divider style={{width: '100%' }}/>
                </div>
                <div style={{ height: '85%', width: '100%' }}>
                    <div className={classes.map} id="map"></div>
                </div>
            </Paper>
        </div>
    )
}
