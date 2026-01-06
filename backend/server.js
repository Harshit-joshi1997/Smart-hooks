require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('./connection');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

// Create User Endpoint
app.post('/create-user', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await redis.get(`user:${email}`);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const userData = {
            fullName,
            email,
            password, // Note: In production, always hash passwords!
            createdAt: new Date().toISOString()
        };

        // Save user to Redis
        await redis.set(`user:${email}`, JSON.stringify(userData));

        console.log(`User created: ${email}`);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Webhook Endpoint
app.post('/webhook', (req, res) => {
    console.log('Webhook Event Received:', req.body);

    // TODO: Add your logic to process the webhook payload here

    res.status(200).json({ message: 'Webhook received successfully' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
