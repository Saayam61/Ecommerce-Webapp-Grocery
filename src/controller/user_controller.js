exports.getIndex = (req, res) => {
    const title = "New Leaf Grocery | Register User";
    return res.render('../view/user/register', { title });
}
const db = require('../model/index');
const User = db.User;

const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    // Perform server-side validation using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('registration-error', { title: 'Registration Error', errors: errors.array() });
    }

    try {
        const { firstName, lastName, dob, address, phone, password, cpassword } = req.body;

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedcPassword = await bcrypt.hash(cpassword, 10);

        // Create the user record with the hashed password
        await User.create({
            firstName,
            lastName,
            dob,
            address,
            phone,
            password: hashedPassword,
            cpassword: hashedcPassword
        });

        // Redirect to a success page or send back a rendered HTML page
        return res.render('registration-success', { title: 'Registration Successful' });
    } catch (error) {
        // Handle validation errors or database errors
        return res.render('registration-error', { title: 'Registration Error', error: error.message });
    }
};
