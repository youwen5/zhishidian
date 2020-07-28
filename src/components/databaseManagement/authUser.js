import axios from 'axios';
const config = require('./config.json');

export default async function authUser(username, password) {
    try {
        const params = new URLSearchParams({
            username: username,
            password: password
        });

        const url = `${config.api.invokeUrl}/users/?${params.toString()}`;

        const response = await axios.get(url);

        return response.data;
    } catch(error) {
        console.log(`Unexpected error occurred querying: ${error}`);
        throw Error;
    }
}

// console.log(JSON.stringify(authUser('oofer', 'hubsanx4')));