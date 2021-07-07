import React from 'react';
import { Casino, Clear, Check } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    MenuItem: {

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: 'white',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const GenderEdit = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.character.gender);
    const [loading, setLoading] = React.useState(false)
    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleClear = () => {

        setValue('')
    }

    const handleCheck = () => {
        setLoading(true)
        let submitableCharacter = props.character
        submitableCharacter.gender = value
        updateCharacter(submitableCharacter)
    }
    const updateCharacter = (character) => {

        const myInit = {
            method: 'put',
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(character)
        }
        try {
            fetch(`http://localhost:3000/api/v1/npc/${character.id}`, myInit)
                .then((res) => {
                    const data = res.json()
                    console.log(data)
                    setLoading(false)
                })
        } catch (err) { console.log(err) }
    }

    const handleRandom = () => {
        setLoading(true)

        const myInit = {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(props.character)
        }
        console.log(myInit.body)
        try {
            fetch(`http://localhost:3000/api/v1/npc/${props.character.id}/edit/gender`, myInit)
                .then((res) => {
                    return res.json()

                }).then(data => {
                    console.log(data)
                    setValue(data)
                    setLoading(false)
                })
        } catch (err) { console.log(err) }
        setLoading(false)

    }
    return (
        <div>

            <FormControl className={classes.formControl}>
                <Select
                    labelId="demo-simple-select-label"
                    id="select"
                    value={value}
                    onChange={handleChange}
                >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                </Select>
            </FormControl>
            {loading ? <CircularProgress /> : <Check onClick={() => { handleCheck() }} />}
            <Clear onClick={() => { handleClear() }} />
            <Casino onClick={() => { handleRandom() }} />
        </div>
    )

}

export default GenderEdit;