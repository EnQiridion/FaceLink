const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {type: String, rqeuired: true, unique: true},
    email: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('User', UserSchema);