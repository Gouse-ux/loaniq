const axios = require('axios');

async function testRegistration() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test User ' + Date.now(),
            email: 'test' + Date.now() + '@example.com',
            password: 'password123'
        });
        console.log('Registration Successful:', response.data);
    } catch (error) {
        console.error('Registration Failed:', error.response ? error.response.data : error.message);
    }
}

testRegistration();
