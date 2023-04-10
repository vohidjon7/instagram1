const {authValidate, authValidateLogin} = require('../validator/authValidator')
const {userPostQuery,userLoginQuery} = require('../query/userQuery')

const register = async(req,res)=>{
    try {
        const {name,email,password} = req.fields;
        let result = await authValidate({name,email,password});
        if(result != true ){
            return res.status(400).json(result)
        }
        let data = await userPostQuery({name,email,password})
        res.json(data) 
    } catch (error) {   
        console.log(error);
    }
}

const login = async(req,res)=>{
    try {
        const {email,password} = req.fields;
        console.log(email);
        let result = await authValidateLogin({email,password});
        if(result != true ){
            return res.status(400).json(result)
        }
        let data = await userLoginQuery({email,password})
        res.json(data) 
    } catch (error) {   
        console.log(error);
    }
}


module.exports = {register,login}