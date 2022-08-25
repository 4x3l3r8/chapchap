const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose")

// create post
exports.createPost = async (req, res, next) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save()
        if (savedPost) {
            res.status(200).json({ "Status": "ok", "Message": "Post created successfully!", data: savedPost })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
        next(e)
    }
}

// update a post
exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.updateOne({ $set: req.body });
            res.status(200).json({ "Status": "ok", "Message": "Post updated successfully!" })
        } else {
            res.status(403).json("You can't make changes to this post!");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
        next(e);
    }
}

// delete a post
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await Post.deleteOne();
            res.status(200).json({ "Status": "ok", "Message": "Post deleted successfully!" })
        } else {
            res.status(403).json({ "error": "You can't delete this post!" });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
        next(e);
    }
}

// like/dislike a post
exports.likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json({ "Status": "ok", "Message": "You liked this post" })
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json({ "Status": "ok", "Message": "You disliked this post!" })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
        next(e);
    }
}

// Get a post
exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ "Status": "error", "message": "Post does not exist" });
        }
        res.status(200).json({ "Status": "ok", "data": post })
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
        next(e);
    }
}

/**
 * Get visited User timeline posts
 * @param {Object} req Api request
 * @param {Object} res Api response
 * @param {Object} next Error response
 */
exports.getTimelinePosts = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json({ Status: "ok", data: userPosts.concat(...friendPosts) })
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
        next(e);
    }
}

/**
 * Get logged in User timeline posts
 * @param {Object} req Api request
 * @param {Object} res Api response
 * @param {Object} next Error response
 */
exports.getMyTimelinePosts = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
        next(e);
    }
}