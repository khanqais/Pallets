require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./DB/connect");
const nodemailer = require('nodemailer');
const twilio = require('twilio'); 

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});


const validateInquiryData = (data) => {
  const errors = [];

  // Validate product
  if (!data.product) {
    errors.push('Product information is required');
  } else {
    if (!data.product.name) errors.push('Product name is required');
    if (!data.product.price) errors.push('Product price is required');
  }

  
  if (!data.customer) {
    errors.push('Customer information is required');
  } else {
    
    if (!data.customer.mobile) {
      errors.push('Mobile number is required');
    } else if (!/^[0-9]{10}$/.test(data.customer.mobile)) {
      errors.push('Mobile number must be exactly 10 digits');
    }

   
    if (!data.customer.quantity) {
      errors.push('Quantity is required');
    }

    
    if (!data.customer.unit) {
      errors.push('Unit is required');
    } else if (!['Piece', 'Set', 'Box'].includes(data.customer.unit)) {
      errors.push('Unit must be one of: Piece, Set, Box');
    }

    
    if (!data.customer.interestedIn) {
      errors.push('Interested category is required');
    } else if (data.customer.interestedIn.length < 3 || data.customer.interestedIn.length > 100) {
      errors.push('Interested category must be between 3 and 100 characters');
    }

    
    if (!data.customer.size) {
      errors.push('Size is required');
    } else {
      const validSizes = [
        '800mm X 1200mm',
        '1200mm X 1000mm',
        '1000mm X 1000mm',
        '1100mm X 1100mm',
        '1200mm X 1200mm'
      ];
      if (!validSizes.includes(data.customer.size)) {
        errors.push('Invalid size selected');
      }
    }

    
    if (data.customer.requirements && data.customer.requirements.length > 500) {
      errors.push('Requirements must be less than 500 characters');
    }
  }

  return errors;
};

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const saveInquiry = async (inquiryData) => {
  console.log('Saving inquiry to database:', inquiryData);
  return {
    id: Date.now(),
    ...inquiryData,
    createdAt: new Date().toISOString()
  };
};

const sendWhatsAppNotification = async (orderDetails) => {
  try {
    const message = `🔔 NEW PRODUCT INQUIRY!
    
👤 Customer: +91${orderDetails.customerMobile}
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
    console.error('Error sending WhatsApp notification:', error);
    return false;
  }
};

app.post('/product-inquiry', async (req, res) => {
  console.log('Received inquiry data:', JSON.stringify(req.body, null, 2));

  try {
   
    const validationErrors = validateInquiryData(req.body);
    if (validationErrors.length > 0) {
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ 
        error: 'Validation failed',
        details: validationErrors,
        receivedData: req.body
      });
    }

    const { product, customer, timestamp } = req.body;
    
    
    let quantityNumber;
    try {
      quantityNumber = parseInt(customer.quantity, 10);
      if (isNaN(quantityNumber) || quantityNumber <= 0) {
        throw new Error('Invalid quantity');
      }
    } catch (err) {
      return res.status(400).json({ 
        error: 'Invalid quantity provided',
        details: 'Quantity must be a positive number'
      });
    }
    
    const inquiryData = {
      productName: product.name,
      productPrice: product.price,
      productSize: product.size,
      customerMobile: customer.mobile,
      quantity: quantityNumber,
      unit: customer.unit,
      interestedIn: customer.interestedIn,
      size: customer.size,
      requirements: customer.requirements || '',
      timestamp: timestamp || new Date().toISOString()
    };

    const savedInquiry = await saveInquiry(inquiryData);

    let whatsappSent = false;
    if (process.env.TWILIO_ACCOUNT_SID && process.env.YOUR_WHATSAPP_NUMBER) {
      whatsappSent = await sendWhatsAppNotification(inquiryData);
    } else {
      console.log('WhatsApp credentials not configured');
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: savedInquiry.id,
      notificationSent: whatsappSent,
      data: savedInquiry
    });
    
  } catch (error) {
    console.error('❌ Error processing inquiry:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to process inquiry',
      details: error.message 
    });
  }
});

app.post("/contact", async (req, res) => {
  console.log("Received contact data:", req.body);
  
  const { name, email, phone, subject, message } = req.body;


  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number format" });
  }

  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Sent from your website contact form</em></p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');

    res.status(200).json({ 
      success: true,
      message: "Message sent successfully" 
    });
  } catch (err) {
    console.error('Error sending contact email:', err);
    res.status(500).json({ 
      success: false,
      error: "Failed to send message",
      details: err.message
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message
  });
});


const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    if (process.env.MONGO_URI) {
      await connectDB(process.env.MONGO_URI);
      console.log("✅ Connected to MongoDB");
    } else {
      console.log("⚠️ MongoDB URI not provided - running without database");
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`📱 Twilio configured: ${!!process.env.TWILIO_ACCOUNT_SID}`);
      console.log(`📧 Email configured: ${!!process.env.MY_EMAIL}`);
    });
  } catch (error) {
    console.log("Server startup error:", error);
    process.exit(1);
  }
};

start();
