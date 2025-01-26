const {generateUsers} = require("./generateFakeUser.js");

const user = generateUsers(1);

const followees = generateUsers(5);

const recommendedUsers = generateUsers(5);

module.exports = { user,followees,recommendedUsers }
