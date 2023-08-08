# OTP Login

OTP Login is a simple web application that allows users to log in using a One-Time Password (OTP) sent to their phone number.

## Features

- Users can enter their phone number and receive an OTP via SMS.
- Users can enter the received OTP to log in.
- Successful login redirects the user to a success page.

## Technologies Used

- Node.js
- Express.js
- Twilio API

## Prerequisites

- Node.js installed on your machine
- Twilio account credentials (Account SID, Auth Token, Verify Service SID)

## Getting Started

1. Clone the repository:
    ``` shell
    git clone https://github.com/Amit-Rohila33/Twilio-OTP-sender


2. Install dependencies:
   ``` shell
   cd otp-login
   npm install

3. Configure Twilio credentials:

   - Open `server.js` file.
   - Replace `'YOUR_ACCOUNT_SID'` with your Twilio Account SID.
   - Replace `'YOUR_AUTH_TOKEN'` with your Twilio Auth Token.
   - Replace `'YOUR_VERIFY_SERVICE_SID'` with your Twilio Verify Service SID.

4. Start the server:
    ``` shell
    npm start


5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. On the homepage, enter your phone number in the provided input field.
2. Click the "Send OTP" button to receive an OTP via SMS.
3. Enter the received OTP in the OTP input field.
4. Click the "Login" button to submit the form.
5. If the OTP is valid, you will be redirected to the success page.


   



