import { Router } from 'express'
import formidable from 'express-formidable'
import { followUser, getPhoto, getUser, login, register, unFollowUser, update } from '../controller/user.js';
import { loginValidate, registerValidate, updateValidate } from '../validator/user.js';
import { mustSingIn } from '../verify/authVerify.js';

const route = Router();
route.post('/register',formidable(),registerValidate,register)
route.post('/login',formidable(),loginValidate,login)
route.put('/edit-profil',formidable(),updateValidate,mustSingIn,update)
route.get('/get-photo/:id',getPhoto)
route.get('/get-user/:id', getUser)
route.put('/follow-user', mustSingIn, followUser)
route.put('/unfollow-user', mustSingIn, unFollowUser)
export default route;