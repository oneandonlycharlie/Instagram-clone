// express app set up
const express = require("express")
const app = express();
// const path = require("node:path");
const authRouter = require("./controllers/authRouter")
const passport = require("passport")
// const db = require("./models/queries")

//middleware to parse URLs
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// environment variables stored
// require("dotenv").config();
const PORT = process.env.PORT || 3001;

// database connected 
const bcrypt = require("bcryptjs")
const pool = require("./models/pool")

// set up and store session
const session = require("express-session")
const pgSession = require('connect-pg-simple')(session);
const sessionStore = new pgSession({
    pool: pool,
    tableName: "session"
})

// creates new session and fires session id to cookie
app.use(session({
    store: sessionStore,
    secret: "cats",
    resave: false,
    saveUninitialized:true,
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }
}))
app.use(passport.session());

// require the entire passport verification config
require("./config/passport")

// direct requests to all routes
app.get("/api",(req,res)=>{
    console.log(req.body)
    res.json({message: "Server connected"})
})
app.use("/account", authRouter)

app.listen(PORT, ()=>{
    console.log(`server listening at ${PORT}`)
})