import axios from 'axios';
import moment from 'moment';

const config = require('./config.json');

export default async function getUserDetails(username) {
    try {
        const url = `${config.api.invokeUrl}/users/${username}`;

        const response = await axios.get(url);
        const timestamp = moment.unix(response.data[0]['UNIX_TIMESTAMP(creation_date)']);
        response.data[0].time = timestamp;

        return response.data;
    } catch(error) {
        return [{statusCode: 404}];
    }
}