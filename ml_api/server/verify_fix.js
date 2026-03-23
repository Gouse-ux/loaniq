require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/full_stack_ai';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

async function verifyFix() {
    try {
        console.log('Creating test user...');
        const testUser = new User({
            name: 'Test Verify User',
            email: 'testverify@example.com',
            password: 'password123',
            role: 'user'
        });

        console.log('Saving test user...');
        await testUser.save();
        console.log('User saved successfully! Fix confirmed.');

        console.log('Cleaning up...');
        await User.deleteOne({ email: 'testverify@example.com' });
        console.log('Cleanup complete.');

    } catch (error) {
        console.error('Verification failed:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

verifyFix();
