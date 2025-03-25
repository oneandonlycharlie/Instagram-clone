const { Client } = require("pg")
const { defaultUser, demoUsers, demoPosts} = require('../utils/demoUserData')
require("dotenv").config();

const createUserList = `
CREATE TABLE IF NOT EXISTS users (
   userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   login_name VARCHAR (255),
   password VARCHAR (255),
   username VARCHAR(255),
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
        username VARCHAR(255),
        image VARCHAR(255),
        description TEXT,
        noOfLikes INTEGER,
        postTime VARCHAR(255)
    )
`
const createCommentList =  `
    CREATE TABLE IF NOT EXISTS comments (
        commentid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        comment VARCHAR(255),
        commentby VARCHAR(255),
        matchid INTEGER
    )
`

const addUser = `
INSERT INTO users (login_name, password, username, avatar, bio, noOfFollowers, noOfFollowees, isDemoUser) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
`


const addPost = `
INSERT INTO posts (username, image, description, noOfLikes, postTime) 
VALUES ($1,$2,$3,$4,$5)
`


async function databaseInit(){
    console.log("seeding...");
    const client = new Client({
        host: process.env.HOST,
        user: process.env.USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DBPWD,
    })

    await client.connect();
    await client.query(createUserList);
    await client.query(createPostList);
    await client.query(createCommentList);
    console.log("user list, post list and comment list created")
    for (const user of demoUsers){
        await client.query(addUser,[
            user.loginName,
            user.password,
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
        console.log(post)
        await client.query(addPost,[
            post.postedBy,
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
