
import {createTransport} from "nodemailer"
import Mail from "nodemailer/lib/mailer";
import config from "config"

const transporter = createTransport({
    service: config.get("email.service"),
    auth: {
      user: config.get("email.user"),
      pass: config.get("email.pass")
    }
});

export class Mailer{

    static sendMail(mailOptions:Mail.Options){
        mailOptions.from = config.get("email.user");
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  reject(error);
                } else {
                  resolve('Email sent: ' + info.response);
                }
            });
        })
        
    }

}



// const  = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   html:'<h1>Test</h1>',
//   text: 'That was easy!'
// };

