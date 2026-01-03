import React, { useState } from 'react';

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

    return (
        <div className="products-container">
            <div className="dashboard-header">
                <h1>Products</h1>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Product</button>
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-placeholder"></div>
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <div className="product-meta">
                                <span className="product-price">{product.price}</span>
                                <span className={`product-stock ${product.stock < 20 ? 'low' : ''}`}>
                                    {product.stock} in stock
                                </span>
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
        </div>
    );
};

export default Products;
