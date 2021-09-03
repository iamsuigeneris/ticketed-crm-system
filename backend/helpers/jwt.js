const jwt = require('jsonwebtoken')
const { setJWT, getJWT } = require('../helpers/redis')
const { storeUserRefreshJWT} = require("../model/user/UserModel")

const createAccessJWT = async (email,_id) => {
    try {
        const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS,
            { expiresIn: '15min' })

        await setJWT(accessJWT,_id)

        return Promise.resolve(accessJWT)
    } catch (error) {
        return Promise.reject(error)
    }
}

const createRefreshJWT = async (email, _id) => {
    try {
        const refreshJWT = jwt.sign({ email },
            process.env.JWT_REFRESH,
            { expiresIn: '30d' })
        await storeUserRefreshJWT(_id, refreshJWT)
        return Promise.resolve(refreshJWT)
    } catch (error) {
        return Promise.reject(error)
    }
}

const verifyAccessJWT = (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS))
    } catch (error) {
        return Promise.reject(error)
    }
}

const verifyRefreshJWT = (userJWT) => {
    try {
        return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH))
    } catch (error) {
        return Promise.reject(error)
    }
}
 

module.exports = { createAccessJWT, createRefreshJWT, verifyAccessJWT, verifyRefreshJWT}
