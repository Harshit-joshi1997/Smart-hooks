const nodemailer = require('nodemailer');

// Create reusable transporter object using the default SMTP transport
// TODO: DATA - Replace with your actual email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfirmation = async (to, orderDetails) => {
    try {
        console.log("Debug: Checking email credentials...");
        console.log("EMAIL_USER present:", !!process.env.EMAIL_USER);
        console.log("EMAIL_PASS present:", !!process.env.EMAIL_PASS);

        // For development/demo purposes without real credentials, we log the email
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('==========================================');
            console.log(`[MOCK EMAIL] To: ${to}`);
            console.log(`Subject: Order Confirmation - Order #${orderDetails.id}`);
            console.log(`Body: Your order for ${orderDetails.itemName} has been placed successfully.`);
            console.log('==========================================');
            return true;
        }

        const info = await transporter.sendMail({
            from: '"NexusApp Store" <noreply@nexusapp.com>', // sender address
            to: to, // list of receivers
            subject: `Order Confirmation - Order #${orderDetails.id}`, // Subject line
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h1 style="color: #6366f1;">Payment Successful!</h1>
                    <p>Hello,</p>
                    <p>Thank you for your purchase. Your order has been placed successfully.</p>
                    
                    <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3>Order Details</h3>
                        <p><strong>Order ID:</strong> #${orderDetails.id}</p>
                        <p><strong>Item:</strong> ${orderDetails.itemName}</p>
                        <p><strong>Quantity:</strong> ${orderDetails.quantity}</p>
                        <p><strong>Price per Unit:</strong> $${orderDetails.price}</p>
                        <p><strong>Total Amount:</strong> $${orderDetails.total}</p>
                    </div>

                    <p>We hope you enjoy your product!</p>
                    <p>Best regards,<br/>The NexusApp Team</p>
                </div>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        return true;
    } catch (error) {
        if (error.code === 'EAUTH') {
            console.error('\n❌ EMAIL AUTHENTICATION FAILED');
            console.error('The password or email provided in .env is incorrect.');
            console.error('👉 If using Gmail: You MUST use an "App Password", not your login password.');
            console.error('1. Go to https://myaccount.google.com/security');
            console.error('2. Enable 2-Step Verification');
            console.error('3. Search for "App Passwords" -> Create one -> Use that 16-char code.\n');
        } else {
            console.error("Error sending email:", error);
        }
        return false;
    }
};

module.exports = { sendOrderConfirmation };
