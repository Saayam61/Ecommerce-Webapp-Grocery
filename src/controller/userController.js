const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { User } = require('../model/indexModel');
const { generateOTP, sendOTPByEmail } = require('../middleware/OTP');


// Controller to render the registration page
exports.getRegistrationPage = (req, res) => {
    const title = "New Leaf Grocery || Register User";
    const formData = req.flash('formData')[0] || {}; // Get formData from flash
    const errors = req.flash('errors') || [];
    const success = req.flash('success')[0]; 
     // Get errors from flash
    res.render('../view/user/register', { title, formData, errors, success });
};

// Controller to handle user registration
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      // Flash form data and errors, excluding the password
      const { password, cpassword, dob: rawDob, ...formData } = req.body;
      const dob = rawDob.toISOString().split('T')[0]; // Convert Date object to string before splitting
  
      // Extract error messages and map them to objects with a 'msg' property
      const formattedErrors = errors.array();
  
      req.flash('formData', { ...formData, dob });
      req.flash('errors', formattedErrors);
      return res.redirect('/register');
  }

    const { firstName, lastName, dob, address, email, password } = req.body;

        await User.create({
            firstName, lastName, dob, address, email,
            password: await bcrypt.hash(password, 12)
        });
        req.flash('success', "<strong>Registration Complete:</strong><br><br> You're officially registered! Access your account by logging in and enjoy seamless navigation through our services.");
        
        return res.redirect(`/verifyRegistration?email=${email}`)
        
        // Redirect to a different route or render a view
}
exports.getVerificationPage = (req,res)=>{
    const title = "Verify Registration";
    const { email } = req.query
    res.render('../view/user/verifyRegistration', { title, email });
    console.log(email);
}
exports.sendOTP = async (req, res) => {
    const { id:email } = req.params
    console.log(email);
    try {
      // Generate random OTP
      const otp = generateOTP(6);
      
      // Send OTP via email
      await sendOTPByEmail(email, otp);
      
      res.send('OTP sent successfully!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).send('Error sending OTP');
    }
  };
