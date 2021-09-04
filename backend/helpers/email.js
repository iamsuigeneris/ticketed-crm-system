const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'emmy.howe68@ethereal.email',
        pass: '2TZd4d4jd94RUkdhZk'
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
const emailProcessor = (email,pin) => {
    const info = {
        from: '"CRM Company" <emmy.howe68@ethereal.email>', // sender address
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
}

module.exports = {emailProcessor}