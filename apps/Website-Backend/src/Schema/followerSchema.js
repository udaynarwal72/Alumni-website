import { Schema,model } from "mongoose";

const FollowSchema = Schema({
    user_following: {
        type: Schema.Types.ObjectId,
        ref: 'AlumniUser',
        required: true,
    },
    user_to_be_followed: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const Follow = model('Follow', FollowSchema);

export default Follow;