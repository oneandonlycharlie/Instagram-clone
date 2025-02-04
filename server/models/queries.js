const pool = require("./pool")
const bcrypt = require("bcryptjs")
const { generateDefaultUser } = require("../utils/generateFakeUser")

const getAllUsers ="SELECT * FROM users"

async function getAllPosts(){
    const { rows } = await pool.query("SELECT * FROM posts")
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


module.exports = {
    getAllUsers,
    getAllPosts,
    createUser,
}