import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Post from './Post';
import axios from 'axios';
const config = require('../config.json');

class Feed extends Component {
    state = {
        posts: [],
        searchString: ''
    }
    constructor() {
        super();
        this.getPosts();
    }
    getPosts = async () => {
        try {
            const response = await axios.get(`${config.api.invokeUrl}/posts`);
            this.setState({ posts: response.data });
            console.log(this.state.posts);
        } catch(err) {
            console.log(`An error has occurred ${err}`);
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
                            />
                        <Grid container spacing={4} style={{padding: 24}}>
                            { 
                                this.state.posts.map(currentPost => (
                                    (currentPost.title.includes(this.state.searchString)
                                    || currentPost.author.includes(this.state.searchString)
                                    || currentPost.content.includes(this.state.searchString))
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
                ) : "No courses found" }
            </div>
            </Fragment>
        )
    }
}

export default Feed;