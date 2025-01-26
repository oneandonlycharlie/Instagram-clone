const { Router } = require("express")
const profileRouter = new Router()
const {user, followees, recommendedUsers} = require("../utils/userData")


profileRouter.post("/", (req,res)=>{
    console.log("received edit request")
    console.log(req.body)
    console.log("writing in data in DB and redirect to home page")
    res.redirect('/api')
})




module.exports = profileRouter