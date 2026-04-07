import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CashTransaction.css';

const CashTransaction = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('receipt');
    const [narration, setNarration] = useState('');
    const [paidAgainst, setPaidAgainst] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterRoute, setFilterRoute] = useState('');
    const [filterClass, setFilterClass] = useState('');
    const [customerOnly, setCustomerOnly] = useState(false);

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    const handleClear = () => {
        setNarration('');
        setPaidAgainst('');
        setAmount('');
        setSelectedAccount('');
    };

    const handleSave = () => {
        alert('Transaction saved!');
    };

    return (
        <div className="ct-page">
            {/* Page Header */}
            <div className="ct-header">
                <button className="ct-back-btn" onClick={() => navigate('/welcome')}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="ct-title">Cash Transactions</h1>
                <button className="ct-menu-btn" onClick={() => setIsFilterOpen(true)}>
                    <i className="fa-solid fa-bars-staggered"></i>
                </button>
            </div>

            {/* Tab Bar */}
            <div className="ct-tab-bar">
                <button
                    className={`ct-tab ${activeTab === 'receipt' ? 'active' : ''}`}
                    onClick={() => setActiveTab('receipt')}
                >
                    Cash Receipt
                </button>
                <button
                    className={`ct-tab ${activeTab === 'payment' ? 'active' : ''}`}
                    onClick={() => setActiveTab('payment')}
                >
                    Cash Payment
                </button>
            </div>

            {/* Main Content */}
            <div className="ct-main">
                {/* Left: Illustration */}
                <div className="ct-illustration-panel">
                    <div className="ct-illustration-wrap">
                        <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Phone body */}
                            <rect x="70" y="30" width="110" height="180" rx="18" fill="#2dd4bf" opacity="0.15" />
                            <rect x="78" y="38" width="94" height="164" rx="14" fill="white" stroke="#2dd4bf" strokeWidth="2" />
                            {/* Screen content lines */}
                            <rect x="90" y="60" width="70" height="8" rx="4" fill="#2dd4bf" opacity="0.5" />
                            <rect x="90" y="76" width="50" height="6" rx="3" fill="#e2e8f0" />
                            <rect x="90" y="90" width="60" height="6" rx="3" fill="#e2e8f0" />
                            <rect x="90" y="104" width="45" height="6" rx="3" fill="#e2e8f0" />
                            <rect x="90" y="118" width="55" height="6" rx="3" fill="#e2e8f0" />
                            {/* Orange receipt strip */}
                            <rect x="86" y="140" width="78" height="48" rx="6" fill="#fb923c" opacity="0.15" />
                            <rect x="92" y="148" width="60" height="5" rx="2" fill="#fb923c" opacity="0.5" />
                            <rect x="92" y="160" width="40" height="5" rx="2" fill="#fb923c" opacity="0.4" />
                            {/* Receipt paper */}
                            <path d="M130 180 L130 220 L148 210 L166 220 L166 180 Z" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
                            <line x1="138" y1="192" x2="158" y2="192" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="138" y1="200" x2="155" y2="200" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                            {/* Teal shield badge */}
                            <circle cx="55" cy="130" r="24" fill="#0d9488" opacity="0.12" />
                            <path d="M55 112 C55 112 43 116 43 125 C43 134 48 140 55 144 C62 140 67 134 67 125 C67 116 55 112 55 112Z" fill="#0d9488" />
                            <path d="M50 129 L54 133 L61 124" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Coins */}
                            <circle cx="200" cy="80" r="18" fill="#fbbf24" opacity="0.9" />
                            <circle cx="200" cy="80" r="13" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                            <text x="200" y="84" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white">₹</text>
                            <circle cx="218" cy="105" r="12" fill="#fbbf24" opacity="0.7" />
                            <circle cx="218" cy="105" r="8" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
                            <text x="218" y="109" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">₹</text>
                            <circle cx="185" cy="55" r="10" fill="#fbbf24" opacity="0.6" />
                            <circle cx="185" cy="55" r="7" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
                            {/* Credit card */}
                            <rect x="175" y="155" width="65" height="42" rx="8" fill="#0d9488" opacity="0.9" />
                            <rect x="175" y="168" width="65" height="10" fill="rgba(0,0,0,0.2)" />
                            <rect x="183" y="183" width="22" height="7" rx="3" fill="rgba(255,255,255,0.5)" />
                            <circle cx="228" cy="187" r="5" fill="#fbbf24" opacity="0.8" />
                            <circle cx="222" cy="187" r="5" fill="#fb923c" opacity="0.8" />
                        </svg>
                    </div>
                    <div className="ct-illustration-label">
                        <h3>{activeTab === 'receipt' ? 'Record Cash Receipt' : 'Record Cash Payment'}</h3>
                        <p>{activeTab === 'receipt'
                            ? 'Log all incoming cash received from customers.'
                            : 'Track outgoing cash payments to suppliers.'
                        }</p>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="ct-form-panel">
                    {/* Account Select Row */}
                    <div className="ct-select-row">
                        <div className="ct-select-field">
                            <i className="fa-regular fa-credit-card ct-select-icon"></i>
                            <select
                                className="ct-native-select"
                                value={selectedAccount}
                                onChange={(e) => setSelectedAccount(e.target.value)}
                            >
                                <option value="">Select Account</option>
                                <option value="cash-in-hand">Cash In Hand</option>
                                <option value="petty-cash">Petty Cash</option>
                                <option value="main-cash">Main Cash Account</option>
                            </select>
                            <i className="fa-solid fa-chevron-down ct-select-chevron"></i>
                        </div>
                        <div className="ct-date-badge">
                            <i className="fa-regular fa-calendar"></i>
                            <span>{formattedDate}</span>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="ct-form-card">
                        {/* Narration */}
                        <div className="ct-form-group">
                            <i className="fa-solid fa-pen-to-square ct-input-icon"></i>
                            <div className="ct-float-wrap">
                                <input
                                    id="ct-narration"
                                    type="text"
                                    className="ct-input"
                                    placeholder=" "
                                    value={narration}
                                    onChange={(e) => setNarration(e.target.value)}
                                />
                                <label htmlFor="ct-narration" className="ct-float-label">Narration</label>
                            </div>
                        </div>

                        {/* Paid Against */}
                        <div className="ct-form-group">
                            <i className="fa-solid fa-table-cells-large ct-input-icon"></i>
                            <div className="ct-float-wrap">
                                <input
                                    id="ct-paid"
                                    type="text"
                                    className="ct-input"
                                    placeholder=" "
                                    value={paidAgainst}
                                    onChange={(e) => setPaidAgainst(e.target.value)}
                                />
                                <label htmlFor="ct-paid" className="ct-float-label">
                                    {activeTab === 'receipt' ? 'Received From' : 'Paid Against'}
                                </label>
                                {paidAgainst && (
                                    <button className="ct-clear-btn" onClick={() => setPaidAgainst('')}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Amount */}
                        <div className="ct-form-group">
                            <span className="ct-input-icon ct-rupee-icon">₹</span>
                            <div className="ct-float-wrap">
                                <input
                                    id="ct-amount"
                                    type="number"
                                    className="ct-input"
                                    placeholder=" "
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="0"
                                />
                                <label htmlFor="ct-amount" className="ct-float-label">Amount</label>
                            </div>
                        </div>
                    </div>

                    {/* Action Toolbar */}
                    <div className="ct-action-bar">
                        <button className="ct-action-btn ct-action-btn--primary" onClick={handleSave} title="Save">
                            <i className="fa-solid fa-floppy-disk"></i>
                            <span>Save</span>
                        </button>
                        <button className="ct-action-btn ct-action-btn--primary" title="Save &amp; Print">
                            <i className="fa-solid fa-file-arrow-down"></i>
                            <span>Save &amp; Print</span>
                        </button>
                        <button className="ct-action-btn ct-action-btn--primary" title="Print">
                            <i className="fa-solid fa-print"></i>
                            <span>Print</span>
                        </button>
                        <button className="ct-action-btn ct-action-btn--danger" onClick={handleClear} title="Clear">
                            <i className="fa-solid fa-xmark"></i>
                            <span>Clear</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Filter Modal */}
            {isFilterOpen && (
                <div className="ct-filter-overlay" onClick={() => setIsFilterOpen(false)}>
                    <div className="ct-filter-modal" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="ct-filter-header">
                            <h2 className="ct-filter-title">Filter Customer Report</h2>
                            <button className="ct-filter-close" onClick={() => setIsFilterOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        {/* Filter Fields */}
                        <div className="ct-filter-body">
                            {/* Select Route */}
                            <div className="ct-filter-field">
                                <i className="fa-solid fa-route ct-filter-field-icon"></i>
                                <input
                                    type="text"
                                    className="ct-filter-input"
                                    placeholder="Select Route"
                                    value={filterRoute}
                                    onChange={(e) => setFilterRoute(e.target.value)}
                                />
                                {filterRoute && (
                                    <button className="ct-filter-clear" onClick={() => setFilterRoute('')}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                            </div>

                            {/* Select Class */}
                            <div className="ct-filter-field">
                                <i className="fa-solid fa-layer-group ct-filter-field-icon"></i>
                                <input
                                    type="text"
                                    className="ct-filter-input"
                                    placeholder="Select Class"
                                    value={filterClass}
                                    onChange={(e) => setFilterClass(e.target.value)}
                                />
                                {filterClass && (
                                    <button className="ct-filter-clear" onClick={() => setFilterClass('')}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                            </div>

                            {/* Customer Only Checkbox */}
                            <label className="ct-filter-check-row">
                                <input
                                    type="checkbox"
                                    className="ct-filter-checkbox"
                                    checked={customerOnly}
                                    onChange={(e) => setCustomerOnly(e.target.checked)}
                                />
                                <span className="ct-filter-check-label">Customer Only</span>
                            </label>
                        </div>

                        {/* Filter Button */}
                        <button
                            className="ct-filter-btn"
                            onClick={() => setIsFilterOpen(false)}
                        >
                            <i className="fa-solid fa-filter"></i>
                            Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CashTransaction;
