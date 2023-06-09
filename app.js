const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASSWORD,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});


router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: email,
    to: 'krishnamalathi2000@gmail.com',
    subject: "Contact Form Submission",
    html: '<p>Name: ' + name + '</p>\n' +
        '<p>Email: ' + email + '</p>\n' +
        '<p>Message: ' + message + '</p>\n',
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "message not sent" });
    } else {
      res.json({ status: "Your message has been sent!\nThank you for contacting us." });
    }
  });
});
