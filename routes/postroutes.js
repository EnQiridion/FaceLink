const express = require('express');
const router = express.Router();
const postController = require('../controllers/postcontroller');

router.post('/users/:userId/posts', postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/posts/aggregate', postController.aggregatePostByUser);
router.get('/posts/:id', postController.getPostsById);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);


module.exports = router;