import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import SearchButton from './SearchButton';
import RefreshButton from './RefreshButton';
import { makeStyles } from '@material-ui/core/styles';
import queryItem from '../databaseManagement/queryItem';
import history from '../history';
import ClearSearch from './ClearSearch';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

export default function UpperActions(props) {
    const classes = useStyles();

    const [searchString, setSearchString] = React.useState(history.location.search ? history.location.search.split('=')[1].replace(/%20/g, ' ') : null);

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    }

    const handleSearchPressed = async () => {
        if (searchString) {
            const cachedPosts = props.getCurrentPosts();

            props.updatePosts([]);

            history.push({
                search: `?search=${searchString}`
            });

            try {           
                const posts = await queryItem(searchString);

                if (posts.length) {
                    props.updatePosts(posts);
                } else {
                    props.updatePosts(cachedPosts);
                    props.pushNotification('warning', 'No results found for that search');

                }
            } catch(error) {
                props.pushNotification('error', `An error occurred: ${error}`);
            }
        }
    }

    const handleClearSearch = async () => {
        props.updatePosts([]);

        setSearchString('');
        try {
            history.push({
                search: ``
            });
            props.getNewPosts();
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <>
            <Grid container className={classes.root}>
                <Grid item xs xl={9}>
                    <TextField
                    id="searchInput"
                    placeholder="Search"   
                    margin="normal"
                    onChange={handleSearchChange}
                    variant="outlined"
                    fullWidth
                    defaultValue={history.location.search ? history.location.search.split('=')[1].replace(/%20/g, ' ') : null}
                    />
                </Grid>
                <Grid item xs xl={2} style={{paddingTop: 20, paddingLeft: 2}}>
                    <SearchButton onClick={handleSearchPressed} />
                    { history.location.search
                        ? <ClearSearch onClick={handleClearSearch} />
                        : null
                    }
                </Grid>
                <Grid item xs xl={1} style={{paddingTop: 20}}>
                    <RefreshButton handleRefresh={props.causeReload} />
                </Grid>
            </Grid>
        </>
     )
}