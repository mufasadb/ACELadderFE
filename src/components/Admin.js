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

const Admin = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [leagues, setLeagues] = useState([]);
    const [timeout, setTimeout] = useState("")
    const [leagueData, setLeagueData] = useState([]);
    const [newLeague, setNewLeague] = useState("");




    const getAdminSettings = () => {
        fetch(`${props.baseURL}/api/v1/admin`)
            .then((res) => {
                return res.json();
            })
            .then((settings) => {
                // console.log(settings.leagueList);
                setTimeout(settings.timeout)
                setLeagueData(settings.leagueList)
                // setLeagues(settings.leagueList)
                // console.log(leagueData)
            })
            .catch((e) => {
                // setErrors(e);
                console.log(e)
            });
    };

    useEffect(
        () => { getAdminSettings() }
    )

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = { leagues: leagues, timeout: timeout }
        const myInit = {
            method: 'post',
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(data)
        }
        console.log(myInit.body)
        try {
            fetch(`${props.baseURL}/api/v1/admin`, myInit)
                .then((res) => {
                    const data = res.json()
                    console.log(data)
                    return data
                }).then(data => {
                    console.log(data)
                })
        } catch (err) { console.log(err) }

    }

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const handleChangeTimeout = (event) => {
        setTimeout(event.target.value);
    }
    const handleAddNewLeague = (event) => {
        setLeagueData((leagueList) => {
            leagueList.push(event.target.value)
        })
    }
    const handleNewLeague = (event) => {
        setNewLeague(event.target.value)
    }
    const handleChangeLeagues = (event) => {
        setLeagues(event.target.value);
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

        <form className="Admin Settings" onSubmit={handleSubmit}>
            <Grid xs container>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <TextField id="timeout" label="Timeout" type="text" value={timeout} onChange={handleChangeTimeout} />
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>

                        <TextField id="newLeague" label="newLeague" type="text" value={newLeague} onChange={handleNewLeague} />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
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
                </Grid>

                <Grid item xs={12}>
                    <Button className={classes.button} type="update" variant="contained" value="newLeague">Update</Button>
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} type="submit" variant="contained" value="submit">Update</Button>
                </Grid>
            </Grid>
        </form>

    )
}

export default Admin;