import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import { createPostQuery } from "../query/post.js";

export const createPost = async (req, res) => {
    try {
        const { text } = req.fields;
        const { img } = req.files;
        let user = await userModel.findById(req.user).select('-img');
        if (user) {
            let data = await createPostQuery({ text, img, userId: req.user, userName: user.name })
            res.json(data)
        } else {
            return res.status(403).json({ error: "User is not found" })
        }
    } catch (error) {
        console.log(error);
    }
}
export const getPost = async (req, res) => {
    try {
        const data = await postModel.find({}).select('-post_img')
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
export const getPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        let data = await postModel.findById(id).select('post_img')
        res.set("Content-Type", data.post_img.contentType)
        return res.send(data.post_img.data)
    } catch (error) {
        console.log(error.message);
    }
}
export const likePost = async (req, res) => {
    try {
        const { id } = req.fields;
        let data = await postModel.findByIdAndUpdate(id, {
            $push: { likes: req.user }
        }, { new: true })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
export const unLikePost = async (req, res) => {
    try {
        const { id } = req.fields;
        let data = await postModel.findByIdAndUpdate(id, {
            $pull: { likes: req.user }
        }, { new: true })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
export const addComment = async (req, res) => {
    try {
        const { id, text } = req.fields;
        let comment = {
            text,
            postedBy: req.user
        }
        let data = await postModel.findByIdAndUpdate(id, {
            $push: { comments: comment }
        }, { new: true })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
export const getUserPost = async (req, res) => {
    const { id } = req.params;
    try {
        let posts = await postModel.find({ postedBy: id }).select('-post_img');
        res.json(posts)
    } catch (error) {
        console.log(error.message);
    }
}
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await postModel.findByIdAndDelete(id)
        res.json({ msg: "Muvaffaqiyatli o`chirildi" })
    } catch (error) {
        console.log(error);
    }
}