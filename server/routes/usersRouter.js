const router = require('express').Router();
const userController = require('../controllers/userController');

// BASIC CRUD
router.get("/:id", userController.getUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

// socials
router.put("/:id/follow", userController.followUser);
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;