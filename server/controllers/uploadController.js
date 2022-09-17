// Register User
exports.test = async (req, res, next) => {
    try {
        return res.json({ message: "Successfully uploaded file " })
    } catch (e) {
        console.log(e);
        next(e)
    }
}