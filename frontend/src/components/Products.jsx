import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import '../index.css';

const PaymentModal = ({ product, onClose, onSuccess }) => {
    const [quantity, setQuantity] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Ensure product.price is a number for calculations
    const numericPrice = parseFloat(product.price.replace('$', ''));
    const total = (numericPrice * quantity).toFixed(2);

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate network delay for payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const response = await fetch('http://localhost:5000/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    itemName: product.name,
                    price: numericPrice, // Use numeric price
                    quantity: parseInt(quantity),
                    total: parseFloat(total)
                })
            });

            if (response.ok) {
                onSuccess({ ...product, quantity, total });
            } else {
                console.error('Payment failed with status:', response.status);
                // Handle specific error messages from backend if any
            }
        } catch (error) {
            console.error('Payment failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '400px' }}>
                <div className="modal-header">
                    <h2>Checkout</h2>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{product.name}</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Price per unit: {product.price}</p>
                </div>

                <form onSubmit={handlePayment}>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Card Details (Simulated)</label>
                        <div className="password-container">
                            <input type="text" placeholder="0000 0000 0000 0000" disabled />
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            * This is a simulated payment gateway
                        </p>
                    </div>

                    <div style={{
                        borderTop: '1px solid var(--border)',
                        marginTop: '1.5rem',
                        paddingTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        <span>Total:</span>
                        <span>${total}</span>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        style={{ marginTop: '1.5rem' }}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : `Pay $${total}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

const SuccessPopup = ({ onClose }) => (
    <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-content" style={{ maxWidth: '350px', textAlign: 'center', padding: '3rem 2rem' }}>
            <div style={{
                color: 'var(--success)',
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <CheckCircle size={64} />
            </div>
            <h2 style={{ marginBottom: '0.5rem' }}>Order Placed!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Your payment was successful. We've sent a confirmation email.
            </p>
            <button className="btn-primary" onClick={onClose}>Continue Shopping</button>
        </div>
    </div>
);

const Products = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Premium Wireless Headphones', price: '$299.00', stock: 45, category: 'Electronics' },
        { id: 2, name: 'Ergonomic Office Chair', price: '$199.50', stock: 12, category: 'Furniture' },
        { id: 3, name: 'Smart Fitness Watch', price: '$149.99', stock: 89, category: 'Wearables' },
        { id: 4, name: 'Mechanical Keyboard', price: '$129.00', stock: 34, category: 'Electronics' },
        { id: 5, name: 'USB-C Docking Station', price: '$89.99', stock: 21, category: 'Accessories' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = {
            id: products.length + 1,
            ...newProduct,
            price: `$${newProduct.price}`
        };
        setProducts([...products, product]);
        setIsModalOpen(false);
        setNewProduct({ name: '', price: '', stock: '', category: '' });
    };

    const handleBuyClick = (product) => {
        setSelectedProduct(product);
    };

    const handlePaymentSuccess = () => {
        setSelectedProduct(null);
        setShowSuccess(true);
    };

    // Filter products based on active tab
    const filteredProducts = products.filter(product => {
        if (activeTab === 'all') return true;
        return product.category.toLowerCase() === activeTab.toLowerCase();
    });

    return (
        <div className="products-container">
            <div className="dashboard-header">
                <div>
                    <h1>Products</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your inventory and catalog</p>
                </div>
                <button className="btn-primary" style={{ width: 'auto' }} onClick={() => setIsModalOpen(true)}>+ Add Product</button>
            </div>

            <div className="product-categories" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', overflowX: 'auto' }}>
                {['all', 'electronics', 'clothing', 'furniture', 'wearables', 'accessories'].map(category => (
                    <button
                        key={category}
                        className={`category-btn ${activeTab === category ? 'active' : ''}`}
                        onClick={() => setActiveTab(category)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            background: activeTab === category ? 'var(--primary)' : 'transparent',
                            color: activeTab === category ? 'white' : 'var(--text-muted)',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-placeholder">
                            <span>{product.category}</span>
                        </div>
                        <div className="product-details">
                            <div className="product-meta" style={{ marginBottom: '0.5rem' }}>
                                <span className="product-category" style={{ margin: 0 }}>{product.category}</span>
                                <span className={`product-stock ${product.stock < 20 ? 'low' : ''}`}>
                                    {product.stock} in stock
                                </span>
                            </div>
                            <h3>{product.name}</h3>
                            <div className="product-meta" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span className="product-price" style={{ fontSize: '1.25rem' }}>{product.price}</span>
                                <button
                                    className="btn-primary"
                                    style={{ width: 'auto', padding: '0.5rem 1rem' }}
                                    onClick={() => handleBuyClick(product)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add New Product</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input
                                    type="number"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedProduct && (
                <PaymentModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            {showSuccess && (
                <SuccessPopup onClose={() => setShowSuccess(false)} />
            )}
        </div>
    );
};

export default Products;
