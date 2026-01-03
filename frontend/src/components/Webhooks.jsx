import React, { useState, useEffect } from 'react';

const Webhooks = () => {
    // Sample data - in a real app this would come from the backend`
    const [webhooks, setWebhooks] = useState([
        { id: 'wh_123', event: 'payment.success', source: 'Stripe', status: 'Success', timestamp: '2023-10-25 14:30:00' },
        { id: 'wh_124', event: 'user.created', source: 'Auth0', status: 'Failed', timestamp: '2023-10-25 15:45:12' },
        { id: 'wh_125', event: 'order.shipped', source: 'Shopify', status: 'Success', timestamp: '2023-10-26 09:15:00' },
    ]);

    return (
        <div className="webhooks-container">
            <div className="dashboard-header">
                <h1>Webhook Management</h1>
                <div className="header-actions">
                    <button className="btn-secondary">Test Endpoint</button>
                    <button className="btn-primary">+ New Webhook</button>
                </div>
            </div>

            <div className="content-section">
                <h2 className="section-title">Recent Deliveries</h2>
                <div className="webhook-list">
                    <div className="webhook-header-row">
                        <span>ID</span>
                        <span>Event</span>
                        <span>Source</span>
                        <span>Status</span>
                        <span>Timestamp</span>
                    </div>
                    {webhooks.map((hook) => (
                        <div key={hook.id} className="webhook-item">
                            <span className="webhook-id">{hook.id}</span>
                            <span className="webhook-event">{hook.event}</span>
                            <span className="webhook-source">{hook.source}</span>
                            <span className={`webhook-status ${hook.status.toLowerCase()}`}>
                                <span className={`dot ${hook.status === 'Success' ? 'green' : 'red'}`}></span>
                                {hook.status}
                            </span>
                            <span className="webhook-time">{hook.timestamp}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Webhooks;
