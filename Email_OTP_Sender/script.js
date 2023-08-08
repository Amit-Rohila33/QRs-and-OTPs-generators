function sendOTP() {
    const email = document.getElementById('emailInput').value;

    fetch('/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            alert(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('emailInput').value;
    const otp = document.getElementById('otp').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
            if (data.success) {
                window.location.href = '/success.html'; // Redirect to success page
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
