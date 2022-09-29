const router = require('express').Router();
const conversationController = require('../controllers/conversationController');

// New Conversation
router.post('/', conversationController.newConversation);

// get convo
router.get('/get/:userId', conversationController.getConversation);

module.exports = router;