import React from 'react';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

export default function ClearSearch(props) {
    const handleClick = () => {
        props.onClick();
    }

    return(
    <IconButton aria-label="get more" onClick={handleClick}>
        <ClearIcon />
    </IconButton>
    );
}