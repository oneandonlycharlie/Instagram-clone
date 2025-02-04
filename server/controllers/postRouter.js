const { Router } = require("express")
const postRouter = new Router()
const db = require("../models/queries")



postRouter.post("/like", async(req,res)=>{
    console.log("adding one like for you..")
    console.log(req.body.postid)
    await db.like(req.body.postid)
    res.redirect("/account/user")
})




module.exports = postRouter