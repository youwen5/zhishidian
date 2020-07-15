import axios from 'axios';
const config = require('./config.json');

export default async function getAll(startId=0) {
    try {
        const response = await axios.get(`${config.api.invokeUrl}/posts/${startId}`);
        // return sortArrayByISO(response.data);
        return response.data;
    } catch(error) {
        console.log(`Unexpected error occurred posting: ${error}`);
    }
}