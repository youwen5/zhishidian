import axios from 'axios';
const config = require('./config.json');

const sortArrayByISO = (array) => {
    return array.sort((a, b) => {
        return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0);
    });
}

export default async function getAll() {
    try {
        const response = await axios.get(`${config.api.invokeUrl}/posts`);
        // return sortArrayByISO(response.data);
        return response.data;
    } catch(error) {
        console.log(`Unexpected error occurred posting: ${error}`);
    }
}