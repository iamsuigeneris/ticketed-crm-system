const { UserSchema } = require("./UserSchema")
const {token} = require("morgan")

const insertUser = (userObj) => {
    return new Promise((resolve, reject) => {
        UserSchema(userObj)
            .save()
            .then(data => resolve(data))
            .catch(error => reject(error))
    })

} 
const getUserEmail = (email) => {
    return new Promise((resolve, reject) => {
        if (!email) return false
        try {
            UserSchema.findOne({ email }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getUserById = (_id) => {
    return new Promise((resolve, reject) => {
        if (!_id) return false
        try {
            UserSchema.findOne({ _id }, (error, data) => {
                if (error) {
                    reject(error)
                }
                resolve(data)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const storeUserRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                { _id },
                { $set: { "refreshJWT.token": token,"refreshJWT.addedAt":Date.now() } },
                { new: true }
            )
                .then(data => resolve(data))
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } catch (error) { 
            reject(error)
        }
    })
}

const updatePassword = (email, newHashedPass) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                { email },
                {
                    $set: { "password": newHashedPass },
                },
                { new: true }
            )
                .then(data => resolve(data))
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } catch (error) {
            reject(error)
        }
    })
}

const verifyUser = (_id, email) => {
    return new Promise((resolve, reject) => {
        try {
            UserSchema.findOneAndUpdate(
                { _id , email, isVerified:false},
                {
                    $set: { isVerified:true },
                },
                { new: true }
            )
                .then(data => resolve(data))
                .catch((error) => {
                    console.log(error)
                    reject(error)
                })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { insertUser, getUserEmail, getUserById, storeUserRefreshJWT, updatePassword, verifyUser}