import React from 'react';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function Search(props) {
    const handleClick = () => {
        props.onClick();
    }

    return(
        <IconButton onClick={handleClick}>
            <SearchIcon />
        </IconButton>
    );
}