import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Invoice.css';

const Invoice = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);

    // Form states
    const [invNo, setInvNo] = useState('INV-2024-001');
    const [invDate, setInvDate] = useState(new Date().toISOString().split('T')[0]);
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gstin, setGstin] = useState('');
    const [items, setItems] = useState([{ id: 1, name: '', qty: 1, rate: 0, amount: 0 }]);

    const handleClear = () => {
        setCustomerName('');
        setPhone('');
        setAddress('');
        setGstin('');
        setItems([{ id: 1, name: '', qty: 1, rate: 0, amount: 0 }]);
        setShowClearModal(false);
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div className="invoice-page">
            {/* ─── HEADER ─── */}
            <header className="invoice-header">
                <div className="header-left">
                    <button className="header-icon-btn" onClick={() => navigate('/welcome')}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                </div>
                <h1 className="header-title">Create Invoice</h1>
                <div className="header-right">
                    <button className="header-icon-btn" onClick={() => setShowClearModal(true)}>
                        <i className="fa-solid fa-rotate-right"></i>
                    </button>
                    <div className="menu-wrapper">
                        <button className="header-icon-btn" onClick={toggleMenu}>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        {showMenu && (
                            <div className="dropdown-menu">
                                <button className="menu-item">
                                    <span>Download</span>
                                    <i className="fa-solid fa-download"></i>
                                </button>
                                <button className="menu-item">
                                    <span>Print</span>
                                    <i className="fa-solid fa-print"></i>
                                </button>
                                <button className="menu-item">
                                    <span>Share</span>
                                    <i className="fa-brands fa-whatsapp"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* ─── MAIN CONTENT ─── */}
            <main className="invoice-main">
                <div className="invoice-form-container">
                    {/* Basic Info Section */}
                    <div className="form-section">
                        <div className="form-grid-2">
                            <div className="input-wrapper shadow-field">
                                <label>Invoice No</label>
                                <input type="text" value={invNo} onChange={(e) => setInvNo(e.target.value)} />
                            </div>
                            <div className="input-wrapper shadow-field">
                                <label>Date</label>
                                <input type="date" value={invDate} onChange={(e) => setInvDate(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Customer Section */}
                    <div className="form-section section-card">
                        <div className="input-wrapper">
                            <label>Customer Name</label>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    placeholder="Enter or search customer"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <div className="form-grid-2 mt-4">
                            <div className="input-wrapper">
                                <label>Phone</label>
                                <div className="input-with-icon">
                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                            </div>
                            <div className="input-wrapper">
                                <label>GSTIN (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Enter GSTIN"
                                    value={gstin}
                                    onChange={(e) => setGstin(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="input-wrapper mt-4">
                            <label>Billing Address</label>
                            <textarea
                                placeholder="Enter full address"
                                rows="3"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="form-section section-card">
                        <h3 className="section-subtitle">Items / Services</h3>
                        <div className="items-header grid-items">
                            <span>Item Description</span>
                            <span>Qty</span>
                            <span>Rate</span>
                            <span>Amount</span>
                        </div>
                        {items.map((item, index) => (
                            <div key={item.id} className="item-row grid-items mt-2">
                                <input type="text" placeholder="Item name" />
                                <input type="number" placeholder="0" className="text-center" />
                                <input type="number" placeholder="0.00" className="text-right" />
                                <div className="readonly-amount">₹0.00</div>
                            </div>
                        ))}
                        <button className="add-item-btn mt-4">
                            <i className="fa-solid fa-plus"></i> Add Item
                        </button>
                    </div>

                    {/* Summary Section */}
                    <div className="form-summary-container">
                        <div className="summary-card">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹0.00</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (GST)</span>
                                <span>₹0.00</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>Grand Total</span>
                                <span>₹0.00</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="form-actions mt-8">
                        <button className="btn-secondary" onClick={() => setShowClearModal(true)}>
                            Clear All
                        </button>
                        <button className="btn-primary">
                            <i className="fa-solid fa-floppy-disk"></i> Save Invoice
                        </button>
                    </div>
                </div>
            </main>

            {/* ─── MODALS ─── */}
            {showClearModal && (
                <div className="modal-overlay" onClick={() => setShowClearModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="warning-icon">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <h2 className="modal-title">Are you sure?</h2>
                        <p className="modal-desc">This will clear all data. Do you want to continue?</p>
                        <div className="modal-buttons">
                            <button className="modal-btn-no" onClick={() => setShowClearModal(false)}>No</button>
                            <button className="modal-btn-clear" onClick={handleClear}>Clear</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoice;
