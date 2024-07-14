// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {

//     const transporter = nodeMailer.createTransport({
//         host:process.env.SMPT_HOST,
//         port: process.env.SMPT_PORT,
//         service: process.env.SMPT_SERVICE,
//         auth:{
//            user: process.env.SMPT_MAIL,
//            pass:process.env.SMPT_PASSWORD,
//         },
//     });

//     const mailOptions = {
//         from: process.env.SMPT_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     };

//     const mail = await transporter.sendMail(mailOptions);
    
// };

// module.exports = sendEmail;
// 

const nodemailer = require("nodemailer");



// const sendEmail = async (options) => {
// //     console.log('SMTP_HOST:', process.env.SMTP_HOST);
// // console.log('SMTP_PORT:', process.env.SMTP_PORT);
// // console.log('SMTP_MAIL:', process.env.SMTP_MAIL);
// // console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD);
//     try {
//         // 
//         const transporter = nodemailer.createTransport({
//             // pool: true,
//             service: 'gmail',
//             // port: 2525,
//             auth: {
//               user:process.env.EMAIL_SENDER,
//               pass:process.env.EMAIL_PASSWORD,
//             },
//             // maxConnections: 1
//           });

//           console.log(transporter);

//         const mailOptions = {
//             from: process.env.SMTP_MAIL,
//             to: options.email,
//             subject: options.subject,
//             text: options.message,
//         };

        

//         const mail = await transporter.sendMail(mailOptions);
//         console.log('Message sent: %s', mail.messageId);
//         return mail;

        

//     } catch (error) {
//         console.error('Error sending email: ', error);
//         throw error;
//     }
// };

// module.exports = sendEmail;


const sendEmail = async (options) => {
    // Debug statements to check environment variables
    // console.log('SMTP_HOST:', process.env.SMTP_HOST);
    // console.log('SMTP_PORT:', process.env.SMTP_PORT);
    // console.log('SMTP_MAIL:', process.env.SMTP_MAIL);
    // console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.office365.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    const mail = await transporter.sendMail(mailOptions);
    return mail; // To get the response for debugging
};

module.exports = sendEmail;