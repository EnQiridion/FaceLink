const User = require('../models/user');

exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.stataus(400).json({error: err.message});    
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({error: 'Users not found'});
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    } catch (err) {
        res.status(404).json({error: 'User not found'});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'User deleted successfully'});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};