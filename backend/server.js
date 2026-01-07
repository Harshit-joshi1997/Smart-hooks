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
const cors = require('cors');
app.use(cors());

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

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const userJson = await redis.get(`user:${email}`);

        if (!userJson) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = JSON.parse(userJson);

        // Simple password comparison (In production, use bcrypt!)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                email: user.email,
                fullName: user.fullName
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Email Service
const { sendOrderConfirmation } = require('./emailService');

// Create Order Endpoint
app.post('/create-order', async (req, res) => {
    const { email, itemName, price, quantity, total } = req.body;

    if (!email || !itemName || !price || !quantity || !total) {
        return res.status(400).json({ error: 'Missing order details' });
    }

    try {
        const orderId = Date.now().toString();
        const orderData = {
            id: orderId,
            email,
            itemName,
            price,
            quantity,
            total,
            status: 'Paid',
            date: new Date().toISOString()
        };

        // Save order to Redis List (users specific orders)
        await redis.lpush(`orders:${email}`, JSON.stringify(orderData));

        // Send Confirmation Email
        await sendOrderConfirmation(email, orderData);

        res.status(201).json({ message: 'Order placed successfully', order: orderData });
    } catch (error) {
        console.error('Error listing orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Orders Endpoint
app.get('/orders', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email required' });
    }

    try {
        // Fetch all orders from Redis List
        const ordersRaw = await redis.lrange(`orders:${email}`, 0, -1);
        const orders = ordersRaw.map(o => JSON.parse(o));

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
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
