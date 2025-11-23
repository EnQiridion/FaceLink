const Post = require('../models/posts');

exports.createPost = async (req, res) => {
    try {
        console.log('URL params:', req.params);
        console.log('Body:', req.body);
        
        const userId = req.params.userId || req.body.user;
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const postData = {
            user: userId,
            text: req.body.text,
            likes: req.body.likes || 0
        };
        
        console.log('Creating post with data:', postData);
        
        const newPost = new Post(postData);
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: err.message});
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.getPostsById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        if (!post) return res.status(404).json({ error: 'No Post was found!'});
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json ({ error: err.message});
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found'});
        res.status(200).json({ message: 'Post deleted successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


exports.getPostByUser = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.id}).populate('user');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


exports.likePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.post_id,
            { $inc: { likes: 1 } }, 
            { new: true }
        ).populate('user');
        
        if (!post) return res.status(404).json({ error: 'Post not found'});
        
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


exports.aggregatePostByUser = async (req, res) => {
    try {
        const result = await Post.aggregate([
            {$group: {_id: "$user", totalPosts: { $sum: 1 }}},
            {$lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userInfo'}},
            {$unwind: '$userInfo'},
            {$project: { _id: 0, userId: '$_id', name: '$userInfo.name', email: '$userInfo.email', totalPosts: 1}},
            {$sort: { totalPosts: -1 }}
        ]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};


exports.getMostLikedPosts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5; 
        
        const result = await Post.aggregate([
            {$sort: { likes: -1 }},
            {$limit: limit},
            {$lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'userInfo'}},
            {$unwind: '$userInfo'},
            {$project: { 
                _id: 1, 
                text: 1, 
                likes: 1, 
                timeStamp: 1,
                userName: '$userInfo.name',
                userEmail: '$userInfo.email'
            }}
        ]);
        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};
