import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core'


function camel2title(camelCase) {
    return camelCase
        .replace(/([A-Z])/g, function (match) {
            return " " + match;
        })
        .replace(/^./, function (match) {
            return match.toUpperCase();
        });
}


const CitySelect = (props) => {
    const [list, setList] = useState([])



    const getCities = () => {
        fetch(`http://localhost:3000/api/v1/world/cityList/${props.location}`)
            .then(
                res => { return res.json() })
            .then((thing) => { setList(thing) })
            .catch(e => { console.log(e) })
    }

    const handleChange = (event) => {
        props.setValue(event.target.value)
    }

    const menuItems = () => {
        if (!list.message) {

            const res = list.map((city) => {
                return <MenuItem value={city}>{camel2title(city)}</MenuItem>
            })
            return res
        } return <MenuItem value=''></MenuItem>
    }

    useEffect(() => { getCities() }, [props.location])
    return (<>
        <InputLabel id={props.selectName}>{camel2title(props.selectName)}</InputLabel>
        <Select id={props.selectName} onChange={handleChange} value={props.value}>
            {menuItems()}
        </Select>
    </>
    )
}


export default CitySelect;