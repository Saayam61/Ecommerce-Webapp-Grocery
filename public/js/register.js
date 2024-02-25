const togglePassword = document.getElementById('togglePassword');
        const password = document.getElementById('password');

        togglePassword.addEventListener('click', function () {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.querySelector('img').src = type === 'password' ? '../images/eye-slash.svg' : '../images/eye.svg';
        });

        const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
        const confirmPassword = document.getElementById('confirmPassword');

        toggleConfirmPassword.addEventListener('click', function () {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.querySelector('img').src = type === 'password' ? '../images/eye-slash.svg' : '../images/eye.svg';
        });

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        let valid = true;

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const dob = document.getElementById('dob');
        const address = document.getElementById('address');
        const phone = document.getElementById('phone');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        // Validate first name
        if (!/^[A-Za-z]+$/.test(firstName.value)) {
            valid = false;
            displayError('firstNameError', 'First name should only contain alphabets.');
            setInvalidInput(firstName);
        } else {
            hideError('firstNameError');
            setValidInput(firstName);
        }

        // Validate last name
        if (!/^[A-Za-z]+$/.test(lastName.value)) {
            valid = false;
            displayError('lastNameError', 'Last name should only contain alphabets.');
            setInvalidInput(lastName);
        } else {
            hideError('lastNameError');
            setValidInput(lastName);
        }

        // Validate date of birth
        const today = new Date();
        const dobDate = new Date(dob.value);
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age < 10) {
            valid = false;
            displayError('dobError', 'You must be at least 10 years old.');
            setInvalidInput(dob);
        } else {
            hideError('dobError');
            setValidInput(dob);
        }

        // Validate address
        if (!/^[A-Za-z,]+$/.test(address.value)) {
            valid = false;
            displayError('addressError', 'Address should only contain alphabets and comma.');
            setInvalidInput(address);
        } else {
            hideError('addressError');
            setValidInput(address);
        }

        // Validate phone number
        if (!/^(\+977)?\d{10}$/.test(phone.value)) {
            valid = false;
            displayError('phoneError', 'Phone number should contain 10 digits.');
            setInvalidInput(phone);
        } else {
            hideError('phoneError');
            setValidInput(phone);
        }

        // Concatenate country code with phone number
        const fullPhoneNumber = '+977' + phone.value;

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password.value)) {
            valid = false;
            displayError('passwordError', 'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol.');
            setInvalidInput(password);
        } else {
            hideError('passwordError');
            setValidInput(password);
        }

        // Validate confirm password
        if (password.value !== confirmPassword.value) {
            valid = false;
            displayError('confirmPasswordError', 'Passwords do not match.');
            setInvalidInput(confirmPassword);
        } else {
            hideError('confirmPasswordError');
            setValidInput(confirmPassword);
        }

        if (!valid) {
            // Prevent the default form submission if any validation fails
            event.preventDefault();
        } else {
            // For demonstration purposes, you can log the registration details to the console
            console.log('Registration Details:');
            console.log('First Name:', firstName.value);
            console.log('Last Name:', lastName.value);
            console.log('Date of Birth:', dob.value);
            console.log('Phone Number:', fullPhoneNumber);
            console.log('Password:', password.value);
            // You can include further processing steps here, such as sending the registration data to the server

            // For now, let's just display a success message
            alert('Registration successful!');
        }
    });

    function displayError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }

    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.innerText = '';
        errorElement.style.display = 'none';
    }

    function setInvalidInput(inputElement) {
        inputElement.style.borderColor = 'red';
    }

    function setValidInput(inputElement) {
        inputElement.style.borderColor = 'green';
    }
});