import postModel from "../models/postModel.js";
import fs from 'fs'
export const createPostQuery = async (objs) => {
    try {
        const { text, img, userId,userName } = objs;
        let data = await postModel.create({
            text:text,
            postedBy: userId,
            postedBy1: userName
        });
        if (img) {
            data.post_img.data = fs.readFileSync(img.path);
            data.post_img.contentType = img.type;
        }
        data.save()
        return data.title;
    } catch (error) {
        console.log(error);
    }
}