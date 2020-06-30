import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Post from './Post';

class Feed extends Component {
    state = {
        posts: [],
        searchString: ''
    }
    constructor() {
        super();
        this.getCourses();
    }
    getCourses = () => {
        // put stuff here
    }
    // onSearchInputChange = (event) => {
    //     console.log(`search input changed: ${event.target.value}`))
    // }
    render() {
        return (
            <Fragment>
            <div>
                { this.state.posts ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search"   
                            margin="normal"
                            onChange={this.onSearchInputChange}
                            />
                        <Grid container spacing={4} style={{padding: 24}}>
                            { this.state.posts.map(currentPost => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Post post={currentPost} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
                )}
            </div>
            </Fragment>
        )
    }
}

export default Feed;