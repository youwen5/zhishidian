import React from 'react';
import { TextField } from '@material-ui/core';

export default function SearchBox(props) {
    const [searchString, setSearchString] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    }

     return(
        <TextField
        id="searchInput"
        placeholder="Search"   
        margin="normal"
        onChange={handleSearchChange}
        variant="outlined"
        fullWidth
        />
     )
}