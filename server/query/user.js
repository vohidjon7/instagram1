import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import fs from 'fs'

export const registerQuery = async (objs) => {
    try {
        const { name, email, password, login } = objs;
        console.log(objs);
        let user = await userModel.findOne({ email })
        if (user) {
            return { error: "This user email is already exist" }
        }
        let hash = await new Promise((resolve, reject) => {
            bcrypt.genSalt(12, (err, salt) => {
                if (err) console.log(err);
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(hash)
                    }
                })
            })
        })
        const data = await userModel.create({
            name,
            login,
            email,
            password: hash
        });
        let token = await jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token: token, data: { name: data?.name, email: data?.email, login: data?.login, followers: data?.followers, _id: data?._id, edit: data?.edit } }
    } catch (error) {
        console.log(error);
    }
}
export const loginQuery = async (objs) => {
    try {
        const { login, password } = objs;
        let data = await userModel.findOne({ login });
        if (!data) {
            return { error: "Login is not found" }
        }
        let isCorrect = bcrypt.compare(password, data.password)
        if (!isCorrect) {
            return { error: "Password is not match" }
        }
        let token = await jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token: token, data: { name: data?.name, email: data?.email, login: data?.login, followers: data?.followers, _id: data?._id, edit: data?.edit } }
    } catch (error) {
        console.log(error);
    }
}
export const updateQuery = async (objs, id) => {
    console.log(id);
    try {
        const { name, email, img, login } = objs;

        let user = await userModel.findById(id);
        if (!user) {
            return {
                error: "This user is not defined",
            };
        }
        let data = await userModel.findByIdAndUpdate(
            id,
            {
                name: name ? name : user.name,
                email: email ? email : user.email,
                login: login ? login : user.user,
                password: user.password,
                edit: "1"
            },
            { new: true }
        );
        if (img) {
            data.img.data = fs.readFileSync(img.path);
            data.img.contentType = img.type;
        }
        data.save();
        let token = await jwt.sign({ _id: id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token: token, data: { name: data?.name, email: data?.email, login: data?.login, followers: data?.followers, _id: data?._id, edit: data?.edit } }
    } catch (error) {
        console.log(error);
    }
};
