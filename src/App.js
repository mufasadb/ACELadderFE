import "./App.css";
import CharacterList from "./components/CharacterList";
// import ItemList from "../unused/ItemList";
import React, { useState, useEffect } from "react";
// import CharacterForm fro../unused/newCharacterter";
import AccountList from "./components/AccountsList"
import CharacterDisplay from "./components/CharacterDisplay";
// import ItemDisplay from "./components/ItemDisplay";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Route } from "wouter";

import Grid from "@material-ui/core/Grid";

const baseURL = "http://localhost:3000";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: 60,
  },
}));
const App = () => {
  const classes = useStyles();

  const [errors, setErrors] = useState();

  const updateAccounts = () => {
    fetch(`${baseURL}/accounts/update`).then((res) => {
      return res.json();
    }).then(data => {
      console.log(data);
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>ACE Ladder</h1>
      </header>
      <div className="App-content">
        <Button variant="contained">
          <Link href="/">
            <a className="link"> Characters</a>
          </Link>
        </Button>


        <Button variant="contained">
          <Link href="/accounts">
            <a className="link"> Accounts</a>
          </Link>
        </Button>

        <Button variant="contained" onClick={() => { updateAccounts(); }}>

          <a className="link">Update Accounts</a>

        </Button>

        {/* <Button variant="contained">
          <Link href="/newCharacter/">
            <a className="link"> Create a New NPC</a>
          </Link>
        </Button> */}
        {/* <Button variant="contained">
          <Link href="/newItem/">
            <a className="link"> Create a New Item</a>
          </Link>
        </Button> */}
        <Route path="/" component={CharacterList} />
        {/* <Route path="/newCharacter" component={CharacterForm} /> */}
        {/* <Route path="/newItem" component={ItemForm} /> */}
        <Route path="/accounts" component={AccountList} />
        <Route path="/characters/:id">
          {(params) => <CharacterDisplay id={params.id} />}
        </Route>
        {/* <Route path="/items/:id"> */}
        {/* {(params) => <ItemDisplay id={params.id} />} */}
        {/* </Route> */}
      </div>
    </div>
  );
};

export default App;
