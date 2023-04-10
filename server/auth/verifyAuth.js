const jwt = require('jsonwebtoken')
const mustSignIn = async(req,res,next)=>{
    try {
        const {authorization} = req.headers
        let decoded = await jwt.verify(authorization,process.env.JWT_SECRET)
        req.user = decoded._id
        next()
        
    } catch (error) {
        console.log(error);
    }
}

const mustAdmin = async(req,res,next)=>{
    try {
        const {authorization} = req.headers
        let decoded = await jwt.verify(authorization,process.env.JWT_SECRET)
        if(!decoded.isAdmin){
            return res.status(401).json({error:"You are not admin"})
        }
        req.user = decoded._id
        next()
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {mustSignIn,mustAdmin}