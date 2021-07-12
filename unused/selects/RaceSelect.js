import React, { useState, useEffect } from "react";
import { Select, MenuItem, InputLabel } from "@material-ui/core";

function camel2title(camelCase) {
  return camelCase
    .replace(/([A-Z])/g, function (match) {
      return " " + match;
    })
    .replace(/^./, function (match) {
      return match.toUpperCase();
    });
}

const RaceSelect = (props) => {
  const [list, setList] = useState([]);

  const getRaces = () => {
    fetch("http://localhost:3000/api/v1/world/raceList")
      .then((res) => {
        return res.json();
      })
      .then((thing) => {
        setList(thing);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

  const menuItems = () => {
    const res = list.map((race) => {
      return <MenuItem value={race}>{camel2title(race)}</MenuItem>;
    });
    return res;
  };

  useEffect(() => {
    getRaces();
  }, []);
  return (
    <>
      <InputLabel id="race">Race</InputLabel>
      <Select
        id="race"
        label="Race"
        onChange={handleChange}
        value={props.value}
      >
        {menuItems()}
      </Select>
    </>
  );
};

export default RaceSelect;
