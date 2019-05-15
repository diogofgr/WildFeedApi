const mongoose = require('mongoose');
const faker = require('faker');

const userSchema = new mongoose.Schema({
    facebookId: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        default: faker.internet.userName()
    },
    displayName: String,
    avatar: String    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;