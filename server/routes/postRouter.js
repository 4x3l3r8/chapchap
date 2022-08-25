const router = require('express').Router();
const postController = require('../controllers/postController');

// BASIC CRUD
router.get("/:id", postController.getPost)
router.post("/create", postController.createPost);
router.put("/update/:id", postController.updatePost);
router.delete("/delete/:id", postController.deletePost);


// SOCIALS
router.put("/:id/like", postController.likePost);
router.get("/timelineposts/:id", postController.getTimelinePosts);
router.post("/timelineposts/me", postController.getMyTimelinePosts);



module.exports = router;