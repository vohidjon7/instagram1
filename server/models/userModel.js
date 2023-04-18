import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    edit: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Number,
        default: 0
    },
    img: {
        data: Buffer,
        contentType: String
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],
}, { timestamps: true })

export default model('user', userModel)