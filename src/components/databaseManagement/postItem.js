import axios from 'axios';
const config = require('./config.json');

export default async function postItem(title, author, content, userid) {
    try {
        const params = {
            "title": title,
            "author": author,
            "content": content,
            "user_id": userid
        };
        await axios.post(`${config.api.invokeUrl}/posts/${title}`, params);
    } catch(error) {
        console.log(`Error occurred posting: ${error}`);
        throw Error;
    }
}