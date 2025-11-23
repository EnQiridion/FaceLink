const express = require('express');
const router = express.Router();
const postController = require('../controllers/postcontroller');


router.post('/posts', postController.createPost);
router.post('/users/:userId/posts', postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPostsById);
router.get('/users/:id/posts', postController.getPostByUser);
router.post('/posts/:post_id/like', postController.likePost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.get('/posts/aggregate/by-user', postController.aggregatePostByUser);
router.get('/posts/aggregate/most-liked', postController.getMostLikedPosts);


module.exports = router;
