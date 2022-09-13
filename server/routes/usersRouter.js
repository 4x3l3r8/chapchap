const router = require('express').Router();
const userController = require('../controllers/userController');
const protect = require("../middleware/authMiddleware")

// BASIC CRUD
router.get("/", userController.getUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

// socials
router.put("/:id/follow", userController.followUser);
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;