const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

// Set up file storage for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists in your project
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Body parser for form data
app.use(express.urlencoded({ extended: true }));

// Serve the form on the root route (optional, if you want to serve the HTML page directly)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Assumes index.html is in the same directory
});

// Handle the incident form submission
app.post('/submit-incident', upload.single('incident_image'), (req, res) => {
  const { location, incident_description, incident_intensity } = req.body;
  const file = req.file;

  // Log the form data (for testing)
  console.log('Location:', location);
  console.log('Description:', incident_description);
  console.log('Intensity:', incident_intensity);
  console.log('Uploaded File:', file ? file.originalname : 'No file uploaded');

  // Set up the email service (using Gmail as an example)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password'   // Replace with your email password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'bogegeorge4@gmail.com',
    subject: 'New Environmental Incident Report',
    text: `Location: ${location}\n\nDescription: ${incident_description}\n\nIntensity: ${incident_intensity}`,
    attachments: file ? [{ path: file.path }] : [] // Attach file if provided
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.send('Incident report submitted successfully!');
  });
});

// Ensure the 'uploads' directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
