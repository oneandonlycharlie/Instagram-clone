const express = require("express")
const app = express();
const path = require("node:path");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const passport  = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs")
const db = require("./models/queries")

//middleware to ensure URLs are parsed.
app.use(express.urlencoded({ extended: false }));
app.use(express.json())


//This calls the auth strategy when we use the passport.authenticate()
passport.use(
  new LocalStrategy(async (username, password, done)=>{
      try {
        const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        console.log(rows)
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!user){
          return done(null,false, {message:"Incorrect username"})
        }
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch(err) {
        return done(err);
    }
  })
)


// app.post(
//   "/log-in",
//   passport.authenticate("local",{
//     successRedirect:"/",
//     failureRedirect:"/",
//     failureMessage:true
//   })
// )

// app.get("/log-out", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });


// set up connection with React
app.get("/api",(req,res)=>{
    res.json({message: "Server connected"})
})
app.get("/api/login", (req,res)=>{
    console.log("receving get request at /login")
})

//enable sign up and create new user in db
app.post("/api", (req,res)=>{
    console.log("response received! Logging..")
    try {
        bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
            db.createUser(req.body.email, hashedPassword);
        });
        res.send();
    } catch(err){
        return next(err)
    } 
})
app.post("/api/login", (req,res)=>{
    console.log("logging in..")
    console.log(req.body)
    res.end()
})

app.listen(PORT, ()=>{
    console.log(`server listening at ${PORT}`)
})