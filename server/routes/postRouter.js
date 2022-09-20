const router = require('express').Router();
const postController = require('../controllers/postController');
const upload = require("../middleware/uploadMiddleware");

// BASIC CRUD
router.get("/:id", postController.getPost)
router.post("/create", upload.single("file"), postController.createPost);
router.put("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);
router.get("/profile/:username", postController.getProfilePosts);


// SOCIALS
router.put("/:id/like", postController.likePost);
router.get("/timelineposts/:id", postController.getTimelinePosts);
router.post("/timelineposts/me", postController.getMyTimelinePosts);



module.exports = router;