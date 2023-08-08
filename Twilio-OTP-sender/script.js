function sendOTP() {
    const phoneNumber = document.getElementById('phoneNumberInput').value;

    fetch('/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phoneNumberInput').value;
    const otp = document.getElementById('otp').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
