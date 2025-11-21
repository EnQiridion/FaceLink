const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now},
    likes: {type: Number, default: 0}
});
module.exports = mongoose.model('Post', PostSchema);