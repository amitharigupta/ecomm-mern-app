const nodemailer = require("nodemailer");


module.exports = {
     sendEmail: async (options) => {
        console.log(options);
        try {

            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
                },
            });

            // let transporter = nodemailer.createTransport({
            //     host: process.env.SMTP_HOST || "smtp.gmail.com",
            //     port: process.env.SMTP_PORT || 465,
            //     service: process.env.SMTP_MAIL_PROVIDER || "gmail",
            //     auth: {
            //         user: process.env.SMTP_MAIL_USER || "amitgt9967@gmail.com",
            //         pass: process.env.SMTP_MAIL_PASSWORD || "1234567",
            //     }
            // });

            mailOptions = {
                from: testAccount.user, // sender address
                to: "amitgt9967@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            }
            // await transporter.sendMail(mailOptions)
            let info = await transporter.sendMail(mailOptions);
            return info;
            console.log(info);
        } catch (error) {
            console.log("Error while sending mail to clinet", error);
        }
    }
}