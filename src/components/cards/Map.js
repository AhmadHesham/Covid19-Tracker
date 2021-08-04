import React from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { Divider, Typography } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDhycrqrImtMTAM24n7RT9Pk_P6qpxaQlM",
    authDomain: "covid19-tracker-93871.firebaseapp.com",
    databaseURL: "https://covid19-tracker-93871-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "covid19-tracker-93871.appspot.com"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
else {
    firebase.app();
}
const database = firebase.database();

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
        const dbGet = database.ref('/patients');
        let data;
        dbGet.on('value', (snapshot) => {
            data = snapshot.val();

            let map;
            const loader = new Loader({
                apiKey: "AIzaSyBWuDcbo205YywWKT0IN18IQe8SRSzJ6U0",
                version: "weekly",
            });
            let center;
            for (const patient in data) {
                center = {
                    lat: data[patient].lat,
                    lng: data[patient].lng
                }
                break;
            }
            loader.load()
                .then((google) => {
                    map = new google.maps.Map(document.getElementById("map"), {
                        center,
                        zoom: 17,
                    });

                    console.log(data);
                    for (const patient in data) {
                        const marker = new google.maps.Marker({
                            position: {
                                lat: data[patient].lat,
                                lng: data[patient].lng,
                            },
                            label: data[patient].firstName.charAt(0),
                            map: map
                        })
                    }

                })
                .catch(err => {
                    console.log(err);
                });
        })
    }, [])
    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <div className={classes.textWrapper}>
                    <Typography variant="h3">Dashboard</Typography>
                    <Divider style={{ width: '100%' }} />
                </div>
                <div style={{ height: '90%', width: '100%' }}>
                    <div className={classes.map} id="map"></div>
                </div>
            </Paper>
        </div>
    )
}
