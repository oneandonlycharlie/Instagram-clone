const {generateUsers, generatePosts} = require("./generateFakeUser.js");

const demoUsers = generateUsers(5);

let demoPosts = [];

demoUsers.map( user => {
    const posts = generatePosts(user.userName, 3);
    demoPosts.push(...posts)
})

module.exports = {demoUsers, demoPosts}
