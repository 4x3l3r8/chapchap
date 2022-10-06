const Message = require("../models/Message");
const User = require("../models/User");

// create new message
exports.newMessage = async (req, res, next) => {
    try {
        const { receiverId, ...rest } = req.body;
        const newMessage = new Message(rest);
        const savedMessage = await newMessage.save();

        // get recipients SocketID from usersList appended in socketUtils.js
        const recipient = req.io.usersList.find((user) => user.userId === receiverId);

        // this will throw an error if the recipient is currently not connected so skip if not recipient
        recipient && req.io.to(recipient.socketId).emit("message", savedMessage)

        return res.status(200).json(savedMessage);
    } catch (error) {
        console.log(error)
        next()
        return res.status(500).json({ message: "An error occurred" })
    }
}

// get messages that belong to a conversation
exports.getConversationMessages = async (req, res, next) => {
    try {
        const allMessages = await Message.find({
            conversationId: req.params.conversationId
        })
        return res.status(200).json({ messages: allMessages })
    } catch (error) {
        console.log(e)
        next()
        return res.status(500).json({ message: "An error occurred" })
    }
}