const express = require("express")
const app = express();
const {Pool} = require("pg");
const path = require("node:path");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const passport  = require("passport")
const LocalStrategy = require("passport-local").Strategy
const main = require("./models/dbinitialize")
const bcrypt = require("bcryptjs")


const pool = new Pool({
  database: "users"
});

//middleware to ensure URLs are parsed.
app.use(express.urlencoded({ extended: false }));

//This calls the auth strategy when we use the passport.authenticate()
passport.use(
  new LocalStrategy(async (username, password, done)=>{
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
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


// app.post("/api", async(req,res,next)=>{
//   try {
//     console.log("db created")
//     bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
//   // if err, do something
//   // otherwise, store hashedPassword in DB
//     await pool.query("INSERT INTO users (username, password) VALUES($1,$2)", [req.body.username, hashedPassword]);
//     });
//     console.log("sign-up success")
//     res.redirect("/")
//   } catch(err){
//    return next(err)
//   }
// })

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



app.get("/api",(req,res)=>{
    res.json({message: "Server connected"})
})

app.post("/api", (req,res)=>{
    // console.log("response received! Logging..")
    console.log(req.body)
    res.send()
})


app.listen(PORT, ()=>{
    console.log(`server listening at ${PORT}`)
})