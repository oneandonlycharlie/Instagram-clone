const { Router } = require("express")
const postRouter = new Router()
const db = require("../models/queries")



postRouter.put("/like", async(req,res)=>{
    console.log("adding one like for you..")
    console.log(req.body.postid)
    await db.like(req.body.postid)
    res.redirect("/account/user")
})

postRouter.post("/comment",async(req,res)=>{
    console.log(req.body)
    console.log(req.user.username)
    await db.addComment(req.body.postid, req.body.comment, req.user.username)
    console.log('Comment success')
    res.redirect("/account/user")
})

postRouter.post("/share",async(req,res)=>{
    console.log(req.body)
    console.log(req.user.username)
    const post = {
        ...req.body.post,
        postedBy:req.user.username
    }
    await db.addPost(post)
    res.redirect("/account/user")
})

module.exports = postRouter