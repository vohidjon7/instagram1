import { Schema, model } from "mongoose";

const postModel = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: Schema.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    postedBy1: {
        type: String,
        required: true,
        trim: true
    },
    post_img: {
        data: Buffer,
        contentType: String
    }
},
    { timestamps: true });

export default model('post', postModel)