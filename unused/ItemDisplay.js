import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Name from "../components/editfunctions/NameEdit";
import Relations from "../components/editfunctions/EditRelation"
import Description from "../components/editfunctions/DescriptionEdit";
import City from "../components/editfunctions/CityEdit";
import Location from "../components/editfunctions/CityEdit";
import PlayerNotes from "../components/editfunctions/PlayerNotesEdit";
import Details from "./editfunctions/EditDetails";
import Type from "../components/editfunctions/TypeEdit";

const baseURL = "http://localhost:3000";

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

const ItemDisplay = (props) => {
  const [item, setItem] = useState({
    name: "",
  });
  const [relations, setRelations] = useState([])
  const [editName, setEditName] = useState(false);
  const [editType, setEditType] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editDetails, setEditDetails] = useState();
  const [editRelations, setEditRelations] = useState();
  const [editPlayerNotes, setEditPlayerNotes] = useState();
  const [editLocation, setEditLocation] = useState();
  const [editCity, setEditCity] = useState();

  const classes = useStyles();

  const edit = {
    name: editName,
    type: editType,
    description: editDescription,
    details: editDetails,
    relations: editRelations,
    playerNotes: editPlayerNotes,
    city: editCity,
    location: editLocation,
  };
  const setEdit = {
    name: setEditName,
    type: setEditType,
    description: setEditDescription,
    details: setEditDetails,
    relations: setEditRelations,
    playerNotes: setEditPlayerNotes,
    city: setEditCity,
    location: setEditLocation,
    relation: setEditRelations
  };

  const getData = () => {
    fetch(`${baseURL}/api/v1/item/${props.id}`)
      .then((res) => {
        return res.json();
      })
      .then((char) => {
        setItem(char);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRelations = () => {
    fetch(`${baseURL}/api/v1/item/${props.id}/relations`)
      .then((res) => {
        return res.json();
      })
      .then((rel) => {
        setRelations(rel);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getData()
    getRelations()
  }, []);

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
                    character={item}
                    type={"item"}
                    update={() => {
                      getData();
                    }}
                  />
                ) : (
                  item.name
                )}
              </h1>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Grid xs container direction="column">
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid xs item container direction="row">
                  <Grid item xs={10}>
                    <strong>Description: </strong>
                    {edit.description ? (
                      <Description
                        character={item}
                        type={"item"}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      item.description
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
            <Grid xs>
              <Paper className={classes.paper}>
                <Grid xs item container direction="row">
                  <Grid item xs={10}>
                    <strong>Relations: </strong>
                    {edit.relations ? (
                      <Relations
                        character={item}
                        type={"item"}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      relations
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("relation");
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
                <Grid item xs container direction="row">
                  <Grid item xs={11}>
                    <strong>Details: </strong>
                    {edit.details ? (
                      <Details
                        character={item}
                        type={"item"}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      item.details
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("details");
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
                    <strong>Type:</strong>
                    {editType ? (
                      <Type
                        item={item}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      item.type
                    )}
                    <relation
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("relation");
                      }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Edit
                      className={classes.editIcon}
                      onClick={() => {
                        onClickHandler("type");
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
                        character={item}
                        type={"item"}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      item.city
                    )}
                    ,{" "}
                    {editLocation ? (
                      <Location
                        character={item}
                        type={"item"}
                        update={() => {
                          getData();
                        }}
                      />
                    ) : (
                      item.location
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
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paperNotes}>
            <Grid xs item container direction="row">
              <Grid xs={11}>
                {edit.playerNotes ? (
                  <PlayerNotes
                    character={item}
                    type={"item"}
                    update={() => {
                      getData();
                    }}
                  />
                ) : item.playerNotes ? (
                  item.playerNotes
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
    </div>
  );
};
export default ItemDisplay;
