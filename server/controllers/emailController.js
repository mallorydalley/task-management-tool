const nodemailer = require('nodemailer'),
{EMAIL, PASSWORD} = process.env;

module.exports = {
    email: async(req, res) => {
        try{
            let transporter = nodemailer.createTransport({
                host:'smtp.mail.yahoo.com',
                port: 465,
                service: 'yahoo',
                secure: false,
                auth:{
                    user:EMAIL,
                    pass:PASSWORD
                }
            })
            let info = await transporter.sendMail({
                from:`Mallory Dalley <${EMAIL}`,
                to:`malloryd28@gmail.com`,
                subject:'NodeMailerr Test',
                text:`This is a NodeMailer Test`,
                html: `<div>This is a NodeMailer Test </div>`
                // attachments:[
                    //{fileName: name_of_file,
                // path: file_path}
                // ]
            }, (err, res => {
                
            }))
        } catch(err){
            res.status(500).send(err)
        }
    }
}