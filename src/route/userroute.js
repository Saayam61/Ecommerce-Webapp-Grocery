const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { getRegistrationPage, registerUser } = require('../controller/userController');
const catchError = require('../../services/catchError');

// Validation and registration combined into a single function
const validateAndRegisterUser = catchError(async (req, res) => {
    // Validation middleware for user registration
    await body('firstName').notEmpty().isAlpha().withMessage('First name should only contain alphabets.').run(req);
    await body('lastName').notEmpty().isAlpha().withMessage('Last name should only contain alphabets.').run(req);
    await body('dob').notEmpty().isISO8601().toDate().withMessage('Invalid date format.')
        .custom((value) => {
            const today = new Date();
            const dobDate = new Date(value);
            const age = today.getFullYear() - dobDate.getFullYear();
            if (age < 10) {
                throw new Error('You must be at least 10 years old.');
            }
            return true;
        }).run(req);
    await body('address').notEmpty().matches(/^[A-Za-z0-9\s,'-]*$/).withMessage('Invalid characters in address.').run(req);
    await body('phone').notEmpty().matches(/^\+977\d{10}$/).withMessage('Phone number should start with +977 followed by 10 digits.').run(req);
    await body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.').run(req);
    await body('cpassword').notEmpty().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match.');
        }
        return true;
    }).run(req);

    // If validation passes, call the registerUser controller function
    await registerUser(req, res);
});

router.route("/register").get(catchError(getRegistrationPage)).post(catchError(validateAndRegisterUser));

module.exports = router;
