import jwt from 'jsonwebtoken'
export const mustSingIn = async(req,res,next)=>{
    try { 
        const {authorization} = req.headers;
        let decode = await jwt.verify(authorization,process.env.JWT_SECRET)
        req.user = decode._id
        console.log("decode=>",decode._id);
        next()
    } catch (error) {
        console.log(error);
    }   
}