const express = require("express");
const http = require("http");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cors = require("cors");

const corsOptions = {
  origin: "https://bandm.cz", // Replace with your client's domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

const app = express();
app.use(cors());

const server = http.Server(app);

const port = 3000;
app.set("port", port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routing

app.get("/hi", (req, res) => {
  res.status(200).json({ message: "hello akshat" });
  res.send("hello");
});

app.post("/sendEmail", (req, res) => {
  let { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: process.env.HOST_NAME,
    port: process.env.SMPT_PORT,
    secure: true,
    auth: {
      user: process.env.USER_KEY,
      pass: process.env.PASS_KEY,
    },
  });

  let mailOptions = {
    from: process.env.USER_KEY,
    to: process.env.USER_KEY,
    subject: subject,
    text: `name : ${name}
      email: ${email}
      message: ${message} `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(404).json({ message: "an error has occurred" });
    } else {
      return res.status(200).json({ message: "Message sent successfully! " });
    }
  });
});

server.listen(port, () => {
  console.log("starting server on port: " + port);
});
