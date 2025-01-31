const { Client } = require("pg")
const { defaultUser, demoUsers, demoPosts} = require('../utils/demoUserData')
require("dotenv").config();

const createUserList = `
CREATE TABLE IF NOT EXISTS users (
   userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR (255),
   password VARCHAR (255),
   accountname VARCHAR(255),
   avatar VARCHAR (255),
   bio VARCHAR (255),
   noOfFollowers INTEGER,
   noOfFollowees INTEGER, 
   isDemoUser BOOLEAN
);
`

const createPostList = `
    CREATE TABLE IF NOT EXISTS posts (
        postid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        accountname VARCHAR(255),
        image VARCHAR(255),
        description TEXT,
        noOfLikes INTEGER,
        postTime VARCHAR(255)
    )
`

const addUser = `
INSERT INTO users (accountname, avatar, bio, noOfFollowers, noOfFollowees, isDemoUser) 
VALUES ($1,$2,$3,$4,$5,$6)
`


const addPost = `
INSERT INTO posts (accountname, image, description, noOfLikes, postTime) 
VALUES ($1,$2,$3,$4,$5)
`


async function databaseInit(){
    console.log("seeding...");
    const client = new Client({
        user: "quangu",
        database: "instagram",
        password: "2684226",
    })

    await client.connect();
    await client.query(createUserList);
    await client.query(createPostList)
    console.log("user list and post list created")
    for (const user of demoUsers){
        await client.query(addUser,[
            user.userName,
            user.avatar,
            user.bio,
            user.noOfFollowers,
            user.noOfFollowees,
            user.isDemoUser
        ])
    }
    console.log('demo users added')

    for (const post of demoPosts){
        await client.query(addPost,[
            post.postetBy,
            post.image,
            post.description,
            post.noOfLikes,
            post.postTime
        ])
    }

    console.log('demo posts added')
    await client.end();
}

databaseInit()

module.exports = databaseInit
