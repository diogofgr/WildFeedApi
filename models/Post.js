const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    imageUrl: {
        type: String,
        unique: false,
        required: true,
    },
    caption: {
        type: String,
        maxlength: 140
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;