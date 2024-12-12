const { Router } = require("express")
const router = new Router()
const bcrypt = require("bcryptjs")
const db = require("../models/queries")
const passport = require("passport")

require("../config/passport");

//enable sign up and create new user in db
router.post("/signup", (req,res)=>{
    console.log("response received! Signing up..")
    console.log(req.body)
    try {
            db.createUser(req.body.email, req.body.password);
            res.send();
    } catch(err){
        return next(err)
    } 
})

// handle log in requestcd
router.get("/login", (req,res)=>{
    console.log("receving get request at /login")
    res.json({message: 'receving get request at /login'})
})

router.post("/login",  passport.authenticate("local"), (req,res)=>{
    console.log(req.user)
    console.log(req.session)
    console.log("logging in..");
    res.send();
})

//TODO add log out route

module.exports = router