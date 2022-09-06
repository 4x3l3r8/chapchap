const router = require('express').Router();
const userController = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware")

// BASIC CRUD
router.get("/:id", protect, userController.getUser);
router.put('/update/:id', protect, userController.updateUser);
router.delete('/delete/:id', protect, userController.deleteUser);

// socials
router.put("/:id/follow", protect, userController.followUser);
router.put("/:id/unfollow", protect, userController.unfollowUser);

module.exports = router;