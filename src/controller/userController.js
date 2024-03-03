const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { User } = require('../model/indexModel');

// Controller to render the registration page
exports.getRegistrationPage = (req, res) => {
    const title = "New Leaf Grocery || Register User";
    const formData = req.flash('formData')[0] || {}; // Get formData from flash
    const errors = req.flash('errors') || [];
     // Get errors from flash
    res.render('../view/user/register', { title, formData, errors });
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

    const { firstName, lastName, dob, address, phone, password } = req.body;
    try {
        await User.create({
            firstName, lastName, dob, address, phone,
            password: await bcrypt.hash(password, 12)
        });
        res.redirect('/registration-success');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal server error');
    }
};
