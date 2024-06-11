const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
