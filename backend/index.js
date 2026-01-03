const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Backend server is running!');
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
