const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.querySelector('img').src = type === 'password' ? '/images/eye-slash.svg' : '/images/eye.svg';
});

const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPassword = document.getElementById('confirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.querySelector('img').src = type === 'password' ? '/images/eye-slash.svg' : '/images/eye.svg';
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('registrationForm');

    // Add event listeners to each input field for real-time validation
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const dob = document.getElementById('dob');
    const address = document.getElementById('address');
    const phone = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    firstName.addEventListener('input', validateFirstName);
    lastName.addEventListener('input', validateLastName);
    dob.addEventListener('input', validateDOB);
    address.addEventListener('input', validateAddress);
    phone.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);

    form.addEventListener('submit', function (event) {
        // Perform final validation before form submission
        if (!validateFirstName() || !validateLastName() || !validateDOB() || !validateAddress() || !validateEmail() || !validatePassword() || !validateConfirmPassword()) {
            // Prevent the default form submission if any validation fails
            event.preventDefault();
        }
    });

    function validateFirstName() {
        const firstNameValue = firstName.value.trim();
        if (!/^[A-Za-z]+$/.test(firstNameValue)) {
            displayError('firstNameError', 'First name should only contain alphabets.');
            setInvalidInput(firstName);
            return false;
        } else {
            hideError('firstNameError');
            setValidInput(firstName);
            return true;
        }
    }

    function validateLastName() {
        const lastNameValue = lastName.value.trim();
        if (!/^[A-Za-z]+$/.test(lastNameValue)) {
            displayError('lastNameError', 'Last name should only contain alphabets.');
            setInvalidInput(lastName);
            return false;
        } else {
            hideError('lastNameError');
            setValidInput(lastName);
            return true;
        }
    }

    function validateDOB() {
        const today = new Date();
        const dobDate = new Date(dob.value);
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age < 10) {
            displayError('dobError', 'You must be at least 10 years old.');
            setInvalidInput(dob);
            return false;
        } else {
            hideError('dobError');
            setValidInput(dob);
            return true;
        }
    }

    function validateAddress() {
        const addressValue = address.value.trim();
        if (!/^[A-Za-z0-9\s,'-]*$/.test(addressValue)) {
            displayError('addressError', 'Invalid characters in address.');
            setInvalidInput(address);
            return false;
        } else {
            hideError('addressError');
            setValidInput(address);
            return true;
        }
    }

    function validateEmail() {
        const emailValue = email.value.trim(); // Assuming there's an input field with id 'email'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation
        if (!emailRegex.test(emailValue)) {
            displayError('emailError', 'Invalid email address.');
            setInvalidInput(email);
            return false;
        } else {
            hideError('emailError');
            setValidInput(email);
            return true;
        }
    }
    

    function validatePassword() {
        const passwordValue = password.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(passwordValue)) {
            displayError('passwordError', 'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol.');
            setInvalidInput(password);
            return false;
        } else {
            hideError('passwordError');
            setValidInput(password);
            return true;
        }
    }

    function validateConfirmPassword() {
        const confirmPasswordValue = confirmPassword.value;
        if (confirmPasswordValue !== password.value) {
            displayError('confirmPasswordError', 'Passwords do not match.');
            setInvalidInput(confirmPassword);
            return false;
        } else {
            hideError('confirmPasswordError');
            setValidInput(confirmPassword);
            return true;
        }
    }

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

