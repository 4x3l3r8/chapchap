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

// Get user all conversations by ID
exports.getUserConversationByUserId = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })

        return res.status(200).json({ Status: "Ok", data: conversation })
    } catch (e) {
        console.log(e)
        next()
        return res.status(500).json({ message: "An error occurred" })
    }
}

exports.getConversationByParticipantsId = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.userId, req.body.userId] }
        })

        return res.status(200).json({ Status: "Ok", data: conversation })
    } catch (e) {
        console.log(e)
        next()
        return res.status(500).json({ message: "An error occurred" })
    }
}