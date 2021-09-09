const {TicketSchema} = require("./TicketSchema")

const insertTicket = ticketObj => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema(ticketObj)
                .save(ticketObj)
                .then(data => resolve(data))
                .catch(error => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const getTickets = (clientId) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema
                .find({clientId})
                .then(data => resolve(data))
                .catch(error => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}


const getTicketById = (_id, clientId) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema
                .find({ _id, clientId })
                .then(data => resolve(data))
                .catch(error => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const updateClientReply = ({_id, message, sender}) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.findOneAndUpdate(
                    { _id },
                    {
                        status: "Pending operator response",
                        $push: {
                            conversations:{ message, sender},
                        },
                    }, 
                    {new:true}
                )
                .then(data => resolve(data))
                .catch(error => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

const updateStatusToClose = ({ _id, clientId }) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.findOneAndUpdate(
                { _id, clientId },
                {status: "Closed"},
                { new: true }
            )
                .then(data => resolve(data))
                .catch(error => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = { insertTicket, getTickets, getTicketById, updateClientReply, updateStatusToClose }