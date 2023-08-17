const secretKey = process.env.API_SECRET_KEY
module.exports = (req, res, next) => {
    if (req.headers.secret_key == secretKey) {
        return next()
    }
    res.status(500).send("Auth fail")
}