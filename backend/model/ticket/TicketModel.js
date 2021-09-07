const {TicketSchema} = require("./TicketSchema")

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

module.exports = { insertTicket, getTickets }