const express = require("express")
const router = express.Router()

const { insertUser,getUserEmail,getUserById,updatePassword,storeUserRefreshJWT } = require("../model/user/UserModel")
const { hashPassword,comparePassword } = require("../helpers/bcrypt")
const { createRefreshJWT, createAccessJWT } = require("../helpers/jwt")
const { userAuthorization } = require("../middlewares/authorization")
const { setPasswordResetPin, getPinByEmailPin,deletePin } = require("../model/resetPin/ResetPinModel")
const { emailProcessor } = require("../helpers/email")
const { resetPassReqValidation, updatePasswordValidation } = require("../middlewares/formValidation")
const { verify } = require("jsonwebtoken")
const {deleteJWT} = require("../helpers/redis")


router.all("/", (req, res, next) => {
    // res.json({ message: "return from user router" })
    next()
})

// Get user profile  Router
router.get("/", userAuthorization, async (req, res) => {
    // this data from DB
    const _id = req.userId
    const userProf = await getUserById(_id)
    const {name,email} = userProf
    res.json({ user: {_id,name,email}})
})
 
// Create New user
router.post("/", async (req, res) => {
    const {name,company,address,phone,email,password} = req.body
    try {
        //hash password
        const hashedPass = await hashPassword(password)
        const newUserObj = {
            name, company, address, phone, email, password:hashedPass 
        }
        const result = await insertUser(newUserObj)
        console.log(result)
        res.json({ message: "New User Created", result })
    } catch (error) {
        console.log(error)
        res.json({status:'error', message:error.message})
    }

})

//User sign in Router
router.post("/login", async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body
 
    // hash our password and compare with the db one
    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid form submission" })
    }
    // get the password  from db
    const user = await getUserEmail(email)

    const passFromDb = user && user._id ? user.password : null

    if (!passFromDb)
        return res.json({ status: "error", message: "Invalid email or password" })
    
    const result = await comparePassword(password, passFromDb)

    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password" })
    }
    const accessJWT = await createAccessJWT(user.email, `${user._id}`)
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`) 

    res.json({
        status: "success",
        message: "Login Successful!",
        accessJWT,
        refreshJWT
    })

  
})

router.post('/reset-password', resetPassReqValidation, async (req, res) => {
    const { email } = req.body

    const user = await getUserEmail(email)

    if (user && user._id) {
        const setPin = await setPasswordResetPin(email)
        await emailProcessor({
            email,
            pin: setPin.pin,
            type: "request-new-password"
        })
    }

    return res.json({
        status: "success",
        message:
        "If the email exist in the our database, the password reset pin will be sent shortly"
    })
})
    

router.patch("/reset-password", updatePasswordValidation, async (req, res) => {
    const { email, pin, newPassword } = req.body

    const getPin = await getPinByEmailPin(email, pin)
    // validate pin
    if (getPin?._id) {
        const dbDate = getPin.addedAt
        const expiresIn = 1

        let expDate = dbDate.setDate(dbDate.getDate() + expiresIn)

        const today = new Date()

        if (today > expDate) {
            return res.json({
                status: "error",
                message: "Invalid or expired pin"
            })
        }
        // encrypt new password
        const hashedPass = await hashPassword(newPassword)
        const user = await updatePassword(email, hashedPass)
            
        if (user._id) {
            // send email notification
            await emailProcessor({
                email,
                type: "update-password-success"
            })
            // delete pin from db
            deletePin(email,pin)

            return res.json({
                status: "success",
                message: "Your password has been updated"
            })
        }
    }
    res.json({
        status: "error",
        message: "Unable to update your password.plz try again"
    })

})

// user logout and invalidate jwts
router.delete("/logout", userAuthorization, async (req, res) => {
    const { authorization} = req.headers
    // this data from DB
    const _id = req.userId
    // const userProf = await getUserById(_id)

    //delete accessJWT from redis database
    deleteJWT(authorization)

    //delete refreshJWT from mongoDB
    const result = await storeUserRefreshJWT( _id,'')
    if (result._id) {
        return res.json({
            status: "success",
            message:"Logged out successfully"
        })
    }

    res.json({
        status: "error",
        message: "Unable to log you out" })
})

module.exports = router