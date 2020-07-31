import axios from 'axios';
const config = require('./config.json');

export default async function createUser(username, password, firstName, lastName, userType, profileColor, bio, captchaToken) {
    try {
        const params = {
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "userType": userType,
            "profileColor": profileColor,
            "bio": bio,
            "captchaToken": captchaToken
        }

        const url = `${config.api.invokeUrl}/users`;

        const response = await axios.post(url, params);

        if (response.status.toString()[0] !== '2') {
            console.log(`Error ${response.status} occurred`);
            // throw Error;
        } 

        return response.data;
    } catch(error) {
        console.log(`Error occurred posting: ${error}`);
        throw Error;
    }
}