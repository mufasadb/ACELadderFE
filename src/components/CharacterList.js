import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
// import Delete from "./Delete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CharacterPanel from "./CharacterPanel";

const CharacterList = (props) => {
  const [characters, setCharacters] = useState([]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const getCharacter = () => {
    fetch(`${props.baseURL}/api/v1/users/`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((chars) => {
        console.log(chars);
        setCharacters(chars);
      })
      .catch((e) => {
        // setErrors(e);
        console.log(e)
      });
  };

  useEffect(() => {
    getCharacter();
  }, []);

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

  const data = characters.map((c) => {
    c.image = (
      <img className="Character-Image" src={`https://npc-image-bucket.s3-ap-southeast-2.amazonaws.com/npc/${c.id}`} alt="words"></img>
    );
    // c.delete = (
    //   <Delete
    //     character={c}
    //     type={"character"}
    //     doUpdate={getCharacter}
    //   ></Delete>
    // );


    return c;
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        options={{ filtering: true }}
        columns={[
          { title: "Name", field: "name" },
          { title: "League", field: "league" },
          { title: "Class", field: "class" },
          // {title:"Asecendancy", field: "ascendancyClass"},
          { title: "Experience", field: "experience" },
          { title: "Level", field: "level" },
          { title: "Account", field: "accountName" },
          { title: "Position", field: "position" },
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
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    </ThemeProvider>
  );
};
export default CharacterList;
