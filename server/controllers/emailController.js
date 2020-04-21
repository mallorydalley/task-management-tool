const nodemailer = require('nodemailer'),
    { EMAIL, PASSWORD } = process.env;

module.exports = {
    email: async (req, res) => {
        const {email, password} = req.body
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                port: 465,
                service: 'yahoo',
                secure: false,
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            let info = await transporter.sendMail({
                from: `Mallory Dalley <${EMAIL}>`,
                to: 'mallorydalley@yahoo.com',
                subject: 'NodeMailer Test',
                text: 'Welcome to ScrumTask! Thanks for signing up',
                html: `<div>Welcome to ScrumTask! Thanks for signing up</div>
                       <img src="cid:unique@nodemailer.com"/>`,
                attachments: [
                    {
                        filename: 'license.txt',
                        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                    },
                    {
                        cid: 'unique@nodemailer.com',
                        path: 'https://i.kym-cdn.com/photos/images/original/001/516/899/f31.jpg'
                    }
                ]
            }, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send(info);
                }
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
}