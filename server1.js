require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS for all origins (customize for production)

// MongoDB connection URI (from environment variables)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/reservations';

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if the connection fails
  });

// Reservation Schema
const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  numTravelers: { type: Number, required: true },
  date: { type: String, required: true },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// API route for creating a reservation
app.post('/api/reservation', async (req, res) => {
  const { name, phone, email, numTravelers, date } = req.body;

  // Validate required fields
  if (!name || !phone || !email || !numTravelers || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Save the reservation to MongoDB
  const reservation = new Reservation({
    name,
    phone,
    email,
    numTravelers,
    date,
  });

  try {
    await reservation.save();

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reservation Confirmation',
      text: `Hello ${name},\n\nYour reservation for ${numTravelers} travelers on ${date} has been confirmed.\n\nThank you!`,
    };

    // Send confirmation email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: 'Reservation successful' });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ message: 'Failed to make reservation' });
  }
});
