const imageKit = require("../utils/imageKit")
const fs = require("fs")

// Register test File
exports.test = async (req, res, next) => {
    try {
        if (req.file) {
            await imageKit.upload({
                file: req.file.buffer.toString('base64'),
                // fileName: req.body.name,
                fileName: req.file.originalname,
                folder: 'test',
                useUniqueFileName: false
            }, function (err, response) {
                if (err) {
                    return res.status(500).json({
                        status: "failed",
                        message: "An error occured during file upload. Please try again."
                    })
                }
                return res.status(200).json({ status: "success", message: "Successfully uploaded files",  response });
            })
        }
    } catch (e) {
        console.log(e);
        next(e)
    }
}