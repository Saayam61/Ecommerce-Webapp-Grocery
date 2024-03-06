const nodemailer = require('nodemailer')
const randomstring = require('randomstring');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'newleafgrocery8@gmail.com', // Your Gmail address
    pass: 'nrwq fazn dbvt rwav' // Your Gmail password
  }
});

// Function to generate random OTP
function generateOTP(length) {
  return randomstring.generate({
    length: length,
    charset: 'numeric'
  });
}

// Function to send OTP via email
function sendOTPByEmail(email, otp) {
  const mailOptions = {
    from: 'newleafgrocery8@gmail.com',
    to: email,
    subject: 'OTP for Registration',
    text: `Your OTP for registration is: ${otp}`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { generateOTP, sendOTPByEmail };
