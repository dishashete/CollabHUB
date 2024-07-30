const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const ContactForm = require("./models/ContactForm");

const app = express();
const port = 5001;

mongoose.set("strictQuery", false);

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://dshete2003:RB9tdvI9hVWotzUh@cluster0.xcmnp97.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "deliverys589@gmail.com",
    pass: "trqq wxbm bglo mnyb",
  },
});

app.post("/api/contact", async (req, res) => {
  console.log("Received data:", req.body);

  try {
    // Save form data
    const contactData = new ContactForm(req.body);
    await contactData.save();

    // Prepare email content
    const mailOptions = {
      from: "deliverys589@gmail.com",
      to: contactData.email,
      subject: "Application Received - CollabHUB",
      html: `
        <h1>Thank you for your application!</h1>
        <p>Dear ${contactData.name},</p>
        <p>We have received your application. Here are the details we received:</p>
        <ul>
          <li>Name: ${contactData.name}</li>
          <li>Position: ${contactData.positionInCompany}</li>
          <li>Company: ${contactData.companyName}</li>
          <li>Contact: ${contactData.countryCode} ${
        contactData.contactNumber
      }</li>
          <li>Availability Start Date: ${new Date(
            contactData.availabilityStartDate
          ).toLocaleDateString()}</li>
        </ul>
        <p>We will review your application and get back to you soon.</p>
        <p>Best regards,<br>CollabHUB Team</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    res.status(201).json({
      message: "Form data saved successfully and email sent",
      emailSent: true,
    });
  } catch (error) {
    console.error("Error processing form data:", error);
    res.status(400).json({
      error: "Error processing form data",
      details: error.message,
      emailSent: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
