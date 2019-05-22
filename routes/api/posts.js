const express = require('express');
const router = express.Router();
const Post = require(__dirname + '/../../models/Post');
const authenticateWithJWT = require(__dirname + '/../../services/jwt');

/* GET posts listing. */
const getPosts = (req, res, next) => {
    // if there's a user id in the query send posts for that user
    // else send posts from everyone
    const postOwnerQuery = req.query.user_id ? { author: req.query.user_id } : {};
    // find last 50 posts and sort by descending date
    Post.find(postOwnerQuery, null, {sort: { createdAt: -1 }, limit: 50 } , function (err, posts) {
        if (err) return handleError(err);

        // Populate posts with users through 'author':
        const promise = Post.populate(posts, [{ path: 'author' }]);
        promise.then((populatedPosts) => {
            res.json({ posts: populatedPosts })
        });
    })
  };

router.get('/', authenticateWithJWT, getPosts);

module.exports = router;
