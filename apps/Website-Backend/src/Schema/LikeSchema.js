const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    count: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Like', likeSchema);
