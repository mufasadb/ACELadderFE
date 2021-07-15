import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
// import Delete from "./Delete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Group, Favorite, FavoriteBorder, Person } from '@material-ui/icons';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CharacterPanel from "./CharacterPanel";
import { CircularProgress } from '@material-ui/core';


const CharacterList = (props) => {
  const [characters, setCharacters] = useState([[]]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [filterHC, setFilterHC] = useState([true]);
  const [filterSSF, setFilterSSF] = useState([false]);
  const [loading, setLoading] = useState([true]);
  const getCharacter = () => {
    console.log(filterHC)
    fetch(`${props.baseURL}/api/v1/users/`, { headers: { hc: filterHC, ssf: filterSSF } })
      .then((res) => {
        return res.json();
      })
      .then((chars) => {
        console.log(chars.length);
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
  }, [filterHC, filterSSF]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  // const toTitleCase = (str) => {
  //   return str.replace(/\w\S*/g, function (txt) {
  //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //   });
  // };

  const updateHC = () => {
    setLoading(true)
    setFilterHC(!filterHC)

    // getCharacter();

  }
  const updateSSF = () => {
    setLoading(true)
    setFilterSSF(!filterSSF);
    // getCharacter();
  }

  let data = characters
  data = data.map((c) => {
    switch (c.class) {
      case "0":
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

  let filterHCIcon = filterHC ? <Favorite /> : <FavoriteBorder />
  let filterSSFIcon = filterSSF ? <Person /> : <Group />

  if (loading) {
    filterHCIcon = <CircularProgress />
    filterSSFIcon = <CircularProgress />
  }

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        options={{ filtering: false, sorting: false }}
        columns={[
          { title: "Name", field: "name" },
          { title: "League", field: "league" },
          { title: "Class", field: "ascendancy" },
          { title: "Class", field: "className" },

          // {title:"Asecendancy", field: "ascendancyClass"},
          { title: "Experience", field: "experience", defaultSort: "asc", customSort: (a, b) => b.experience - a.experience },
          { title: "Level", field: "level" },
          { title: "Account", field: "accountName" },
          { title: "Position", field: "position" },
          // {title: "see details", field: }
        ]}
        data={data}
        detailPanel={(rowData) => {
          return (
            <CharacterPanel
              viewHandler={console.log('change view')}
              character={rowData}
            />
          );
        }}
        actions={
          [
            { icon: () => filterHCIcon, onClick: () => updateHC(), position: "toolbar" },
            { icon: () => filterSSFIcon, onClick: () => updateSSF(), position: "toolbar" },
          ]
        }
      // onRowClick={(event, rowData, togglePanel) => togglePanel()}

      //  <Button onClick={() => {
      // this.tableRef.current.onToggleDetailPanel([0], row)
      // }}/>
      />
    </ThemeProvider>
  );
};
export default CharacterList;
