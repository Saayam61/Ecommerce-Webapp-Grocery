document.addEventListener('DOMContentLoaded', () => {
    const sendOTPForm = document.getElementById('sendOTPForm');
    const verifyOTPForm = document.getElementById('verifyOTP');
    const message = document.getElementById('message');

    sendOTPForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        try {
            // Send email to backend to send OTP
            const response = await fetch('/sendOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            
            if (response.ok) {
                message.innerText = data.message;
                document.getElementById('otpForm').style.display = 'none';
                document.getElementById('verifyOTPForm').style.display = 'block';
            } else {
                message.innerText = data.error;
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            message.innerText = 'Error sending OTP. Please try again later.';
        }
    });

    verifyOTPForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const otp = document.getElementById('otp').value;
        
        try {
            // Send OTP to backend for verification
            const response = await fetch('/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ otp })
            });
            const data = await response.json();
            
            if (response.ok) {
                message.innerText = data.message;
            } else {
                message.innerText = data.error;
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            message.innerText = 'Error verifying OTP. Please try again later.';
        }
    });
});
