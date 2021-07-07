import React from "react";
import TextField from "@material-ui/core/TextField";
// import { makeStyles } from '@material-ui/core/styles'
import { Clear, Check } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//             color: 'white',
//         },
//     },
// }));

const TypeEdit = (props) => {
  // const classes = useStyles();
  const [value, setValue] = React.useState(props.item.type);
  const [loading, setLoading] = React.useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  const handleCheck = () => {
    setLoading(true);
    let submitItem = props.item;
    submitItem.type = value;
    updateItem(submitItem);
  };
  const updateItem = (item) => {
    let URI = `http://localhost:3000/api/v1/item/${item.id}`;
    const myInit = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    try {
      fetch(URI, myInit).then((res) => {
        const data = res.json();
        console.log(data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div>
      <TextField value={value}  onChange={handleChange}></TextField>
      {loading ? (
        <CircularProgress />
      ) : (
        <Check
          onClick={() => {
            handleCheck();
          }}
        />
      )}
      <Clear
        onClick={() => {
          handleClear();
        }}
      />
    </div>
  );
};

export default TypeEdit;
