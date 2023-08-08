const express = require('express');
const twilio = require('twilio');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const accountSid = 'ACd6abb9f50a009066f9515d2b1f9811b3';
const authToken = 'c8154c4cc6ba14083b96723de3d27b32';
const verifySid = 'VA085393075c3f7a901268393b1890056d';
const twilioClient = twilio(accountSid, authToken);

// let otpStorage = {}; // Temporary storage for OTPs

// Handle form submission
app.post('/login', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = req.body.otp;

    console.log(phoneNumber)
    console.log(otp)

    twilioClient.verify.v2.services(verifySid)
        .verificationChecks
        .create({ to: phoneNumber, code: otp })
        .then((verificationCheck) => {
            if (verificationCheck.status === 'approved') {
                // OTP is valid
                res.json({ success: true, message: 'Login successful! YAYYYYYYY' });
            } else {
                // OTP is invalid
                res.json({ success: false, message: 'Invalid OTP. Please try again.' });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
        });
});

// Generate and send OTP
app.post('/send-otp', (req, res) => {
    const phoneNumber = req.body.phoneNumber;

    twilioClient.verify.v2.services(verifySid)
        .verifications
        .create({ to: phoneNumber, channel: 'sms' })
        .then((verification) => {
            // console.log(verification.status);
            res.json({ success: true, message: 'OTP sent successfully!' });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ success: false, message: 'Failed to send OTP.' });
        });
});
app.get('/success', (req, res) => {
    res.send(__dirname + 'Login successful!');
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// ...


// ...


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
