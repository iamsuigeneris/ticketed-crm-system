import axios from 'axios'

const rootUrl = "http://localhost:3001/v1/"
const ticketUrl = rootUrl + "ticket/"
const closeTicketUrl = rootUrl + "ticket/close-ticket/"

// Fetch all tickets
export const getAllTickets = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await axios.get(
                'http://localhost:3001/v1/ticket',
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessJWT"),
                    }
                }
            )
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

// fetch single ticket
export const getSingleTicket = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(
                ticketUrl + _id,
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessJWT"),
                    }
                }
            )
            resolve(result)
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}

// update replay ticket
export const updateReplyTicket = (_id, msgObj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.put(
                ticketUrl + _id, msgObj,
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessJWT"),
                    },
                 
                })
            resolve(result.data)
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}

// close ticket
export const updateTicketStatusClosed = (_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.patch(
                closeTicketUrl + _id, {},
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessJWT"),
                    },
                 
                })
            resolve(result.data)
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
} 

export const createNewTicket = (formData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(
                ticketUrl,
                formData,
                {
                    headers: {
                        Authorization: sessionStorage.getItem("accessJWT"),
                    },

                })
            resolve(result.data)
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
} 