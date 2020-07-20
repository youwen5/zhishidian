import React from 'react';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function Search(props) {
    const handleClick = () => {
        props.onClick('info', 'The search button is just a placeholder for now');
    }

    return(
        <IconButton onClick={handleClick}>
            <SearchIcon />
        </IconButton>
    );
}