const { User } = require('../model/user'); // Import the User model

// Controller function to handle user registration
const registerUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { username, email, password, first_name, last_name, address, phone_number } = req.body;

        // Create a new user in the database
        const newUser = await User.create({
            username,
            email,
            password,
            first_name,
            last_name,
            address,
            phone_number
        });

        // Send a success response
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

module.exports = { registerUser };
