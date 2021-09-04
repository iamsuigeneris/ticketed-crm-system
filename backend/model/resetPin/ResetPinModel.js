const { ResetPinSchema } = require("./ResetPinSchema")
const { token } = require("morgan")
const { randomPinNumber } = require("../../utils/randomGenerator")


const setPasswordResetPin = async  (email) => {
// rand 6 digit
    const pinLength = 6
    const randPin = await randomPinNumber(pinLength)
    const restObj = {
        email,
        pin: randPin
    }

    return new Promise((resolve, reject) => {
        ResetPinSchema(restObj)
            .save()
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
} 


module.exports = {
    setPasswordResetPin
}