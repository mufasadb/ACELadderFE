import React, { useEffect, useState } from "react";
// import Delete from "./Delete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
// import CharacterPanel from "./CharacterPanel";
import { CircularProgress } from '@material-ui/core';
// import {MaterialUIComponent} from "@material-ui/core";
import { Link } from "@material-ui/core";
import Grid from '@material-ui/core/Grid'
import { ReactComponent as DeadIcon } from "../img/dead.svg"

import LinearProgress from '@material-ui/core/LinearProgress';
import MaterialTable from "@material-table/core";
import Tooltip from "@material-ui/core/Tooltip";
import LeagueList from "./LeagueList"
import ClassList from "./ClassList";



const Ladder = (props) => {
  const [characters, setCharacters] = useState([]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [loading, setLoading] = useState([true]);

  const [classList, setClassList] = useState([]);
  const [leagueList, setLeagueList] = useState([]);


  const getCharacter = () => {
    fetch(`${props.baseURL}/api/v1/users/`, { headers: { leagueList: leagueList, classList, classList, top: 25 } })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((chars) => {
        // console.log(chars.length);
        setCharacters(chars)
        setLoading(false)
      })
      .catch((e) => {
        // setErrors(e);
        console.log(e)
      });
  };

  useEffect(() => {
    getCharacter();
  }, [leagueList, classList]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const updateLeague = (list) => {
    setLeagueList(list)
  }
  const updateClass = (list) => {
    setClassList(list)
  }
  // const toTitleCase = (str) => {
  //   return str.replace(/\w\S*/g, function (txt) {
  //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //   });
  // };


  let data = characters
  data = data.map((c) => {
    c.deadIcon = ""
    if (!c.isAlive) {
      // c.deadIcon = <img src={process.env.PUBLIC_URL + '/img/dead.svg'} /> 
      c.deadIcon = <DeadIcon />
    }
    //handle progress Linear bar

    if (parseInt(c.level) == 100) {
      c.experienceBar = <Tooltip title={`Congratulations on level 100!`}>
        <LinearProgress variant="buffer" value={100} valueBuffer={100} />
      </Tooltip>
    } else {

      let progress = parseInt(c.experience) - parseInt(c.xpThisLevel)
      let percent = progress / parseInt(c.xpToNext) * 100
      // console.log(percent)
      c.experienceBar =
        <Tooltip title={`current = ${c.experience}.xpThisLevel = ${c.xpThisLevel} progres = ${progress}. toNext=${c.xpToNext}. percent = ${percent}`}>
          <LinearProgress variant="buffer" value={percent} valueBuffer={99} />
        </Tooltip>
    }

    //handle URL for poe ninja
    let leagueURLPrefix = "challenge"
    if (c.league) {
      if (c.league.includes("HC") || c.league.includes("Hardcore")) { leagueURLPrefix = leagueURLPrefix + "hc" }
      if (c.league.includes("SSF")) { leagueURLPrefix += "ssf" }
    }
    c.poeNinjaURL = `http://poe.ninja/${leagueURLPrefix}/builds/char/${c.accountName}/${c.name}`

    //handle class from ID
    switch (c.class) {
      default:
        c.className = "Scion"
        break;

      case "1":
        c.className = "Marauder"
        break;
      case "2":
        c.className = "Ranger"
        break;
      case "3":
        c.className = "Witch"
        break;
      case "4":
        c.className = "Duelist"
        break;
      case "5":
        c.className = "Templar"
        break;
      case "6":
        c.className = "Shadow"
        break;
    }
    // console.log(c);
    return c;
  });



  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1} direction="row">
        <Grid item xs={6}>
          <LeagueList update={updateLeague} baseURL={props.baseURL} />
        </Grid>
        <Grid item xs={6}>
          <ClassList update={updateClass} baseURL={props.baseURL} />
        </Grid>
      </Grid>
      <MaterialTable
        title={"Ladder"}
        options={{
          filtering: false, sorting: false, paging: false,
          rowStyle: rowData => ({
            backgroundColor: !rowData.isAlive ? '#212121' : "#414141",
            color: !rowData.isAlive? '#AAA': 'FFF'
          })
        }}
        columns={[
          { title: "Position", field: "position" },
          { title: "Name", field: "poeNinjaURL", render: rowData => <Link target="_blank" color="inherit" href={rowData.poeNinjaURL}>{rowData.name}</Link> },
          { title: "League", field: "league" },
          { title: "Class", field: "ascendancy" },
          { title: "Class", field: "className" },

          // {title:"Asecendancy", field: "ascendancyClass"},
          { title: "Experience", field: "experienceBar", defaultSort: "asc", customSort: (a, b) => b.experience - a.experience },
          { title: "Level", field: "level" },
          { title: "Account", field: "accountName" },
          { title: "", field: "deadIcon" }
          // {title: "see details", field: }
        ]}
        data={data}
      // onRowClick={(event, rowData, togglePanel) => togglePanel()}

      //  <Button onClick={() => {
      // this.tableRef.current.onToggleDetailPanel([0], row)
      // }}/>
      />
    </ThemeProvider>
  );
};
export default Ladder;
