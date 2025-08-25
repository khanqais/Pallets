require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./DB/connect");
const nodemailer = require('nodemailer');
const twilio = require('twilio'); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


const saveInquiry = async (inquiryData) => {
  console.log('Saving inquiry to database:', inquiryData);
  return {
    id: Date.now(),
    ...inquiryData
  };
};


const sendWhatsAppNotification = async (orderDetails) => {
  try {
    const message = `🔔 NEW PRODUCT INQUIRY!
    
👤 Customer: ${orderDetails.customerMobile}
📦 Product: ${orderDetails.productName}
💰 Price: ${orderDetails.productPrice}
📊 Quantity: ${orderDetails.quantity} ${orderDetails.unit}
📏 Size: ${orderDetails.size}
🏷️ Category: ${orderDetails.interestedIn}
📝 Requirements: ${orderDetails.requirements || 'None'}
⏰ Time: ${new Date(orderDetails.timestamp).toLocaleString()}

💬 Contact customer immediately at: +91${orderDetails.customerMobile}`;

    const result = await twilioClient.messages.create({
      from: 'whatsapp:+14155238886', 
      to: `whatsapp:+91${process.env.YOUR_WHATSAPP_NUMBER}`,
      body: message
    });

    console.log('WhatsApp notification sent successfully:', result.sid);
    return true;
  } catch (error) {
    console.error(' Error sending WhatsApp notification:', error);
    return false;
  }
};


app.post('/product-inquiry', async (req, res) => {
  console.log('📩 Received product inquiry:', req.body);
  
  const { product, customer, timestamp } = req.body;
  
  if (!product || !customer || !customer.mobile || !customer.quantity) {
    return res.status(400).json({ 
      error: 'Missing required fields' 
    });
  }
  
  try {
    
    const inquiry = await saveInquiry({
      productName: product.name,
      productPrice: product.price,
      customerMobile: customer.mobile,
      quantity: customer.quantity,
      unit: customer.unit,
      interestedIn: customer.interestedIn,
      size: customer.size,
      requirements: customer.requirements,
      timestamp: timestamp
    });

   
    const whatsappSent = await sendWhatsAppNotification(inquiry);
    
    if (whatsappSent) {
      console.log('🎉 Order notification sent to your WhatsApp!');
    } else {
      console.log('⚠️ WhatsApp notification failed, but inquiry saved');
    }
    
    res.status(200).json({ 
      message: 'Inquiry submitted successfully',
      inquiryId: inquiry.id,
      notificationSent: whatsappSent
    });
    
  } catch (error) {
    console.error('❌ Error processing inquiry:', error);
    res.status(500).json({ error: 'Failed to process inquiry' });
  }
});


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
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("❌ Server error:", error);
  }
};

start();

