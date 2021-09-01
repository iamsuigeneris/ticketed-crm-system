const {verifyAccessJWT} = require("../helpers/jwt")
const {getJWT} = require("../helpers/redis")

const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers
    console.log(authorization)
    // res.json(authorization)

    const decoded = await verifyAccessJWT(authorization)
    // console.log(decoded)
    if (decoded.email) {
        const userId = await getJWT(authorization)
        console.log((userId))
        if (!userId) {
            return res.status(403).json({ message: "Forbidden" })
        }
        req.userId = userId
        return next()
    }
    return res.status(403).json({ message: "Forbidden" })

}

module.exports = {userAuthorization}