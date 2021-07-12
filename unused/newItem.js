import React, { useState } from "react";
import { useInput } from "../hooks/useInput";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import LocationList from "./selects/locationSelect";
import RaceList from "./selects/RaceSelect";
import CityList from "./selects/CitySelect";
import { Redirect } from "wouter";

import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "2em",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: "white",
    background: "#272c34",
    margin: 5,
    borderRadius: 10,
    boxShadow: "0 2px 5px 5px #101010",
  },
}));

const CharacterForm = (props) => {
  const classes = useStyles();

  const { value: name, bind: bindName, reset: resetName } = useInput("");
  const { value: details, bind: bindDetails, reset: resetDetails } = useInput(
    ""
  );
  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription,
  } = useInput("");
  const { value: type, bind: bindType, reset: resetType } = useInput("");
  const [location, setLocation] = useState();
  const [city, setCity] = useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      name: name,
      location: location,
      city: city,
      details: details,
      description: description,
      type: type,
    };
    const myInit = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    console.log(myInit.body);
    try {
      fetch("http://localhost:3000/api/v1/item", myInit)
        .then((res) => {
          const data = res.json();
          console.log(data);
          return data;
        })
        .then((data) => {
          console.log(data);
          setLocation(`/items/${data.id}`);
        });
    } catch (err) {
      console.log(err);
    }
    reset();
  };

  function reset() {
    console.log("resetting form");
    resetName();
    resetDescription();
    resetDetails();
    resetType();
    setLocation("");
    setCity("");
  }

  return (
    <form className="newItemForm" onSubmit={handleSubmit}>
      <Grid xs container>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <TextField id="name" label="Name" type="text" {...bindName} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <TextField
              id="details"
              label="Details"
              type="text"
              {...bindDetails}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <LocationList
              selectName="Location"
              value={location}
              setValue={setLocation}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <CityList
              selectName="city"
              value={city}
              setValue={setCity}
              location={location}
            />
          </Paper>
          {/* <TextField id="city" label="City" type="text" {...bindCity} /> */}
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <TextField
              id="description"
              label="Description"
              type="text"
              {...bindDescription}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <TextField id="type" label="Type" type="text" {...bindType} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            value="submit"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CharacterForm;
