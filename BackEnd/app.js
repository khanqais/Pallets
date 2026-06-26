require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const connectDB = require("./DB/connect");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';"
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.send("hii mom");
});

const otpStore = new Map();

const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

const generateOTP = () => crypto.randomInt(100000, 1000000).toString();

const MAX_OTP_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60 * 1000;

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  const key = email.toLowerCase();
  const existing = otpStore.get(key);

  if (existing && existing.lastSentAt && (Date.now() - existing.lastSentAt) < RESEND_COOLDOWN_MS) {
    const secondsLeft = Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - existing.lastSentAt)) / 1000);
    return res.status(429).json({ error: `Please wait ${secondsLeft} seconds before requesting a new code.` });
  }

  const otp = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  otpStore.set(key, { otp, expiresAt, verified: false, attempts: 0, lastSentAt: Date.now() });

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"H.K Enterprises" <${process.env.MY_EMAIL}>`,
      to: email,
      subject: 'Your Verification Code – H.K Enterprises',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#f9f9f9;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#CC5833,#8B2500);padding:28px 32px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:22px;letter-spacing:1px;">H.K Enterprises</h1>
            <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:13px;">Wooden Pallet Specialists</p>
          </div>
          <div style="padding:32px;">
            <p style="color:#333;font-size:15px;margin-top:0;">Hello,</p>
            <p style="color:#555;font-size:14px;">Use the verification code below to confirm your email address and proceed with your quote request.</p>
            <div style="text-align:center;margin:28px 0;">
              <span style="display:inline-block;background:#CC5833;color:#fff;font-size:36px;font-weight:bold;letter-spacing:10px;padding:16px 32px;border-radius:10px;">${otp}</span>
            </div>
            <p style="color:#999;font-size:12px;text-align:center;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
          </div>
          <div style="background:#f0f0f0;padding:16px;text-align:center;">
            <p style="color:#aaa;font-size:11px;margin:0;">© 2025 H.K Enterprises · Thane, Maharashtra</p>
          </div>
        </div>
      `,
    });

    console.log(`OTP sent to ${email}`);
    res.status(200).json({ success: true, message: 'Verification code sent to your email' });
  } catch (err) {
    console.error('Error sending OTP email:', err);
    otpStore.delete(key);
    res.status(500).json({ error: 'Failed to send verification email', details: err.message });
  }
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  const key = email.toLowerCase();
  const record = otpStore.get(key);

  if (!record) {
    return res.status(400).json({ error: 'No OTP requested for this email. Please request a new one.' });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
  }

  if (record.attempts >= MAX_OTP_ATTEMPTS) {
    otpStore.delete(key);
    return res.status(429).json({ error: 'Too many incorrect attempts. Please request a new verification code.' });
  }

  const inputOtp = Buffer.from(otp.toString().padEnd(6, ' '));
  const storedOtp = Buffer.from(record.otp.padEnd(6, ' '));
  const isMatch = inputOtp.length === storedOtp.length &&
    crypto.timingSafeEqual(inputOtp, storedOtp);

  if (!isMatch) {
    record.attempts += 1;
    otpStore.set(key, record);
    const attemptsLeft = MAX_OTP_ATTEMPTS - record.attempts;
    return res.status(400).json({
      error: `Incorrect verification code. ${attemptsLeft > 0 ? `${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining.` : 'No attempts remaining — please request a new code.'}`
    });
  }

  record.verified = true;
  record.attempts = 0;
  otpStore.set(key, record);

  res.status(200).json({ success: true, message: 'Email verified successfully' });
});

const validateInquiryData = (data) => {
  const errors = [];

  if (!data.product) {
    errors.push('Product information is required');
  } else {
    if (!data.product.name) errors.push('Product name is required');
    if (!data.product.price) errors.push('Product price is required');
  }

  if (!data.customer) {
    errors.push('Customer information is required');
  } else {
    if (!data.customer.email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customer.email)) {
      errors.push('Invalid email format');
    }

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

app.post('/product-inquiry', async (req, res) => {
  try {
    const validationErrors = validateInquiryData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationErrors,
        receivedData: req.body,
      });
    }

    const { product, customer, timestamp } = req.body;

    const record = otpStore.get(customer.email.toLowerCase());
    if (!record || !record.verified) {
      return res.status(403).json({ error: 'Email not verified. Please verify your email with OTP first.' });
    }

    let quantityNumber;
    try {
      quantityNumber = parseInt(customer.quantity, 10);
      if (isNaN(quantityNumber) || quantityNumber <= 0) throw new Error('Invalid quantity');
    } catch {
      return res.status(400).json({ error: 'Invalid quantity provided', details: 'Quantity must be a positive number' });
    }

    const inquiryData = {
      productName: product.name,
      productPrice: product.price,
      productSize: product.size,
      buyerEmail: customer.email,
      customerMobile: customer.mobile,
      quantity: quantityNumber,
      unit: customer.unit,
      interestedIn: customer.interestedIn,
      size: customer.size,
      requirements: customer.requirements || '',
      timestamp: timestamp || new Date().toISOString(),
    };

    const transporter = createTransporter();
    const submittedAt = new Date(inquiryData.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    await transporter.sendMail({
      from: `"H.K Enterprises Bot" <${process.env.MY_EMAIL}>`,
      to: process.env.MY_EMAIL,
      replyTo: inquiryData.buyerEmail,
      subject: `🔔 New Quote Request – ${inquiryData.productName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:580px;margin:0 auto;background:#f9f9f9;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#CC5833,#8B2500);padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">🔔 New Product Inquiry</h1>
            <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:13px;">${submittedAt}</p>
          </div>
          <div style="padding:28px 32px;">
            <h2 style="color:#CC5833;font-size:16px;margin:0 0 16px;border-bottom:2px solid #CC5833;padding-bottom:8px;">📦 Product Details</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
              <tr style="background:#fff;"><td style="padding:10px 14px;color:#555;width:40%;border-bottom:1px solid #eee;"><strong>Product</strong></td><td style="padding:10px 14px;color:#222;border-bottom:1px solid #eee;">${inquiryData.productName}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;"><strong>Listed Price</strong></td><td style="padding:10px 14px;color:#CC5833;font-weight:bold;border-bottom:1px solid #eee;">${inquiryData.productPrice}</td></tr>
              <tr style="background:#fff;"><td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;"><strong>Selected Size</strong></td><td style="padding:10px 14px;color:#222;border-bottom:1px solid #eee;">${inquiryData.size}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;"><strong>Category</strong></td><td style="padding:10px 14px;color:#222;border-bottom:1px solid #eee;">${inquiryData.interestedIn}</td></tr>
            </table>
            <h2 style="color:#2E4036;font-size:16px;margin:0 0 16px;border-bottom:2px solid #2E4036;padding-bottom:8px;">👤 Buyer Details</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
              <tr style="background:#fff;"><td style="padding:10px 14px;color:#555;width:40%;border-bottom:1px solid #eee;"><strong>Email</strong></td><td style="padding:10px 14px;border-bottom:1px solid #eee;"><a href="mailto:${inquiryData.buyerEmail}" style="color:#CC5833;">${inquiryData.buyerEmail}</a></td></tr>
              <tr style="background:#fafafa;"><td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;"><strong>Mobile</strong></td><td style="padding:10px 14px;color:#222;border-bottom:1px solid #eee;"><a href="tel:+91${inquiryData.customerMobile}" style="color:#CC5833;">+91 ${inquiryData.customerMobile}</a></td></tr>
              <tr style="background:#fff;"><td style="padding:10px 14px;color:#555;border-bottom:1px solid #eee;"><strong>Quantity</strong></td><td style="padding:10px 14px;color:#222;border-bottom:1px solid #eee;">${inquiryData.quantity} ${inquiryData.unit}</td></tr>
            </table>
            ${inquiryData.requirements ? `
            <h2 style="color:#2E4036;font-size:16px;margin:0 0 12px;border-bottom:2px solid #2E4036;padding-bottom:8px;">📝 Additional Requirements</h2>
            <div style="background:#fff;border:1px solid #ddd;border-radius:8px;padding:14px;font-size:14px;color:#444;line-height:1.6;">${inquiryData.requirements}</div>
            ` : ''}
            <div style="margin-top:24px;padding:16px;background:#fff8f6;border-left:4px solid #CC5833;border-radius:4px;">
              <p style="margin:0;font-size:13px;color:#555;">💡 <strong>Tip:</strong> Reply directly to this email to contact the buyer at <a href="mailto:${inquiryData.buyerEmail}" style="color:#CC5833;">${inquiryData.buyerEmail}</a></p>
            </div>
          </div>
          <div style="background:#f0f0f0;padding:16px;text-align:center;">
            <p style="color:#aaa;font-size:11px;margin:0;">© 2025 H.K Enterprises · Thane, Maharashtra</p>
          </div>
        </div>
      `,
    });

    otpStore.delete(customer.email.toLowerCase());

    console.log(`✅ Inquiry from ${inquiryData.buyerEmail} for ${inquiryData.productName}`);

    res.status(200).json({
      success: true,
      message: 'Inquiry submitted successfully. The seller will contact you soon.',
      inquiryId: Date.now(),
    });

  } catch (error) {
    console.error('❌ Error processing inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process inquiry',
      details: error.message,
    });
  }
});

app.post("/contact", async (req, res) => {
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
    const transporter = createTransporter();

    await transporter.sendMail({
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
      `,
    });

    console.log('Contact email sent successfully');
    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error('Error sending contact email:', err);
    res.status(500).json({ success: false, error: "Failed to send message", details: err.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl, method: req.method });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    if (process.env.MONGO_URI) {
      await connectDB(process.env.MONGO_URI);
      console.log(" Connected to MongoDB");
    } else {
      console.log("⚠️ MongoDB URI not provided - running without database");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Email configured: ${!!process.env.MY_EMAIL}`);
    });
  } catch (error) {
    console.log("Server startup error:", error);
    process.exit(1);
  }
};

start();
