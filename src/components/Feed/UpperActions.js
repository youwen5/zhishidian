import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import SearchButton from './SearchButton';
import RefreshButton from './RefreshButton';
import { makeStyles } from '@material-ui/core/styles';
import queryItem from '../databaseManagement/queryItem';
import history from '../history';
import ClearSearch from './ClearSearch';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

export default function UpperActions(props) {
    const classes = useStyles();
    const routerHistory = useHistory();

    const [searchString, setSearchString] = React.useState(history.location.search ? history.location.search.split('=')[1].replace(/%20/g, ' ') : null);

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    }

    const handleSearchPressed = async () => {
        if (searchString) {
            const cachedPosts = props.getCurrentPosts();

            props.updatePosts([]);

            history.push({
                search: `?search=${searchString}`,
                pathname: routerHistory.location.pathname
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
                search: ``,
                pathname: routerHistory.location.pathname
            });
            props.getNewPosts();
        } catch(error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        return routerHistory.listen(location => {
            if (location.pathname.slice(-1) === '/' && location.pathname.length > 1) {
                location.pathname = location.pathname.substring(0, location.pathname.length - 1);
            }

            if (location.pathname !== '/') {
                history.push({
                    search: ``,
                    pathname: routerHistory.location.pathname
                });

                setSearchString('');
            } 
        });
    }, [routerHistory]);


    return(
        <>
            <Grid container className={classes.root}>
                <Grid item xs={7} xl={9} lg={9} md={9}>
                    <TextField
                    id="searchInput"
                    placeholder="Search"   
                    margin="normal"
                    onChange={handleSearchChange}
                    variant="outlined"
                    fullWidth
                    defaultValue={searchString}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            handleSearchPressed();
                        }
                    }}
                    />
                </Grid>
                <Grid item xs={2} xl={2} md={2} lg={2} style={{paddingTop: 20, paddingLeft: 2}}>
                    <SearchButton onClick={handleSearchPressed} />
                    { history.location.search
                        ? <ClearSearch onClick={handleClearSearch} />
                        : null
                    }
                </Grid>
                <Grid item xs={2} xl={1} md={1} lg={1} style={{paddingTop: 20}}>
                    <RefreshButton handleRefresh={props.causeReload} />
                </Grid>
            </Grid>
        </>
     )
}