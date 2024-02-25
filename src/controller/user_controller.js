exports.getIndex = (req, res) => {
    const title = "New Leaf Grocery | Register User";
    return res.render('../view/user/register', { title });
}
const db = require('../model/index');
const User = db.User;

// const {where} = require('sequelize')

exports.registerUser = async (req, res) => {
const {firstName, lastName,dob, address, phone, password}  = req.body  
    // try {
        console.log(firstName, lastName,dob,  address, phone,password)
        // console.log(typeof User.create); // Should output 'function'

        await User.create({firstName, lastName,dob, address, phone, password});

        // Redirect to a success page or send back a rendered HTML page
        return res.render('registration-success', { title: 'Registration Successful' });
    //  } catch (error) {
    //      // Handle validation errors or database errors
    //    return res.render('registration-error', { title: 'Registration Error', error: error.message });
    // }
};

