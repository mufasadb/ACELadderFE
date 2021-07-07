import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Age from "./editfunctions/AgeEdit";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Name from "./editfunctions/NameEdit";
import Description from "./editfunctions/DescriptionEdit";
import Race from "./editfunctions/RaceEdit";
import Gender from "./editfunctions/GenderEdit";
import Location from "./editfunctions/LocationEdit";
import City from "./editfunctions/CityEdit";
import OriginCity from "./editfunctions/OriginCityEdit";
import OriginLocation from "./editfunctions/OriginLocationEdit";
import Voice from "./editfunctions/VoiceEdit";
import PlayerNotes from "./editfunctions/PlayerNotesEdit";
import Job from "./editfunctions/JobEdit";

const toTitleCase = (str) => {
  if (str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else return "";
};

const useStyles = makeStyles((theme) => ({
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
  paperTitle: {
    padding: theme.spacing(3),
    textAlign: "centre",
    color: "white",
    background: "#272c34",
    margin: 5,
    borderRadius: 10,
    boxShadow: "0 2px 5px 5px #101010",
  },
  paperNotes: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: "white",
    background: "#272c34",
    margin: 5,
    borderRadius: 10,
    boxShadow: "0 2px 5px 5px #101010",
    minHeight: 300,
    whiteSpace: "pre-line",
  },
  editIcon: {
    align: "top-right",
  },
  className: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
}));

const CharacterDisplay = (props) => {
  const [character, setCharacter] = useState({ name: "" });

  const [editName, setEditName] = useState(false);
  const [editAge, setEditAge] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editRace, setEditRace] = useState();
  const [editGender, setEditGender] = useState();
  const [editLocation, setEditLocation] = useState();
  const [editOriginLocation, setEditOriginLocation] = useState();
  const [editVoice, setEditVoice] = useState();
  const [editPlayerNotes, setEditPlayerNotes] = useState();
  const [editJob, setEditJob] = useState();

  const classes = useStyles();

  const edit = {
    name: editName,
    age: editAge,
    description: editDescription,
    race: editRace,
    gender: editGender,
    location: editLocation,
    originLocation: editOriginLocation,
    playerNotes: editPlayerNotes,
    voice: editVoice,
    job: editJob,
  };
  const setEdit = {
    name: setEditName,
    age: setEditAge,
    description: setEditDescription,
    race: setEditRace,
    gender: setEditGender,
    location: setEditLocation,
    originLocation: setEditOriginLocation,
    playerNotes: setEditPlayerNotes,
    voice: setEditVoice,
    job: setEditJob,
  };

  const goBack = () => {
    props.viewHandler(false);
  };
  const getData = () => {
    fetch(`http://localhost:3000/api/v1/npc/${props.id}`)
      .then((res) => {
        return res.json();
      })
      .then((char) => {
        setCharacter(char);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getData();
  }, []);
  const characterImage = (
    <img
      className=""
      src={`https://npc-image-bucket.s3-ap-southeast-2.amazonaws.com/npc/${props.id}`}
      alt={character.name ? character.name : null}
    ></img>
  );

  const onClickHandler = (area) => {
    console.log(edit[area]);
    setEdit[area](!edit[area]);
  };

  return (
    <div className="classes.root">
      <Grid container spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} spacing={1}>
          <Paper className={classes.paperTitle}>
            <Grid xs={11}> </Grid>
            <Grid xs={1}>
              <Edit
                onClick={() => {
                  onClickHandler("name");
                }}
              />
            </Grid>
            <Grid xs={12}>
              <h1>
                {editName ? (
                  <Name
                    character={character}
                    update={() => {
                      getData();
                    }}
                  />
                ) : (
                  character.name
                )}
              </h1>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Grid xs container direction="column">
            <Grid xs>
              <Paper className={classes.paperTitle}>
                {characterImage ? characterImage : null}
              </Paper>
            </Grid>

            <Grid xs>
              <Paper className={classes.paper}>
                <Grid xs item container direction="row">
                  <Grid item xs={10}>
                    {edit.description ? (
                      <Description
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      character.description
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("description");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={4} xs container>
          <Grid item xs container direction="column">
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid id="1" item xs container direction="row">
                  <Grid item xs={11}>
                    <strong> Gender:</strong>{" "}
                    {edit.gender ? (
                      <Gender
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      toTitleCase(character.gender)
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("gender");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid item xs container direction="row">
                  <Grid item xs={11}>
                    <strong>Race: </strong>
                    {edit.race ? (
                      <Race
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      toTitleCase(character.race)
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("race");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid item xs container direction="row">
                  <Grid item xs={11}>
                    <strong>Age:</strong>{" "}
                    {editAge ? (
                      <Age
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      character.age
                    )}{" "}
                    Years old
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("age");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid item xs container direction="row">
                  <Grid item xs={11}>
                    <strong>Job:</strong>{" "}
                    {editJob ? (
                      <Job
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      character.job
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("job");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid item xs container direction="row">
                  <Grid item xs={11}>
                    <strong>Currently in: </strong>{" "}
                    {editLocation ? (
                      <City
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      character.city
                    )}
                    ,{" "}
                    {editLocation ? (
                      <Location
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      character.location
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("location");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid item xs container direction="row">
                  <Grid item xs={11}>
                    <strong>Originally From: </strong>{" "}
                    {editOriginLocation ? (
                      <OriginCity
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      character.originCity
                    )}
                    ,{" "}
                    {editOriginLocation ? (
                      <OriginLocation
                        character={character}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      character.originLocation
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("originLocation");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Grid item xs container direction="row">
                  <Grid item xs={11}>
                    <p>
                      {editVoice ? (
                        <Voice
                          character={character}
                          update={() => {
                            getData();
                          }}
                        />
                      ) : (
                        character.voice
                      )}
                    </p>
                  </Grid>
                  <Grid>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("voice");
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paperNotes}>
            <Grid xs item container direction="row">
              <Grid xs={11}>
                {edit.playerNotes ? (
                  <PlayerNotes
                    character={character}
                    update={() => {
                      getData();
                    }}
                  />
                ) : character.playerNotes ? (
                  character.playerNotes
                ) : (
                  "No player notes"
                )}
              </Grid>
              <Grid xs={1}>
                <Edit
                  className={classes.editIcon}
                  onClick={() => {
                    onClickHandler("playerNotes");
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        className={classes.goBackButton}
        onClick={() => {
          goBack();
        }}
      >
        List View
      </Button>
    </div>
  );
};
export default CharacterDisplay;
