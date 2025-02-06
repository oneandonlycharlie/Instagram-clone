const pool = require("./pool")
const bcrypt = require("bcryptjs")
const { generateDefaultUser } = require("../utils/generateFakeUser")


async function getAllPosts(){
    const { rows } = await pool.query("SELECT * FROM posts");
    return rows
}

async function getDemoUsers(){
    const { rows } = await pool.query('SELECT * FROM users WHERE isDemoUser = $1',[true]);
    return rows
}

async function getAllComments(){
    const { rows } = await pool.query('SELECT * FROM comments')
    return rows
}

// create user and store encoded password
const addNewUser = `
INSERT INTO users (login_name, password, username, avatar, bio, noOfFollowers, noOfFollowees, isDemoUser) 
VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
`

async function createUser(userName, password) {
    console.log("db connected")
    const loginName = userName;
    const newUser = generateDefaultUser();
    bcrypt.hash(password, 10, async(err, hashedPassword)=>{
        await pool.query(addNewUser, [
            loginName, 
            hashedPassword,
            newUser.userName,
            newUser.avatar,
            newUser.bio,
            newUser.noOfFollowers,
            newUser.noOfFollowees,
            newUser.isDemoUser
        ])
    })
    console.log("sign-up success")
    // const { rows } = await pool.query('SELECT * FROM users')
    // console.log(rows)
}

async function like(id){
    const command = `
        UPDATE posts
        SET noOfLikes = noOfLikes + 1
        WHERE postid = $1
        `
    await pool.query(command,[id])
}

async function addComment(postid,comment,username){
    const command = `
        INSERT INTO comments (matchid, comment, commentby)
        VALUES ($1,$2,$3)
    `
    await pool.query(command,[postid,comment,username])
}

async function addPost(post){
    const addPost = `
        INSERT INTO posts (username, image, description, noOfLikes, postTime) 
        VALUES ($1,$2,$3,$4,$5)
        `
    await pool.query(addPost,[
            post.postedBy,
            post.image,
            post.description,
            post.noOfLikes,
            post.postTime
        ])
        console.log("post logged")
}

module.exports = {
    getAllPosts,
    createUser,
    getDemoUsers,
    getAllComments,
    like,
    addComment,
    addPost
}