const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');
const db = require('../model'); // Import your database models here

exports.getRegistrationPage = (req, res) => {
    const title = "New Leaf Grocery || Register User";
    const formData = {
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        phone: ''
    }; 
    
    // Initialize formData with empty values
    const errors = [];
    res.render('../view/user/register', { title, formData, errors }); // Pass form data to the registration form
};

exports.registerUser = async (req, res) => {
    // Perform server-side validation using express-validator
    const errors = validationResult(req);
    const title = "New Leaf Grocery || Register User";
    if (!errors.isEmpty()) {
        // If validation fails, send error response with validation errors\
        const data = req.body
        const DOB = new Date(req.body.dob).toISOString().split('T')[0];
        data.dob = DOB
        return res.render('../view/user/register', { title, formData: data, errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const hashedcPassword = await bcrypt.hash(req.body.cpassword, 10);

        // Create a new user in the database using data from the request body
        const newUser = await db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dob: req.body.dob,
            address: req.body.address,
            phone: req.body.phone,
            password: hashedPassword,
            cpassword: hashedcPassword
            // Add other fields here
        });
        

        // If user creation is successful, redirect to success page
        return res.redirect('/registration-success');
    } catch (error) {
        console.error('Error creating user:', error);
        // If an error occurs, send error response
        return res.status(500).json({ error: 'Internal server error' });
    }
};
