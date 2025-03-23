const { Router } = require("express")
const router = new Router()
const db = require("../models/queries.js")
const passport = require("passport")
const profileRouter = require("./profileRouter.js")
const postRouter = require("./postRouter.js")

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
    // console.log('current user is',req.user, 'authentication is', req.isAuthenticated())
    if (req.isAuthenticated()){
        let data = {
            user:req.user,
            demoUsers:await db.getDemoUsers(),
            posts:await db.getAllPosts(),
            comments: await db.getAllComments()
        };
        res.json({
            message:'Log in successful', 
            isAuthenticated:req.isAuthenticated(),
            data
            })
    } else {
        res.json({message: 'failed to log in, try again'})
    }
})

router.put("/user", async(req,res)=>{
    console.log('directing you to user page..')
    if (req.isAuthenticated()){
        let data = {
            user:req.user,
            demoUsers:await db.getDemoUsers(),
            posts:await db.getAllPosts(),
            comments: await db.getAllComments()
        };
        res.json({
            message:'User data updated', 
            isAuthenticated:req.isAuthenticated(),
            data
            })
    } else {
        res.json({message: 'failed to log in, try again'})
    }
})

//handle log out
router.get("/logout", (req,res,next)=>{
    req.logout((err)=>{
        if (err){
            return next(err)
        }
    })
    console.log("log out success", req.isAuthenticated())
    res.json(req.isAuthenticated())
})

// direct to post router to handle user actions
router.use("/post",postRouter)


// direct to profile router for edits
router.use("/profile", profileRouter)

module.exports = router