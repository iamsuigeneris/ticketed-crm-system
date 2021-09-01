const express = require("express")
const router = express.Router()

const { insertUser,getUserEmail,getUserById } = require("../model/user/UserModel")
const { hashPassword,comparePassword } = require("../helpers/bcrypt")
const { createRefreshJWT, createAccessJWT } = require("../helpers/jwt")
const { userAuthorization } = require("../middlewares/authorization")


router.all("/", (req, res, next) => {
    // res.json({ message: "return from user router" })
    next()
})

// Get user profile  Router
router.get("/", userAuthorization, async (req, res) => {
    // this data from DB
    const _id = req.userId
    const userProf = await getUserById(_id)
    res.json({ user: userProf})
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





module.exports = router