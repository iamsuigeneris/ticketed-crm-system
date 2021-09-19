import axios from 'axios'

export const getAllTickets = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await axios.get(
                'http://localhost:3001/v1/ticket',
                {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbnJlQGxhbnJlLmNvbSIsImlhdCI6MTYzMjA1MzU0OCwiZXhwIjoxNjMyMDU0NDQ4fQ.WYbTSZU2LVQyaFQ1lYEI_hfkPYTLXuFZMusTebd-uwA",
                    }
                }
            )
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

}