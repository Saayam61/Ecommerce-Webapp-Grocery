// const express = require('express');
// const router = express.Router();
// const {body} = require('express-validator')
// const userController = require('../controller/userc');

// const validateRegistration = [
//     body('firstName').notEmpty().withMessage('First name is required.')
//                      .isAlpha().withMessage('First name should only contain alphabets.'),
//     body('lastName').notEmpty().withMessage('Last name is required.')
//                     .isAlpha().withMessage('Last name should only contain alphabets.'),
//     body('dob').notEmpty().withMessage('Date of birth is required.')
//                .isISO8601().toDate().withMessage('Invalid date format.')
//                .custom((value) => {
//                     const today = new Date();
//                     const dobDate = new Date(value);
//                     const age = today.getFullYear() - dobDate.getFullYear();
//                     if (age < 10) {
//                         throw new Error('You must be at least 10 years old.');
//                     }
//                     return true;
//                 }),
//     body('address').notEmpty().withMessage('Address is required.')
//                    .matches(/^[A-Za-z0-9\s,'-]*$/).withMessage('Invalid characters in address.'),
//     body('phone').notEmpty().withMessage('Phone number is required.')
//                  .matches(/^\+977\d{10}$/).withMessage('Phone number should start with +977 followed by 10 digits.'),
//     body('password').notEmpty().withMessage('Password is required.')
//                     .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
//                     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
//                     .withMessage('Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.'),
//     body('cpassword').notEmpty().withMessage('Confirm password is required.')
//                      .custom((value, { req }) => {
//                          if (value !== req.body.password) {
//                              throw new Error('Passwords do not match.');
//                          }
//                          return true;
//                      })
// ];

// router.get('/register', userController.register)
// router.post('/register', validateRegistration, userController.createUser)
// router.get('/regdata', userController.getRegistrationData)

// module.exports = router;

// src/routes/userroute.js

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controller/userc');

// Validation middleware for user registration
const validateRegistration = [
    body('firstName').notEmpty().withMessage('First name is required.')
                     .isAlpha().withMessage('First name should only contain alphabets.'),
    body('lastName').notEmpty().withMessage('Last name is required.')
                    .isAlpha().withMessage('Last name should only contain alphabets.'),
    body('dob').notEmpty().withMessage('Date of birth is required.')
               .isISO8601().toDate().withMessage('Invalid date format.')
               .custom((value) => {
                    const today = new Date();
                    const dobDate = new Date(value);
                    const age = today.getFullYear() - dobDate.getFullYear();
                    if (age < 10) {
                        throw new Error('You must be at least 10 years old.');
                    }
                    return true;
                }),
    body('address').notEmpty().withMessage('Address is required.')
                   .matches(/^[A-Za-z0-9\s,'-]*$/).withMessage('Invalid characters in address.'),
    body('phone').notEmpty().withMessage('Phone number is required.')
                 .matches(/^\+977\d{10}$/).withMessage('Phone number should start with +977 followed by 10 digits.'),
    body('password').notEmpty().withMessage('Password is required.')
                    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
                    .withMessage('Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.'),
    body('cpassword').notEmpty().withMessage('Confirm password is required.')
                     .custom((value, { req }) => {
                         if (value !== req.body.password) {
                             throw new Error('Passwords do not match.');
                         }
                         return true;
                     })
];

// Routes for user registration
router.get('/register', userController.getRegistrationPage);
router.post('/register', validateRegistration, userController.registerUser);
// router.get('/registration-success', userController.getRegistrationPage);

module.exports = router;
