const { Router } = require("express")
const profileRouter = new Router()
const {user, followees, recommendedUsers} = require("../utils/demoUserData")
const db = require("../models/queries")
const pool = require("../models/pool")

profileRouter.put("/", async(req,res)=>{
    console.log("received edit request")
    console.log(req.body)
    const {id, name, bio} = req.body
    await db.updateProfile(id,name,bio)
    console.log("writing in data in DB and redirect to home page")
    res.redirect('/api')
})




module.exports = profileRouter