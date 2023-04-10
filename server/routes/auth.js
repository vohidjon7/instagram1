const {Router} = require('express');
const userModel = require('../models/users')
const ExpressFormidable = require('express-formidable');
const { mustAdmin, mustSignIn } = require('../auth/verifyAuth');
const route = Router()
const {register,login} = require('../ctr/auth');
const { userUpdateCtr, Follow, unFollow } = require('../ctr/user');
const { updateUserValidate } = require('../validator/userValidator')

route.post("/register",ExpressFormidable(),register)
route.post("/login",login)

// route.get("/adminRoute",mustAdmin,async(req,res)=>{
//     let user  = await userModel.findById(req.user);
//     if(user.isAdmin != true){
//         return res.json({
//             error:"you are not admin"
//         })
//     }
//     res.json({user:req.user})
// })

route.patch("/update-user",updateUserValidate,mustSignIn,userUpdateCtr)
route.get('/check-user',mustSignIn,async(req,res)=>{
    let user = await userModel.findById(req.user)
    res.status(200).json(user)
})

route.get('/check-users',mustSignIn,async(req,res)=>{
    let users = await userModel.find({},res.user)
    res.status(200).json(users)
})

route.put("/follow", mustSignIn, Follow);
route.put("/un-follow", mustSignIn, unFollow);


// route.patch("/delete-user",updateUserValidate,mustSignIn,userUpdateCtr)
// route.get("/user/:userId",updateUserValidate,mustSignIn,userUpdateCtr)


module.exports = route