const Conversation = require("../models/Conversation");
const User = require("../models/User");

// New conversation
exports.newConversation = async (req, res, next) => {
    try {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })
        const savedConvo = await newConversation.save();
        return res.status(201).json({ Status: "Ok", data: savedConvo });
    } catch (e) {
        console.log(e)
        next()
        return res.status(500).json({ message: "An error occurred" })
    }
}

// Get user conversation
exports.getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })

        return res.status(200).json({ Status: "Ok", data: conversation })
    } catch (error) {
        console.log(e)
        next()
        return res.status(500).json({ message: "An error occurred" })
    }
}