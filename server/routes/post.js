import { Router } from 'express'
import { mustSingIn } from '../verify/authVerify.js';
import formidable from 'express-formidable';
import { postValidate } from '../validator/post.js';
import { addComment, createPost, deletePost, getPhoto, getPost, getUserPost, likePost, unLikePost } from '../controller/post.js';

const route = Router();

route.post('/create-post',formidable(),postValidate,mustSingIn,createPost)
route.get('/get-post',getPost)
route.get('/get-post-photo/:id', getPhoto)
route.put('/like-post',mustSingIn,likePost)
route.put('/unlike-post',mustSingIn,unLikePost)
route.put('/add-comment',mustSingIn,addComment)
route.get('/get-user-post/:id',getUserPost) 
route.delete('/delete-post/:id',deletePost) 

export default route;