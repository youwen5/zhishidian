import React from 'react';
import { TextField } from '@material-ui/core';

export default function SearchBox(props) {
    const handleSearchChange = (event) => {
        props.onChange(event.target.value ? event.target.value : '');
    }

     return(
        <TextField
        id="searchInput"
        placeholder="Search"   
        margin="normal"
        onChange={handleSearchChange}
        variant="outlined"
        />
     )
}