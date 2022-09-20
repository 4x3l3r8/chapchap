const Multer = require("multer");

const storage = Multer.memoryStorage()

const multer = Multer({ storage })

const upload = async (req, res, next) => {
    if (req.file && req.file !== {}) {
        multer.single("file");
    } else {
        multer.none();
    }
    next()
}

module.exports = multer