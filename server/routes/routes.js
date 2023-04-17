import { Router } from "express";
import user from './user.js'
import post from './post.js'
const route = Router();
route.use("/api", user)
route.use("/api", post)
export default route;