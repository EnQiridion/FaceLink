const Post = require('../models/posts');

exports.createPost = async (req, res) => {
    try {
        const userId = req.params.userId || req.body.user;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const postData = {
            user: userId,
            text: req.body.text,
            likes: req.body.likes || 0
        };    
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
        res.status(201).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.getPostsById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user');
        if (!post) return res.status(404).json({ error: 'No Post was found!'});
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json ({ error: err.message});
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ meesage: 'The post has been deleted!'});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.getPostByUser = async (req, res) => {
    try {
        const post = await Post.find({ user: req.params.userId}).populate('user');
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

exports.aggregatePostByUser = async (req, res) => {
    try {
        const result = await Post.aggregate([
            {$group: {_id: "$user", totalPosts: { $sum: 1 }, totalPages: { $sum: "$pages"}}},
            {$lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'userInfo'}},
            {$unwind: '$userInfo'},
            {$project: { _id: 0, userId: '$_id', userName: '$userInfo.userName', totalPosts: 1, totalPages: 1}} 
        ]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};