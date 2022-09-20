const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const upload = require("../middleware/uploadMiddleware")

router.post('/test', upload.single("file"), uploadController.test);
// router.post('/test', upload.single("file"), uploadController.test);
// router.post('/login', authController.loginUser);

module.exports = router;
