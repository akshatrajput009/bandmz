const express = require("express");
const http = require("http");
const nodemailer = require("nodemailer");
const cors = require("cors");

// const corsOptions = {
//   origin: "https://651064470c4ca4759a2d6c5b--tiny-madeleine-119d47.netlify.app", // Replace with your client's domain
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const app = express(); // Create the Express app before using it
app.use(cors()); // Set up CORS before defining routes

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

  console.log(email, subject, message);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "akshatantahal@gmail.com",
      pass: "zmbqwvncdckznuzf",
    },
  });

  let mailOptions = {
    from: "akshatantahal@gmail.com",
    to: "info@bandm.cz",
    subject: subject,
    text: `name : ${name}
      email: ${email}
      message: ${message} `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error is", error);
      return res.status(404).json({ message: "an error has occurred" });
    } else {
      console.log("Email.send: " + info.response);
      return res.status(200).json({ message: "Message sent successfully! " });
    }
  });
});

server.listen(port, () => {
  console.log("starting server on port: " + port);
});
