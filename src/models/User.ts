import {model, Schema} from "mongoose";

let UserSchema: Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    username: {
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

export default model('Post', UserSchema);