import React from 'react';
import TextField from '@material-ui/core/TextField'
// import { makeStyles } from '@material-ui/core/styles'
import { Casino, Clear, Check } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .MuiTextField-root': {
//             margin: theme.spacing(1),
//             width: '25ch',
//             color: 'white',
//         },
//     },
// }));

const RaceEdit = (props) => {
    // const classes = useStyles();
    const [value, setValue] = React.useState(props.character.race);
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
        submitableCharacter.race = value
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
            fetch(`http://localhost:3000/api/v1/npc/${props.character.id}/race`, myInit)
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

            <TextField
                value={value} onChange={handleChange}>
            </TextField>
            {loading ? <CircularProgress /> : <Check onClick={() => { handleCheck() }} />}
            <Clear onClick={() => { handleClear() }} />
            <Casino onClick={() => { handleRandom() }} />
        </div>
    )

}

export default RaceEdit;