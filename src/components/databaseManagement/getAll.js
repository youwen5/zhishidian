import axios from 'axios';
const config = require('./config.json');

export default async function getAll(startId=0) {
    try {
        const response = await axios.get(`${config.api.invokeUrl}/posts/${startId}`);
        response.data.forEach(post => {
            const unixEpoch = new Date(post.time);

            post['pfColor'] = ['red', 'green', 'blue', 'cyan'][Math.floor(Math.random() * 4)];
            post.time = unixEpoch.toLocaleDateString();
        })
        return response.data;
    } catch(error) {
        console.log(`Unexpected error occurred getting: ${error}`);
        throw Error;
    }
}