const { userUpdateQuery } = require("../query/userQuery");
const userModel = require('../models/users')

const userUpdateCtr = async (req,res)=>{
    try {
        const {name,email,password,user_img} = req.body

        let result = await userUpdateQuery({name,email},req.user)

        if(result.error){
            return res.json(result)
        }
    } catch (error) {
        console.log(error);
    }
}

const userDeleteCtr = async (req,res)=>{
    try {
        const {name,email,password,user_img} = req.body

        let result = await userUpdateQuery({name,email},req.user)

        if(result.error){
            return res.json(result)
        }
    } catch (error) {
        console.log(error);
    }
}

const userFindOneCtr = async (req,res)=>{
    try {
        const {name,email,password,user_img} = req.body

        let result = await userUpdateQuery({name,email},req.user)

        if(result.error){
            return res.json(result)
        }
    } catch (error) {
        console.log(error);
    }
}

const Follow = async (req, res) => {
    try {
      const { postId } = req.fields;
      let data = await userModel.findByIdAndUpdate(postId,{
        $push:{follow:req.user}
      },{new:true})
      res.json(data)
    } catch (error) {
      console.log(error);
    }
  };
  
  const unFollow = async (req, res) => {
    try {
      const { postId } = req.fields;
      let data = await userModel.findByIdAndUpdate(postId,{
        $pull:{follow:req.user}
      },{new:true})
      res.json(data)
    } catch (error) {
      console.log(error);
    }
  };


module.exports = {userUpdateCtr,userDeleteCtr,userFindOneCtr,Follow,unFollow}