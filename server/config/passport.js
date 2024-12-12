// database connected 
const bcrypt = require("bcryptjs")
const db = require("../models/queries")
const pool = require("../models/pool")


// initialize passport middleware
const passport  = require("passport")
const LocalStrategy = require("passport-local").Strategy

const customFields = {
    usernameField: "email",
    passwordField: "password"
}

const verifyCallBack = async(username, password, done)=>{
    try {
        const { rows } = await pool.query("SELECT * FROM users_test WHERE username = $1", [username]);
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!user){
            return done(null, false, {message: "Incorrect username"})
        }
        if (!passwordMatch){
            return done(null, false, {message: "Incorrect password"})
        }
        return done(null, user)
    } catch(err){
        return done(err);
    }
}

const strategy = new LocalStrategy(customFields, verifyCallBack)

//This calls the auth strategy when we use the passport.authenticate()
passport.use(strategy);

// This stores user id in request session
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async(id,done)=>{
    try {
        const { rows } = await pool.query("SELECT * FROM users_test WHERE id = $1", [id]);
        const user = rows[0];
        done(null, user);
    } catch(err) {
        done(err);
  }
})
