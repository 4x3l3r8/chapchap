const User = require("../models/User");
const bcrypt = require("bcrypt");

// Updates a user
exports.updateUser = async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(12);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (e) {
                res.status(500).send("An error occurred!")
                next(e)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json({ "Status": "ok", "Message": "Account updated successfully", data: user });
        } catch (e) {
            next(e);
            console.log(e)
        }
    } else {
        return res.status(403).json({ "Status": "Unauthorized", "Message": "You can't make changes to this account." })
    }
}

// Deletes a user
exports.deleteUser = async (req, res, next) => {
    try {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ "Status": "ok", "Message": "Account Deleted Successfully!" });
        } else {
            return res.status(401).json({ "Status": "Unauthorized", "Message": "You can't delete this account." })
        }
    } catch (e) {
        next(e);
        console.log(e)
        res.status(500).json({ "Status": "error", "Message": "Server Error" })
    }
}

// get a user
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            res.status(400).json({ "status": "Not Found", "message": "Account not found!" });
        }

        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json({ "Status": "ok", "data": other });
    } catch (e) {
        console.log(e.Message);
        res.status(500).json(e)
        next(e)
    }
}

// follow a user
exports.followUser = async (req, res, next) => {
    try {
        if (req.body.userId !== req.params.id) {
            // user to be followed
            const user = await User.findById(req.params.id);

            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                // update list of followers of the user to be followed
                await user.updateOne({ $push: { followers: req.body.userId } });

                // update list of following currentUser has
                await currentUser.updateOne({ $push: { following: req.params.id } })

                res.status(200).json({ "Status": "ok", "Message": `You are now following this account!` })
            } else {
                res.status(403).json({ "Status": "Unauthorized", "Message": "You already follow this user." })
            }
        } else {
            res.status(403).json({ "Status": "Unauthorized", "Message": "You can't follow yourself." })
        }
    } catch (e) {
        res.status(500).json(e);
        next(e)
    }
}

// unfollow a user
exports.unfollowUser = async (req, res, next) => {
    try {
        if (req.body.userId !== req.params.id) {
            // user to be followed
            const user = await User.findById(req.params.id);

            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                // update list of followers of the user to be followed
                await user.updateOne({ $pull: { followers: req.body.userId } });

                // update list of following currentUser has
                await currentUser.updateOne({ $pull: { following: req.params.id } });

                res.status(200).json({ "Status": "ok", "Message": `You unfollowed this user!` });
            } else {
                res.status(403).json({ "Status": "Unauthorized", "Message": "You don't follow this user." });
            }
        } else {
            res.status(403).json({ "Status": "Unauthorized", "Message": "You can't unfollow yourself." });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json(e);
        next(e)
    }
}