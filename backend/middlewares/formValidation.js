const Joi = require("joi")

const email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const pin = Joi.number().min(10000).max(999999).required()
const phone = Joi.number().min(00000000000).max(09999999999).required();

const shortStr = Joi.string().min(2).max(50)
const longStr = Joi.string().min(2).max(1000)
const date = Joi.date()

const newPassword = Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()

const updatePasswordValidation = (req, res, next) => {
    const schema = Joi.object({ email,pin,newPassword })
    const value = schema.validate(req.body)
    if (value.error) {
        return res.json({status:"error",message:value.error.message})
    }
    next()
}    

const resetPassReqValidation = (req, res, next) => {
    const schema = Joi.object({ email })
    const value = schema.validate(req.body)
    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
    }
    next()
}  

const createNewTicketValidation = (req, res, next) => {
    const schema = Joi.object({
        subject: shortStr.required(),
        sender: shortStr.required(),
        message: longStr.required(),
        issueDate: date.required()
    })
    const value = schema.validate(req.body)
    console.log(value)
    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
       
    }
    next()
}

const replyTicketMessageValidation = (req, res, next) => {
    const schema = Joi.object({
        sender: shortStr.required(),
        message: longStr.required()
    })
    const value = schema.validate(req.body)
    if (value.error) {
        console.log(value.error)
        return res.json({ status: "error", message: value.error.message })
    }
    next()
}


const newUserValidation = (req, res, next) => {
    const schema = Joi.object({
        name:shortStr.required(),
        company: shortStr.required(),
        address: shortStr.required(),
        phone:phone,
        email: shortStr.required(),
        password: shortStr.required(),
    })

    const value = schema.validate(req.body)
    
    if (value.error) {
        return res.json({ status: "error", message: value.error.message })
    }
    next()
}

module.exports = {
    resetPassReqValidation,
    updatePasswordValidation,
    createNewTicketValidation,
    replyTicketMessageValidation,
    newUserValidation
    
}