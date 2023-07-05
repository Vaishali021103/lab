const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { EMAIL, PASSWORD } = require('../env.js');
const { db } = require('../db.js') 
var cron = require('node-cron');

const getbill = (req, res) => {
 // const { userEmail } = req.body;
 const userEmail = localStorage.getItem("userEmail")

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'TaskMaster',
      link: 'https://www.taskmasterapp.com/',
    },
  });

  let response = {
    body: {
      name: 'Vaishali',
      intro: 'Your bill has arrived',
      table: {
        data: [
          {
            item: 'Nodemailer Stack Book',
            description: 'A Backend application',
            price: '$10.99',
          },
        ],
      },
      outro: 'Looking forward to doing more business',
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: 'PLACE ORDER',
    html: mail,
  };
  
  cron.schedule('0 */15 * * * *', () => {
  transporter.sendMail(mailOptions, function (err, info) {
      if(err) 
        console.log(err);
      else
        console.log(info);
       });
  }); 

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: 'You should receive an email',
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  getbill,
};
