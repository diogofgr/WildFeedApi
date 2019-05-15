const express = require('express');
const router = express.Router();
const ta = require('time-ago')
const Post = require(__dirname + '/../models/Post');

/* GET posts listing. */
router.get('/', function(req, res, next) {
    // find last 50 posts and sort by descending date
    Post.find({}, null, {sort: { createdAt: -1 }, limit: 50 } , function (err, posts) {
    console.log(posts[0]);
    if (err) return handleError(err);
        if (!req.user) {
            res.redirect('/auth/facebook')
        }

        // Populate posts with users through 'author':
        const promise = Post.populate(posts, [{ path: 'author' }]);
        promise.then((populatedPosts) => {
            console.log(populatedPosts[0]);
            res.render('posts', { posts: populatedPosts, ta })
        });
    })
  });

/* empty new-post form */
router.get('/new', function(req, res, next) {
    res.render('new-post', { redirect: req.originalUrl, user: req.user });
});

/* new post submitted */
router.post('/new', function(req, res, next) {
    if (!req.user) {
        res.redirect('/auth/facebook');
    } else {
        const post = new Post({
            author: req.user._id,
            imageUrl: req.body.imageUrl,
            caption: req.body.caption,
        });
        post.save(function(err) {
            if (err) console.log(err);
            res.redirect('/posts')
        });
    }
});



module.exports = router;
