const express = require("express")
const router = express.Router()
const { insertTicket, getTickets, getTicketById} = require("../model/ticket/TicketModel")
const {userAuthorization} = require("../middlewares/authorization")

router.all("/", (req, res, next) => {
    // res.json({ message: "return from ticket router" })

    next()
})

router.post("/", userAuthorization, async (req, res) => {

    try {
        const { subject, sender, message } = req.body

        const userId = req.userId
   
        const ticketObj = {
            clientId: userId,
            subject,
            conversations: [
                {
                    sender,
                    message
                }, 
            ],
        }
        const result = await insertTicket(ticketObj)
        if (result._id) {
            res.json({
                status: "success",
                message: "New ticket has been created!"
            })
        }
        res.json({ status: "error", message: "Unable to create ticket" })
        
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})

// Get all tickets for specific user only
router.get("/", userAuthorization, async (req, res) => {

    try {
        const userId = req.userId

        const result = await getTickets(userId)

        console.log(result)
       
            res.json({
                status: "success",
                result
            })
        
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})

// Get a particular ticket
router.get("/:_id", userAuthorization, async (req, res) => {
 
    try {
        const { _id } = req.params

        const clientId = req.userId

        const result = await getTicketById(_id, clientId)

        console.log(result)
       
            res.json({
                status: "success",
                result
            })
        
    } catch (error) {
        res.json({
            status: "error",
            message: error.message
        })
    }
})

module.exports = router