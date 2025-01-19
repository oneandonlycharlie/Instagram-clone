import {generateUsers} from "./generateFakeUser";

const user = generateUsers(1);

const followees = generateUsers(5);

const recommendedUsers = generateUsers(5);

export {user,followees,recommendedUsers}
