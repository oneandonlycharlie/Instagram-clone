const pool = require("./pool")
const bcrypt = require("bcryptjs")

async function getAllUsers() {
    console.log("db connected")
    const { rows } = await pool.query("SELECT * FROM users_test")
    console.log(rows)
}

// create user and store encoded password
async function createUser(email, password) {
    console.log("db connected")
    bcrypt.hash(password, 10, async(err, hashedPassword)=>{
        await pool.query("INSERT INTO users_test(username, password) VALUES ($1, $2)", [email, hashedPassword])
    })
    console.log("sign-up success")
}

async function validateUser(email, password) {
    
}


module.exports = {
    getAllUsers,
    createUser,
}