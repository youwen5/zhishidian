import axios from 'axios';
const config = require('./config.json');

export default async function postItem(title, author, content) {
    try {
        const timeNow = new Date().toISOString();
        const params = {
            "createdAt": timeNow,
            "title": title,
            "author": author,
            "content": content,
        };
        await axios.post(`${config.api.invokeUrl}/posts/${title}`, params);
    } catch(error) {
        console.log(`Error occurred posting: ${error}`);
    }
}