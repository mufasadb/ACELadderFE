import React, { useState } from 'react';
import { useInput } from '../hooks/useInput'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LocationList from './selects/locationSelect'
import RaceList from './selects/RaceSelect'
import CityList from './selects/CitySelect'
import { Redirect } from "wouter";

import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: '2em',
    },
    root: {
        flexGrow: 1,

    },
    paper: {
        padding: theme.spacing(3),
        textAlign: 'left',
        color: "white",
        background: "#272c34",
        margin: 5,
        borderRadius: 10,
        boxShadow: '0 2px 5px 5px #101010'
    }
}))

const CharacterForm = (props) => {
    const classes = useStyles();

    const { value: name, bind: bindName, reset: resetName } = useInput('');
    const { value: job, bind: bindJob, reset: resetJob } = useInput('');
    const { value: age, bind: bindAge, reset: resetAge } = useInput('');
    const { value: voice, bind: bindVoice, reset: resetVoice } = useInput('');
    const [gender, setGender] = useState();
    const [location, setLocation] = useState();
    const [originLocation, setOriginLocation] = useState();
    const [race, setRace] = useState();
    const [city, setCity] = useState();
    const [originCity, setOriginCity] = useState();



    const handleGenderChange = (event) => {
        console.log(event)
        setGender(event.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {
            setName: name,
            setLocation: location,
            setCity: city,
            setOriginLocation: originLocation,
            setOriginCity: originCity,
            setJob: job,
            setGender: gender,
            setAge: age,
            setRace: race,
            setVoice: voice
        }
        const myInit = {
            method: 'post',
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(data)
        }
        console.log(myInit.body)
        try {
            fetch('http://localhost:3000/api/v1/npc', myInit)
                .then((res) => {
                    const data = res.json()
                    console.log(data)
                    return data
                }).then(data=>{
                    console.log(data)
                    setLocation(`/characters/${data.id}`)
                })
        } catch (err) { console.log(err) }
        reset();
        
    }

    function reset() {
        console.log('resetting form')
        resetName();
        resetJob();
        resetAge();
        resetVoice();
        setGender('')
        setLocation('')
        setOriginLocation('')
        setRace('')
        setCity('')
        setOriginCity('')
    }

    return (

        <form className="newCharacterForm" onSubmit={handleSubmit}>
            <Grid xs container>
                <Grid item xs={3} spacing={4}>
                    <Paper className={classes.paper}>
                        <InputLabel id='gender'>Gender</InputLabel>
                        <Select id="gender" label="Gender" value={gender} onChange={handleGenderChange}>
                            <MenuItem value=''></MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <TextField id="age" label="Age" type="text" {...bindAge} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <RaceList value={race} setValue={setRace} />
                    </Paper>
                    {/* <TextField id="race" label="Race" type="text" {...bindRace} /> */}
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <LocationList selectName='Location' value={location} setValue={setLocation} />
                    </Paper>
                    {/* <TextField id="location" label="Location" type="text" {...bindLocation} /> */}
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <CityList selectName='city' value={city} setValue={setCity} location={location} />
                    </Paper>
                    {/* <TextField id="city" label="City" type="text" {...bindCity} /> */}
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <LocationList selectName='originLocation' value={originLocation} setValue={setOriginLocation} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <CityList selectName='originCity' value={originCity} setValue={setOriginCity} location={originLocation} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <TextField id="job" label="Job" type="text" {...bindJob} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <TextField id="voice" label="Voice" type="text" {...bindVoice} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <TextField id="Name" label="name" type="text" {...bindName} />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} type="submit" variant="contained" value="submit">Create</Button>
                </Grid>
            </Grid>
        </form>

    )
}

export default CharacterForm;