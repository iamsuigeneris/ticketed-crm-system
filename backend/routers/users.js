const express = require("express")
const router = express.Router()

const { insertUser } = require("../model/user/UserModel")
const { hashPassword } = require("../helpers/bcrypt")

router.all("/", (req, res, next) => {
    // res.json({ message: "return from user router" })
    next()
})

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

module.exports = router