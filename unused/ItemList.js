import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Delete from './Delete'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ItemPanel from './ItemPanel'


const ItemList = () => {
    const [items, setItems] = useState([]);


    const getItem = () => {
        fetch("http://localhost:3000/api/v1/item")
          .then((res) => {
            return res.json();
          })
          .then((items) => {
            console.log(items);
            setItems(items);
          })
          .catch((e) => {
            // setErrors(e);
              console.log('errors')
          });
      };

    useEffect(() => {
        getItem();
      }, []);

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    const data = items.map((i) => {
        i.delete = <Delete character={i} type={"item"} doUpdate={console.log('delete')}></Delete>


        i.location = toTitleCase(i.location)
        return i

    })


    return (
        <ThemeProvider theme={theme}>
            <MaterialTable
                options={{ filtering: true }}
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'relation', field: 'relation' },
                    { title: 'Location', field: 'location' },
                    { title: 'City', field: 'city' },
                    { title: 'Delete', field: 'delete' }
                ]}
                data={data}
                detailPanel={rowData => {
                    return (<ItemPanel viewHandler={console.log('chagne view')} item={rowData} />)
                }}

                onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
        </ThemeProvider>
    )
}
export default ItemList;