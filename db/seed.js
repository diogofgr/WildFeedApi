const faker = require('faker');
const mongooseConnection = require('mongoose').connection;
require('dotenv').config();

// config db
require(__dirname + '/mongoose');

// register Models
const User = require(__dirname + '/../models/User');
const Post = require(__dirname + '/../models/Post');

const generateUsers = (arr) => arr.map(() =>
    new User({
        facebookId: faker.finance.bitcoinAddress(),
        username: faker.internet.userName(),
        displayName: `${faker.name.firstName()} ${faker.name.lastName()}`,
        avatar: faker.internet.avatar()
    }));

const generatePosts = (arr) => arr.map(() => {
    return {
            imageUrl: faker.internet.avatar(),
            caption: faker.lorem.sentence()
        };
})

const sampleUsers = generateUsers([1, 2, 3]);
const samplePosts = generatePosts([1, 2, 3]);

// Create some posts for a given user:
const createPosts = (user, isLastUser= false) => {
    samplePosts.map((p, i) => {
        const isLastPost = i === samplePosts.length - 1;

        newPost = new Post({
            ...p,
            author: user
        })
        newPost.save(function(err) {
            if (err) console.log(err);
            console.log('created post: ', newPost);

            // close db connection if it's the
            // last post of the last user:
            if (isLastUser && isLastPost) {
                console.log('close connection');
                mongooseConnection.close();
            };
        });
    });
    
}

// Create some users with some posts each:
const createUsers = () => {
    sampleUsers.map((u, i) => {
        u.save(function(err, savedUser) {
            if (err) console.log(err);
            console.log('created user: ', savedUser);
            // create posts and request to close connection after last User:
            createPosts(savedUser, i === sampleUsers.length - 1);
        });
    })
}

// Start here!
// Find and delete all Posts:
Post.deleteMany({}, (ok, deletePostCount) => {
    console.log('deleted ' + deletePostCount + ' posts');
    // Then find and delete all Users:
    User.deleteMany({}, (ok, deleteUserCount) => {
        console.log('deleted ' + deleteUserCount + ' users');
        // then create users:
        // (inside createUsers() some posts will be created)
        createUsers();
    });
});

// If you get the error: 
// MongoError: E11000 duplicate key error collection
// try this after deleting and before seeding;
// Post.collection.dropIndex('imageUrl_1');


