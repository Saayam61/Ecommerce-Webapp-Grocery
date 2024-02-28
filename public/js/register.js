const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const confirmPassword = document.getElementById('confirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.querySelector('img').src = type === 'password' ? '../images/eye-slash.svg' : '../images/eye.svg';
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('registrationForm');

    // Add event listeners to each input field for real-time validation
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const dob = document.getElementById('dob');
    const address = document.getElementById('address');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    firstName.addEventListener('input', validateFirstName);
    lastName.addEventListener('input', validateLastName);
    dob.addEventListener('input', validateDOB);
    address.addEventListener('input', validateAddress);
    phone.addEventListener('input', validatePhone);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);

    form.addEventListener('submit', function (event) {
        // Perform final validation before form submission
        if (!validateFirstName() || !validateLastName() || !validateDOB() || !validateAddress() || !validatePhone() || !validatePassword() || !validateConfirmPassword()) {
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

    // function validatePhone() {
    //     const phoneValue = phone.value.trim();
    //     const phoneRegex = /^\+977\d{10}$/;
    //     if (!phoneRegex.test(phoneValue)) {
    //         displayError('phoneError', 'Phone number should start with +977 followed by 10 digits.');
    //         setInvalidInput(phone);
    //         return false;
    //     } else {
    //         hideError('phoneError');
    //         setValidInput(phone);
    //         return true;
    //     }
    // }

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


    // Function to display server-side validation errors
    // function displayServerErrors(errors) {
    //     errors.forEach(error => {
    //         switch (error.param) {
    //             case 'firstName':
    //                 displayError('firstNameError', error.msg);
    //                 break;
    //             case 'lastName':
    //                 displayError('lastNameError', error.msg);
    //                 break;
    //             case 'dob':
    //                 displayError('dobError', error.msg);
    //                 break;
    //             case 'address':
    //                 displayError('addressError', error.msg);
    //                 break;
    //             case 'phone':
    //                 displayError('phoneError', error.msg);
    //                 break;
    //             case 'password':
    //                 displayError('passwordError', error.msg);
    //                 break;
    //             case 'confirmPassword':
    //                 displayError('confirmPasswordError', error.msg);
    //                 break;
    //             // Add cases for other fields as needed
    //         }
    //     });
    // }

    // // Fetch server-side validation errors if any
    // const serverErrors = document.getElementById('serverErrors');
    // if (serverErrors) {
    //     const errors = JSON.parse(serverErrors.value);
    //     displayServerErrors(errors);
    // }

    // fetch('/regdata')
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Failed to fetch user data');
    //     }
    //     return response.json(); // Parse the JSON response
    // })
    // .then(userData => {
    //     // Check if userData is empty or undefined
    //     if (!userData) {
    //         console.error('User data is empty or undefined');
    //         // Handle this scenario, e.g., display an error message to the user
    //     } else {
    //         // Update form fields with the received user data
    //         document.getElementById('firstName').value = userData.firstName || '';
    //         document.getElementById('lastName').value = userData.lastName || '';
    //         document.getElementById('dob').value = userData.dob || '';
    //         document.getElementById('address').value = userData.address || '';
    //         document.getElementById('phone').value = userData.phone || '';
    //     }
    // })
    // .catch(error => {
    //     console.error('Error fetching user data:', error);
    //     // Display an error message to the user or handle the error in another way
    // });

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
       
        // Get form data
        const response = await fetch('/register', {
            method: 'POST',
            body: formData
        });
        console.log(formData)
        if (response.ok) {
            // If registration is successful, redirect to success page or handle accordingly
            window.location.href = '/registration-success';
        } else {
            // If registration fails (due to validation errors or other reasons), handle errors
            const responseData = await response.json();
            displayServerErrors(responseData.errors);
        }
    });

    function displayServerErrors(errors) {
        // Display server-side validation errors
        errors.forEach(error => {
            const errorElement = document.getElementById(`${error.param}Error`);
            errorElement.innerText = error.msg;
            errorElement.style.display = 'block';
        });
    }

});
