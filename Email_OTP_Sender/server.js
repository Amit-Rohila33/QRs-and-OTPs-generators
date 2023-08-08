const express = require('express');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const email = 'rohila.ashu33@gmail.com'; // Replace with your email address
const appPassword = 'gjehrsutyfcpzdvp'; // Replace with your application-specific password

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: appPassword,
    },
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/otpDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String,
});
const OtpModel = mongoose.model('Otp', otpSchema);

app.post('/login', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const storedOtp = await OtpModel.findOne({ email });
        console.log(storedOtp)
        if (storedOtp && storedOtp.otp === otp) {
            // Delete the stored OTP from the database
            // await OtpModel.deleteOne({ email });
            res.json({ success: true, message: 'Login successful! YAYYYYYYY' });
        } else {
            res.json({ success: false, message: 'Invalid OTP. Please try again.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to verify OTP.' });
    }
});

app.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    const mailOptions = {
        from: 'rohila.ashu33@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to send OTP.' });
        } else {
            try {
                // Store the OTP in the database
                const otpData = new OtpModel({ email, otp });
                console.log(otpData)
                otpData.save();
                res.json({ success: true, message: 'OTP sent successfully!' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'Failed to store OTP.' });
            }
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
