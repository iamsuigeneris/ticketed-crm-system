const express = require("express")
const router = express.Router()
const { insertTicket} = require("../model/ticket/TicketModel")

router.all("/", (req, res, next) => {
    // res.json({ message: "return from ticket router" })

    next()
})

router.post("/", async (req, res) => {

    const { subject, sender, message } = req.body
    try {
        const ticketObj = {
            clientId: "612253df1ab46112a8ad6bce",
            subject,
            conversations: [
                {
                    sender,
                    message
                }
            ]

        }
        const result = await insertTicket(ticketObj)
        if (result._id) {
            res.json({ status: "success", message: "New ticket has been created!" })
        }
        res.json({ status: "error", message: "Unable to create ticket" })
        
    } catch (error) {
        res.json({ status: "error", message: error.message})
    }


})

module.exports = router