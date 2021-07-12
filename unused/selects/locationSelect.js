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


const LocationSelect = (props) => {
    const [list, setList] = useState([])



    const getLocations = () => {
        fetch('http://localhost:3000/api/v1/world/locationList')
            .then(
                res => { return res.json() })
            .then((thing) => { setList(thing) })
            .catch(e => { console.log(e) })
    }

    const handleChange = (event) => {
        props.setValue(event.target.value)
    }

    const menuItems = () => {
        const res = list.map((loc) => {
            return <MenuItem value={loc}>{camel2title(loc)}</MenuItem>
        })
        return res
    }

    useEffect(() => { getLocations() }, [])
    return (
        <>
            <InputLabel id={props.selectName}>{camel2title(props.selectName)}</InputLabel>
            <Select id={props.selectName} onChange={handleChange} value={props.value}>
            <MenuItem value=''></MenuItem>
                {menuItems()}
            </Select>
        </>
    )
}


export default LocationSelect;