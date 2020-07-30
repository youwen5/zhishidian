import axios from 'axios';
import moment from 'moment';
const config = require('./config.json');

export default async function queryItem(userid, startId=0) {
    try {
        const params = new URLSearchParams({
            startId: startId
        });

        const url = `${config.api.invokeUrl}/users/userposts/${userid}?${params.toString()}`;

        const response = await axios.get(url);

        response.data.forEach(post => {
            const timestamp = moment.unix(post.time).fromNow();

            // post['pfColor'] = ['red', 'green', 'blue', 'cyan'][Math.floor(Math.random() * 4)];
            post.time = timestamp;
        });
        return response.data;
    } catch(error) {
        console.log(`Unexpected error occurred querying: ${error}`);
        throw Error;
    }
}