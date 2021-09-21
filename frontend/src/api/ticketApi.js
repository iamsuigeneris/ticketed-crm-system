import axios from 'axios'

export const getAllTickets = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const result = await axios.get(
                'http://localhost:3001/v1/ticket',
                {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbnJlQGxhbnJlLmNvbSIsImlhdCI6MTYzMjE5MjI3MSwiZXhwIjoxNjMyMTkzMTcxfQ.yq84kaUVl6ixSqAL5UIMnhOcTnZvgQkVuVYsDWJSE1s",
                    }
                }
            )
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })

}