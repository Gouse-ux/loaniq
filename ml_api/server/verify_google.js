const axios = require('axios');

async function testGoogleAuth() {
    try {
        const response = await axios.get('http://localhost:5000/api/auth/google', {
            maxRedirects: 0,
            validateStatus: function (status) {
                return status >= 200 && status < 400; // Accept 3xx redirects
            },
        });
        console.log('Google Auth Endpoint status:', response.status);
        console.log('Redirect Location:', response.headers.location);
    } catch (error) {
        console.error('Google Auth Check Failed:', error.message);
    }
}

testGoogleAuth();
