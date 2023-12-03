const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    // username, hash and salt are injected by passport local mongoose.
    email: {
        type: String
    },
    role: {
        type: String,
        enum: ['seller','buyer', 'admin']
    }
},{versionKey: false, timestamps: true});

userSchema.plugin(passportLocalMongoose);

const User = model('User', userSchema);

module.exports = User;

