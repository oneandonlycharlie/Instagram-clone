const { Router } = require("express")
const router = new Router()
const db = require("../models/queries.js")
const passport = require("passport")
const profileRouter = require("./profileRouter.js")

require("../config/passport.js");


//enable sign up and create new user in db
router.post("/signup", (req,res)=>{
    console.log("response received! Signing up..")
    console.log(req.body)
    try {
            db.createUser(req.body.userName, req.body.password);
            res.send({massage:'sign up success'});
    } catch(err){
        return next(err)
    } 
})

// handle log in request and verification

router.post("/login", 
    // Redirect on failure   
    passport.authenticate("local", {failureRedirect: '/account/failure' }),
    (req,res)=>{
        // console.log(req.session)
        // console.log(req.isAuthenticated())
        res.redirect("/account/user")
    }
)

router.get("/failure", (req,res)=>{
    console.log("failed to log in, try again")
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.json({message: 'failed to log in, try again'})
})

router.get("/user", async(req,res)=>{
    console.log('directing you to user page..')
    console.log(req.user)
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()){
        let data = {
            user:req.user,
            demoUsers:await db.getDemoUsers(),
            posts:await db.getAllPosts()
        };

        res.json({
            message:'Log in successful', 
            data
            })
    } else {
        res.json({message: 'failed to log in, try again'})
    }
})

//TODO add log out route
router.get("/logout", (req,res,next)=>{
    req.logout((err)=>{
        if (err){
            return next(err)
        }
        // do something here. 
    })
    res.send()
})

// add authentification to all protected routes.


// direct to profile router for edits
router.use("/profile", profileRouter)

module.exports = router