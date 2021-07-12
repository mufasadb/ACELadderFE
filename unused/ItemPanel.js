import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "wouter";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#525252",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    margin: 5,
    // borderRadius: 10,
    // boxShadow: '0 2px 5px 5px #101010'
  },
  button: {
    marginTop: 5,
  },
}));
const ItemPanel = (props) => {
  const classes = useStyles();

  const onClickHandler = () => {
    console.log(props.item);
    props.viewHandler(props.item.id);
  };

  return (
    <div className={classes.root}>
      <Grid item xs container spacing={4} direction="row">
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Player Notes:{" "}
            {props.playerNotes
              ? props.character.playerNotes
              : "No Player Notes"}
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Button className={classes.button} variant="outlined">
            {" "}
            <Link href={`/items/${props.item.id}`}>
              <a className="link"> See Details</a>
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
    //some html
  );
};

export default ItemPanel;
