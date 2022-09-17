const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const multer = require("multer");


const upload = multer({ dest: "uploads/" })

router.post('/test', upload.single("file"), uploadController.test);
// router.post('/login', authController.loginUser);

module.exports = router;