import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CashTransaction.css';
import '../styles/BankTransaction.css';

const BankTransaction = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('deposit');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [chequeDate, setChequeDate] = useState('');
    const [chequeUtr, setChequeUtr] = useState('');
    const [narration, setNarration] = useState('');
    const [against, setAgainst] = useState('');
    const [receivedBy, setReceivedBy] = useState('');
    const [amount, setAmount] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterRoute, setFilterRoute] = useState('');
    const [filterClass, setFilterClass] = useState('');
    const [customerOnly, setCustomerOnly] = useState(false);

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    const isDeposit = activeTab === 'deposit';

    const handleClear = () => {
        setSelectedAccount('');
        setChequeDate('');
        setChequeUtr('');
        setNarration('');
        setAgainst('');
        setReceivedBy('');
        setAmount('');
    };

    const handleSave = () => {
        alert('Bank transaction saved!');
    };

    return (
        <div className="ct-page">
            {/* Page Header */}
            <div className="ct-header">
                <button className="ct-back-btn" onClick={() => navigate('/welcome')}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="ct-title">Bank Transactions</h1>
                <button className="ct-menu-btn" onClick={() => setIsFilterOpen(true)}>
                    <i className="fa-solid fa-bars-staggered"></i>
                </button>
            </div>

            {/* Tab Bar */}
            <div className="ct-tab-bar">
                <button
                    className={`ct-tab ${isDeposit ? 'active' : ''}`}
                    onClick={() => setActiveTab('deposit')}
                >
                    Bank Deposit
                </button>
                <button
                    className={`ct-tab ${!isDeposit ? 'active' : ''}`}
                    onClick={() => setActiveTab('withdrawal')}
                >
                    Bank Withdrawal
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
                            {/* Bank building icon */}
                            <rect x="100" y="70" width="60" height="5" rx="2" fill="#0d9488" opacity="0.7" />
                            <rect x="106" y="80" width="6" height="32" rx="2" fill="#0d9488" opacity="0.5" />
                            <rect x="117" y="80" width="6" height="32" rx="2" fill="#0d9488" opacity="0.5" />
                            <rect x="128" y="80" width="6" height="32" rx="2" fill="#0d9488" opacity="0.5" />
                            <rect x="139" y="80" width="6" height="32" rx="2" fill="#0d9488" opacity="0.5" />
                            <rect x="100" y="115" width="60" height="5" rx="2" fill="#0d9488" opacity="0.7" />
                            <rect x="125" y="62" width="10" height="10" rx="5" fill="#0d9488" />
                            {/* Content lines */}
                            <rect x="90" y="132" width="50" height="6" rx="3" fill="#e2e8f0" />
                            <rect x="90" y="146" width="60" height="6" rx="3" fill="#e2e8f0" />
                            <rect x="90" y="160" width="40" height="6" rx="3" fill="#e2e8f0" />
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
                            <circle cx="185" cy="55" r="10" fill="#fbbf24" opacity="0.6" />
                            {/* Credit card */}
                            <rect x="175" y="155" width="65" height="42" rx="8" fill="#0d9488" opacity="0.9" />
                            <rect x="175" y="168" width="65" height="10" fill="rgba(0,0,0,0.2)" />
                            <rect x="183" y="183" width="22" height="7" rx="3" fill="rgba(255,255,255,0.5)" />
                            <circle cx="228" cy="187" r="5" fill="#fbbf24" opacity="0.8" />
                            <circle cx="222" cy="187" r="5" fill="#fb923c" opacity="0.8" />
                        </svg>
                    </div>
                    <div className="ct-illustration-label">
                        <h3>{isDeposit ? 'Record Bank Deposit' : 'Record Bank Withdrawal'}</h3>
                        <p>{isDeposit
                            ? 'Log incoming bank transfers, cheques & UTR deposits.'
                            : 'Track outgoing payments and bank withdrawals.'
                        }</p>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="ct-form-panel">
                    {/* Account Select Row */}
                    <div className="ct-select-row">
                        <div className="ct-select-field">
                            <i className="fa-solid fa-building-columns ct-select-icon"></i>
                            <select
                                className="ct-native-select"
                                value={selectedAccount}
                                onChange={(e) => setSelectedAccount(e.target.value)}
                            >
                                <option value="">Select Bank Account</option>
                                <option value="hdfc">HDFC Bank</option>
                                <option value="sbi">State Bank of India</option>
                                <option value="icici">ICICI Bank</option>
                                <option value="axis">Axis Bank</option>
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

                        {/* Cheque Date */}
                        <div className="ct-input-group">
                            <i className="fa-regular fa-calendar ct-input-icon"></i>
                            <div className="ct-float-wrap">
                                <input
                                    id="bt-cheque-date"
                                    type="text"
                                    className="ct-input"
                                    placeholder=" "
                                    value={chequeDate}
                                    onChange={(e) => setChequeDate(e.target.value)}
                                />
                                <label htmlFor="bt-cheque-date" className="ct-float-label">Cheque date</label>
                            </div>
                        </div>

                        {/* Cheque / UTR No */}
                        <div className="ct-input-group bt-utr-group">
                            <i className="fa-regular fa-file ct-input-icon"></i>
                            <div className="bt-utr-wrap">
                                <div className="ct-float-wrap">
                                    <input
                                        id="bt-cheque-utr"
                                        type="text"
                                        className="ct-input"
                                        placeholder=" "
                                        maxLength={50}
                                        value={chequeUtr}
                                        onChange={(e) => setChequeUtr(e.target.value)}
                                    />
                                    <label htmlFor="bt-cheque-utr" className="ct-float-label">Cheque/UTR No</label>
                                </div>
                                <span className="bt-char-count">{chequeUtr.length}/50</span>
                            </div>
                        </div>

                        {/* Narration */}
                        <div className="ct-input-group">
                            <i className="fa-solid fa-pen-to-square ct-input-icon"></i>
                            <div className="ct-float-wrap">
                                <input
                                    id="bt-narration"
                                    type="text"
                                    className="ct-input"
                                    placeholder=" "
                                    value={narration}
                                    onChange={(e) => setNarration(e.target.value)}
                                />
                                <label htmlFor="bt-narration" className="ct-float-label">Narration</label>
                            </div>
                        </div>

                        {/* Received Against / Paid Against */}
                        <div className="ct-input-group">
                            <i className="fa-solid fa-table-cells-large ct-input-icon"></i>
                            <div className="ct-float-wrap">
                                <input
                                    id="bt-against"
                                    type="text"
                                    className="ct-input"
                                    placeholder=" "
                                    value={against}
                                    onChange={(e) => setAgainst(e.target.value)}
                                />
                                <label htmlFor="bt-against" className="ct-float-label">
                                    {isDeposit ? 'Received Against' : 'Paid Against'}
                                </label>
                                {against && (
                                    <button className="ct-clear-btn" onClick={() => setAgainst('')}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Bottom Split Row: Received/Paid by + Amount */}
                        <div className="bt-split-row">
                            <div className="bt-select-wrap">
                                <select
                                    className="bt-inline-select"
                                    value={receivedBy}
                                    onChange={(e) => setReceivedBy(e.target.value)}
                                >
                                    <option value="">{isDeposit ? 'Received by' : 'Paid by'}</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="neft">NEFT</option>
                                    <option value="rtgs">RTGS</option>
                                    <option value="imps">IMPS</option>
                                    <option value="upi">UPI</option>
                                    <option value="cash">Cash</option>
                                </select>
                                <i className="fa-solid fa-chevron-down bt-select-chevron"></i>
                            </div>
                            <div className="bt-amount-wrap">
                                <span className="ct-input-icon ct-rupee-icon">₹</span>
                                <div className="ct-float-wrap">
                                    <input
                                        id="bt-amount"
                                        type="number"
                                        className="ct-input"
                                        placeholder=" "
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min="0"
                                    />
                                    <label htmlFor="bt-amount" className="ct-float-label">Amount</label>
                                </div>
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
                        <div className="ct-filter-header">
                            <h2 className="ct-filter-title">Filter Bank Report</h2>
                            <button className="ct-filter-close" onClick={() => setIsFilterOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        <div className="ct-filter-body">
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
                        <button className="ct-filter-btn" onClick={() => setIsFilterOpen(false)}>
                            <i className="fa-solid fa-filter"></i>
                            Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BankTransaction;
