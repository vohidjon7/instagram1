import userModel from "../models/userModel.js";
import { loginQuery, registerQuery, updateQuery } from "../query/user.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, login } = req.fields;
        let data = await registerQuery({ name, email, password, login })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { login, password } = req.fields;
        let data = await loginQuery({ login, password })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
export const update = async (req, res) => {
    try {
        const { name, email, login } = req.fields;
        const { img } = req.files;

        let result = await updateQuery({ name, email, img, login }, req.user)
        if (result.error) {
            return res.json(result)
        } else {
            return res.json(result)
        }
    } catch (error) {
        console.log(error);
    }
}
export const getPhoto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        let data = await userModel.findById(id).select('img')
        res.set("Content-Type", data.img.contentType)
        return res.send(data.img.data)
    } catch (error) {
        console.log(error.message);
    }
}
export const getUser = async (req, res) => {
    const { id } = req.params
    try {
        let user = await userModel.findById(id).select('-img');
        console.log(user);
        res.json(user)
    } catch (error) {
        console.log(error.message);
    }
}
export const followUser = async (req, res) => {
    try {
        const { id } = req.fields;
        let data = await userModel.findByIdAndUpdate(id, {
            $push: { followers: req.user }
        }, { new: true })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
export const unFollowUser = async (req, res) => {
    try {
        const { id } = req.fields;
        let data = await userModel.findByIdAndUpdate(id, {
            $pull: { followers: req.user }
        }, { new: true })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}