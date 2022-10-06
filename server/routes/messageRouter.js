const router = require('express').Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.newMessage);

// get convo messages
router.get('/getMessages/:conversationId', messageController.getConversationMessages);

module.exports = router;