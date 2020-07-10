import React, { Fragment, Component } from 'react';
import { Grid, TextField } from '@material-ui/core';
import LinearIndeterminate from './LinearIndeterminate';
import Post from './Post';
import CreatePost from './CreatePost.js';
import getAll from './databaseManagement/getAll';

class Feed extends Component {
    state = {
        posts: [],
        searchString: ''
    }
    constructor() {
        super();
        this.getPosts();
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    getPosts = async () => {
        try {
            const response = await getAll();
            response.reverse();
            this.setState({ posts: response });
        } catch(error) {
            console.log(`An error occurred while displaying posts`);
        }
    }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
    }
    componentDidMount = () => {
        this.getPosts();
    }

    handleRefresh = () => {
        this.setState({ posts: [] });

        this.getPosts();
    }

    render() {
        return (
            <Fragment>
            <div>
                { this.state.posts && this.state.posts.length > 0 ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search"   
                            margin="normal"
                            onChange={this.onSearchInputChange}
                            variant="outlined"
                            />
                        <CreatePost refreshPage={this.handleRefresh} />
                        <Grid container spacing={4} style={{padding: 24}}>
                            { 
                                this.state.posts.map(currentPost => (
                                    (currentPost.title.toLowerCase().includes(this.state.searchString.toLowerCase())
                                    || currentPost.author.toLowerCase().includes(this.state.searchString.toLowerCase())
                                    || currentPost.content.toLowerCase().includes(this.state.searchString.toLowerCase()))
                                    ? <Grid item xs={12} sm={6} lg={4} xl={3}>
                                        <Post post = {
                                            {
                                                "title": currentPost.title,
                                                "author": currentPost.author,
                                                "content": currentPost.content
                                            }
                                        } />
                                    </Grid>
                                    : null
                                ))}
                        </Grid>
                    </div>
                ) : <div>
                        <LinearIndeterminate />
                    </div> }
            </div>
            </Fragment>
        )
    }
}

export default Feed;