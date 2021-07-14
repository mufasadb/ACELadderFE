import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
// import Delete from "./Delete";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CharacterPanel from "./CharacterPanel";

const AccountList = () => {
  const [characters, setCharacters] = useState([]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");




  const getCharacter = () => {
    fetch(`${props.baseURL}/accounts/`)
      .then((res) => {
        return res.json();
      })
      .then((acc) => {
        console.log(acc);
        setCharacters(acc);
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

    return c;
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        options={{ filtering: true }}
        columns={[
          { title: "Name", field: "accountName" },
          { title: "Position", field: "position" },
          { title: "In Guild Now", field: "isActive" },
          { title: "Last Grabbed Character Data", field: "lastFetched" }
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
export default AccountList;
