import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid'
import Paper from '@material-ui/core/Paper';
import { Button, Divider, TextField, Typography, FormControlLabel, Checkbox, FormHelperText } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
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
        backgroundColor: 'rgba(255, 255, 255, 0)',
        width: '80%',
        height: '65%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        [theme.breakpoints.down("sm")]: {
            height: '75%',
        }
    },
    container: {
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            flexDirection: 'column',
            height: '100%'
        },
    },
    inputs: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '95%',
        [theme.breakpoints.down("sm")]: {
            flexDirection: 'column'
        },
    },
    midField: {
        width: '60%',
        marginBottom: '1vw',
        [theme.breakpoints.down("sm")]: {
            width: '100%',
            marginBottom: '3vw'
        }
    },
    lastField: {
        width: '60%',
        [theme.breakpoints.down("sm")]: {
            width: '100%'
        }
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        width: '45%',
        maxWidth: '45%',
        [theme.breakpoints.down("sm")]: {
            width: '100%',
            maxWidth: '100%'
        },
        alignItems: 'center'
    },
    btnWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // height: '20%',
    },
}));

const temperature = [37, 38, 39, 40, 41];

export default function UserData(props) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const [startDate, setStartDate] = React.useState(null);
    const [location, setLocation] = React.useState({
        lat: '',
        lng: ''
    });
    const [userInfo, setUserInfo] = React.useState({
        firstName: '',
        lastName: '',
        job: '',
        temperature: 37
    })
    const [errors, setErrors] = React.useState({
        firstName: false,
        lastName: false,
        job: false,
        location: false,
        date: false
    });

    const handleDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserInfo((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = () => {
        let submitFlag = true;
        if (userInfo.firstName === '') {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    firstName: true
                }
            })
            submitFlag = false;
        }
        if (userInfo.lastName === '') {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    lastName: true
                }
            })
            submitFlag = false;
        }
        if (userInfo.job === '') {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    job: true
                }
            })
            submitFlag = false;
        }
        if (!checked) {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    location: true
                }
            })
            submitFlag = false;
        }
        if (startDate === null) {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    date: true
                }
            })
            submitFlag = false;
        }
        if (submitFlag) {
            database.ref(`/patients/${uuidv4()}`).set({
                ...userInfo,
                ...location
            })
                .then(res => {
                    console.log("Submitted!");
                    props.handleOpen();
                })
        }
    }

    const handleDateChange = (date) => {
        setStartDate(date.target.value);
    }

    React.useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setChecked(true);
            })
        }
    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" elevation={0} className={classes.paper}>
                <Typography style={{ marginBottom: '15px' }} variant="h3">Data Entry</Typography>
                {/* <Divider /> */}
                <div className={classes.container}>
                    <div className={classes.inputs}>
                        <div className={classes.col}>
                            <TextField name="firstName" className={classes.midField} variant="outlined" label="First Name"
                                onChange={handleDataChange} helperText={errors.firstName ? "Please enter your first name" : ""} error={errors.firstName} />
                            <TextField name="lastName" className={classes.midField} variant="outlined" label="Last Name"
                                onChange={handleDataChange} helperText={errors.lastName ? "Please enter your last name" : ""} error={errors.lastName} />
                            <TextField name="job" className={classes.lastField} variant="outlined" label="Job"
                                onChange={handleDataChange} helperText={errors.job ? "Please enter your job" : ""} error={errors.job} />
                        </div>
                        <div className={classes.col}>
                            <TextField helperText={errors.date ? "Please enter your birthdate!" : ""} error={errors.date} type="date" InputLabelProps={{
                                shrink: true
                            }} className={classes.midField} variant="outlined" label="Birthday" onChange={handleDateChange} />
                            <TextField select
                                // SelectProps={{
                                //     MenuProps: {
                                //         TransitionProps: {
                                //         }
                                //     }}}
                                name="temperature" className={classes.midField} variant="outlined" label="Temperature" defaultValue={37} onChange={handleDataChange}>
                                {temperature.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <FormControlLabel control={<Checkbox checked={checked} name="checkedD" />} label="Location" />
                            {errors.location ? <FormHelperText error={errors.location}>Please enable location!</FormHelperText> : ""}
                        </div>
                    </div>
                    <Button variant="outlined" color="primary" style={{ maxWidth: '100px', color: "#FF8C00", borderColor: "#FF8C00" }} onClick={handleSubmit}>Submit</Button>
                </div>
            </Paper>
        </div>
    )
}
