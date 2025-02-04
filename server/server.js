// express app set up
const express = require("express")
const app = express();
const authRouter = require("./controllers/authRouter.js")
const passport = require("passport")
const cors = require('cors');
app.use(cors());


//middleware to parse URLs
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

// environment variables stored
require("dotenv").config();
const PORT = process.env.PORT || 3001;

// database connected 
const pool = require("./models/pool.js")
const db = require("./models/queries.js")

// set up and store session
const session = require("express-session")
const pgSession = require('connect-pg-simple')(session);
const sessionStore = new pgSession({
    pool: pool,
    tableName: "user_session",
    createTableIfMissing:true
})

// creates new session and fires session id to cookie
app.use(session({
    store: sessionStore,
    secret: "cats",
    resave: false,
    saveUninitialized:true,
    cookie: { secure: false, maxAge: 30 * 24 * 60 * 60 * 1000 }
}))

// require the entire passport verification config
app.use(passport.session());
require("./config/passport.js")


// direct requests to all routes
app.get("/api", (req,res)=>{
    res.json({message: "Server connected"})
})

// direct to profile router for edits

app.use("/account", authRouter)

// testing that api is valid
app.get("/test", (req,res)=>{
    res.send({message:"get request works"})
})

app.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`);
})