import React, { useState, useEffect } from 'react';
// import { useInput } from '../hooks/useInput'
import TextField from '@material-ui/core/TextField'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';






// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import { Redirect } from "wouter";

import { Paper } from '@material-ui/core'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }
}))

const LeagueList = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [leagues, setLeagues] = useState([]);
    const [leagueData, setLeagueData] = useState([]);
    
    // const { value: age, bind: bindAge, reset: resetAge } = useInput('');
    // const { value: voice, bind: bindVoice, reset: resetVoice } = useInput('');
    // const [gender, setGender] = useState();
    // const [location, setLocation] = useState();
    // const [originLocation, setOriginLocation] = useState();
    // const [race, setRace] = useState();
    // const [city, setCity] = useState();
    // const [originCity, setOriginCity] = useState();




    const getAdminSettings = () => {
        fetch(`${props.baseURL}/api/v1/leagues`)
            .then((res) => {
                return res.json();
            })
            .then((leagues) => {
                // console.log(settings.leagueList);
                setLeagueData(leagues)
                // setLeagues(settings.leagueList)
                // console.log(leagueData)
            })
            .catch((e) => {
                // setErrors(e);
                console.log(e)
            });
    };

    useEffect(
        () => { getAdminSettings() }, []
    )
    useEffect(
        () => { props.update(leagues) }, [leagues]
    )



    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const handleChangeLeagues = (event) => {
        setLeagues(event.target.value)
    }
    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setLeagues(value);
    }


    return (



        <Paper className={classes.paper}>

            {/* <TextField id="leagues" label="Leagues" type="text" value={leagues} onChange={handleChangeLeagues} /> */}
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Leagues</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={leagues}
                    onChange={handleChangeLeagues}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {leagueData.map((league) => (
                        <MenuItem key={league} value={league} style={getStyles(leagueData, league, theme)}>
                            {league}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>

    )
}

export default LeagueList;