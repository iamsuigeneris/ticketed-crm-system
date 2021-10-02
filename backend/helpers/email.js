const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dessie.schmitt@ethereal.email',
        pass: '25YVThEdhnmMzUJBRv'
    }
});

const send = (info) => {
    return new Promise(async (resolve, reject) => {
    try {
            // send mail with defined transport object
            let result = await transporter.sendMail(info);

            console.log("Message sent: %s", result.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            
            resolve(result)
        } catch (error) {
            console.log(error)
        }
    })
}
const emailProcessor = ({email, pin, type, verificationLink = ""}) => {
    let info = ""
    switch (type) {
        case "request-new-password":
            info = {
                from: '"CRM Company" <dessie.schmitt@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Password reset PIN", // Subject line
                text: "Kindly accept your pin" + pin + " This pin will expire in 1day ", // plain text body
                html: `<b>Hello </b>
                    Here is your pin
                    <b>${pin}</b>
                    This pin will expire in 1day
                    <p></p>`,
            }
            send(info)
            break
        
        case "update-password-success":
            info = {
                from: '"CRM Company" <dessie.schmitt@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Password Updated", // Subject line
                text: "Your new password has been updated", // plain text body
                html: `<b>Hello </b>

                    <p>Your new password has been updated</p>`,
            }
            send(info)
            break
        
        case "new-user-confirmation-required":
            info = {
                from: '"CRM Company" <dessie.schmitt@ethereal.email>', // sender address
                to: email, // list of receivers
                subject: "Please verify your new user", // Subject line
                text: "please follow the link to verify account before you can login", // plain text body
                html: `<b>Hello </b>
                    <p>Please follow the link to verify account before you can login</p>
                    <p>${verificationLink}</p>
                    `,
            }
            send(info)
            break
        
        default:
            break
    }   
}

module.exports = {emailProcessor}