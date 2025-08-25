require("dotenv").config();
const express=require('express')
const app=express();
const cors = require("cors");
const connectDB = require("./DB/connect");
const axios = require("axios");
const passport=require('passport')
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("Hii mom  ")
})
app.post("/contact", async (req, res) => {
  console.log("Received Data:",req.body);
  
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    
    const tranporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });
        const receiver = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: `Contact Form: ${subject}`,
            text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `
        };
        await tranporter.sendMail(receiver);

    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send message" });
  }
});


const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to Mongo");
 
    app.listen(PORT, console.log(`Server is listening on ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

