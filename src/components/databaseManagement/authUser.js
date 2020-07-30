import axios from 'axios';
const config = require('./config.json');

export default async function authUser(username, password) {
    let authFailed = false;

    try {
        const params = new URLSearchParams({
            username: username,
            password: password
        });

        const UNAUTHORIZED = 401;
        axios.interceptors.response.use(
        response => response,
        error => {
            const {status} = error.response;
            if (status === UNAUTHORIZED) {
                authFailed = true;
            }
            return Promise.reject(error);
        }
        );

        const url = `${config.api.invokeUrl}/users/?${params.toString()}`;

        const res = await axios.get(url);

        return authFailed ? [{statusCode: 401}] : res.data;
    } catch(error) {
        if (authFailed) {
            return ([{statusCode: 401}]);
        } else {
            throw error;
        }
    }
}

// console.log(JSON.stringify(authUser('oofer', 'hubsanx4')));