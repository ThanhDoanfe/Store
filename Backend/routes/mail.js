const router = require('express').Router();
const nodemailer = require('nodemailer');
const emailTemplate = require('../assets/emailTemplate');

router.post('/sendMail', async (req, res) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: req.body.emailAddress ? req.body.emailAddress : '',
            subject: 'Reu store advertisement',
            html: emailTemplate
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(200).json({
                    errCode: 1,
                    message: err
                })
            } else {
                res.status(200).json({
                    errCode: 0,
                    message: `Email sent: ${info.response}`,
                })
            }
        });
    } catch (err) {
        return res.status(200).json({
            errCode: 1,
            message: 'send mail failure'
        })
    }
})

module.exports = router;