import axios from 'axios';
const config = require('./config.json');

export default async function queryItem(queryString, startId=0) {
    try {
        const params = new URLSearchParams({
            searchString: queryString,
            startId: startId
        });

        const url = `${config.api.invokeUrl}/posts?${params.toString()}`;

        const response = await axios.get(url);

        response.data.forEach(post => {
            const unixEpoch = new Date(post.time);

            post['pfColor'] = ['red', 'green', 'blue', 'cyan'][Math.floor(Math.random() * 4)];
            post.time = unixEpoch.toLocaleDateString();
        });
        console.log(response.data);
        return response.data;
    } catch(error) {
        console.log(`Unexpected error occurred querying: ${error}`);
        throw Error;
    }
}