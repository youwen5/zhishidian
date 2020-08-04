import axios from 'axios';
import moment from 'moment';
const config = require('./config.json');

export default async function queryItem(queryString, startId=0) {
    try {
        const params = new URLSearchParams({
            searchString: queryString,
            startId: startId
        });

        const url = `${config.api.invokeUrl}/posts/?${params.toString()}`;

        const response = await axios.get(url);

        response.data.forEach(post => {
            const timestamp = moment.unix(post.time).fromNow();

            post['pfColor'] = ['red', 'green', 'blue', 'cyan'][Math.floor(Math.random() * 4)];
            post.time = timestamp;
        });
        return response.data;
    } catch(error) {
        throw Error;
    }
}