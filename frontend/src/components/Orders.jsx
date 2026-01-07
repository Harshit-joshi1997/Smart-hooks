import React, { useState, useEffect } from 'react';
import { Package, ShoppingBag, Calendar } from 'lucide-react';
import '../index.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user.email) return;

            try {
                const response = await fetch(`http://localhost:5000/orders?email=${user.email}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [user.email]);

    if (isLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading your orders...</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>My Orders</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track your purchase history</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div style={{
                    background: 'var(--surface)',
                    padding: '3rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    border: '1px dashed var(--border)'
                }}>
                    <ShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h3>No orders yet</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Looks like you haven't made any purchases yet.</p>
                </div>
            ) : (
                <div className="orders-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{
                            background: 'var(--surface)',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    background: 'var(--surface-hover)',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    color: 'var(--primary)'
                                }}>
                                    <Package size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{order.itemName}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        Order #{order.id}
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Quantity</p>
                                    <p style={{ fontWeight: '500' }}>{order.quantity} units</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Unit Price</p>
                                    <p style={{ fontWeight: '500' }}>${order.price}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Total</p>
                                    <p style={{ fontWeight: '700', color: 'var(--success)' }}>${order.total}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Date</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <Calendar size={14} />
                                        <span style={{ fontSize: '0.9rem' }}>{new Date(order.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
