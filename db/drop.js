const faker = require('faker');
const mongooseConnection = require('mongoose').connection;
require('dotenv').config();

// config db
require(__dirname + '/mongoose');

// register Models
const User = require(__dirname + '/../models/User');
const Post = require(__dirname + '/../models/Post');


// Start here!
// Find and delete all Posts:
Post.deleteMany({}, (ok, deletePostCount) => {
    console.log('deleted ' + deletePostCount + ' posts');
    // Then find and delete all Users:
    User.deleteMany({}, (ok, deleteUserCount) => {
        console.log('deleted ' + deleteUserCount + ' users');
        mongooseConnection.close();
    });
});

// If you get the error: 
// MongoError: E11000 duplicate key error collection
// try this after deleting and before seeding;
// Post.collection.dropIndex('imageUrl_1');


