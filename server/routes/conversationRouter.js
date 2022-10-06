const router = require('express').Router();
const conversationController = require('../controllers/conversationController');

// New Conversation
router.post('/', conversationController.newConversation);

// get convo
router.get('/get/:userId', conversationController.getUserConversationByUserId);


router.post('/getConvo/:userId', conversationController.getConversationByParticipantsId);

module.exports = router;