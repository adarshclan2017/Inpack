import React, { useState } from 'react';
import '../styles/SalesReport.css'; // base empty state
import '../styles/Periodiccollection.css';

const Periodiccollection = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Form state
    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    // Inputs
    const [customerName, setCustomerName] = useState('');
    const [route, setRoute] = useState('');
    const [customerClass, setCustomerClass] = useState('');

    // Checkboxes
    const [sort, setSort] = useState(false);
    const [cashReceipt, setCashReceipt] = useState(true);
    const [bankDeposit, setBankDeposit] = useState(true);
    const [cashPayment, setCashPayment] = useState(true);
    const [bankWithdrawal, setBankWithdrawal] = useState(true);

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="sales-report-container">
            <div className="sales-report-header">
                <button className="action-btn icon-btn" title="Filter options" onClick={() => setIsFilterOpen(true)}>
                    <i className="fa-solid fa-filter" style={{ fontSize: '18px' }}></i>
                </button>
                <button className="action-btn icon-btn" title="Download report">
                    <i className="fa-solid fa-download" style={{ fontSize: '18px' }}></i>
                </button>
                <button className="action-btn icon-btn" title="Print statement">
                    <i className="fa-solid fa-print" style={{ fontSize: '18px' }}></i>
                </button>
            </div>
            
            <div className="empty-state-wrapper fade-in-up">
                <div className="illustration-container">
                    <div className="speech-bubble">
                        No Data Found
                    </div>
                    {/* SVG illustration */}
                    <svg width="160" height="150" viewBox="0 0 160 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="person-illustration">
                        <g transform="translate(10, 10)">
                            <path d="M20 140C20 100 40 85 70 85C100 85 120 100 120 140" fill="#4E9B9B" />
                            <path d="M45 55C42 20 98 20 95 55L105 100H35L45 55Z" fill="#111827" />
                            <rect x="62" y="65" width="16" height="15" fill="#fca5a5" />
                            <circle cx="70" cy="50" r="24" fill="#ffcdb2" />
                            <path d="M46 50C46 30 60 26 70 26C80 26 94 30 94 50" fill="#111827" />
                            <circle cx="70" cy="50" r="23" fill="#ffcdb2" />
                            <circle cx="60" cy="50" r="2.5" fill="#111827" />
                            <circle cx="80" cy="50" r="2.5" fill="#111827" />
                            <circle cx="70" cy="60" r="4" fill="#38bdf8" />
                            <path d="M66 43C68 41 72 41 74 43" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M55 85L68 110" stroke="#f1f5f9" strokeWidth="2" />
                            <path d="M85 85L72 110" stroke="#f1f5f9" strokeWidth="2" />
                            <rect x="63" y="105" width="14" height="20" rx="3" fill="white" />
                            <circle cx="70" cy="112" r="3" fill="#fbbf24" />
                            <path d="M66 118H74" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                            <path d="M25 110C20 90 5 80 -5 75" stroke="#ffcdb2" strokeWidth="8" strokeLinecap="round" />
                            <path d="M115 110C120 90 135 80 145 75" stroke="#ffcdb2" strokeWidth="8" strokeLinecap="round" />
                        </g>
                    </svg>
                </div>
                <h2 className="empty-state-text">Filter to see data</h2>
            </div>

            {/* Exactly Matching Filter Modal */}
            {isFilterOpen && (
                <div className="pc-modal-overlay" onClick={() => setIsFilterOpen(false)}>
                    <div className="pc-filter-modal" onClick={e => e.stopPropagation()}>
                        <div className="pc-modal-header">
                            <h3>Periodic Collection Statement</h3>
                            <i className="fa-regular fa-circle-xmark pc-close-btn" onClick={() => setIsFilterOpen(false)}></i>
                        </div>
                        
                        <div className="pc-modal-body">
                            {/* Fieldset Dates Row */}
                            <div className="pc-dates-row">
                                <fieldset className="pc-fieldset">
                                    <legend>From Date</legend>
                                    <div className="pc-input-content">
                                        <i className="fa-regular fa-calendar pc-icon"></i>
                                        <span className="pc-divider">|</span>
                                        <input 
                                            type="text" 
                                            className="pc-input"
                                            value={formatDate(fromDate)} 
                                            readOnly 
                                        />
                                        <input 
                                            type="date" 
                                            className="pc-hidden-date"
                                            value={fromDate} 
                                            onChange={(e) => setFromDate(e.target.value)} 
                                        />
                                    </div>
                                </fieldset>
                                <fieldset className="pc-fieldset">
                                    <legend>To Date</legend>
                                    <div className="pc-input-content">
                                        <input 
                                            type="text" 
                                            className="pc-input"
                                            value={formatDate(toDate)} 
                                            readOnly 
                                        />
                                        <span className="pc-divider">|</span>
                                        <i className="fa-regular fa-calendar pc-icon" style={{ zIndex: 1, pointerEvents: 'none' }}></i>
                                        <input 
                                            type="date" 
                                            className="pc-hidden-date"
                                            value={toDate} 
                                            onChange={(e) => setToDate(e.target.value)} 
                                        />
                                    </div>
                                </fieldset>
                            </div>

                            {/* Customer Name */}
                            <div className="pc-box">
                                <div className="pc-input-content">
                                    <i className="fa-regular fa-user pc-icon"></i>
                                    <input type="text" className="pc-input" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                                </div>
                                <i className="fa-solid fa-xmark pc-clear-icon" onClick={() => setCustomerName('')} style={{ pointerEvents: 'auto' }}></i>
                            </div>

                            {/* Select Route */}
                            <div className="pc-box">
                                <div className="pc-input-content">
                                    <i className="fa-solid fa-route pc-icon"></i>
                                    <input type="text" className="pc-input" placeholder="Select Route" value={route} onChange={e => setRoute(e.target.value)} />
                                </div>
                            </div>

                            {/* Select Class */}
                            <div className="pc-box">
                                <div className="pc-input-content">
                                    <i className="fa-solid fa-address-book pc-icon"></i>
                                    <input type="text" className="pc-input" placeholder="Select class" value={customerClass} onChange={e => setCustomerClass(e.target.value)} />
                                </div>
                            </div>

                            {/* 5-Checkbox CSS Grid */}
                            <div className="pc-checkbox-grid">
                                <label className="pc-checkbox-label">
                                    <input type="checkbox" className="pc-checkbox" checked={sort} onChange={e => setSort(e.target.checked)} />
                                    <span>Sort</span>
                                </label>
                                <label className="pc-checkbox-label">
                                    <input type="checkbox" className="pc-checkbox" checked={cashReceipt} onChange={e => setCashReceipt(e.target.checked)} />
                                    <span>Cash Receipt</span>
                                </label>
                                <label className="pc-checkbox-label">
                                    <input type="checkbox" className="pc-checkbox" checked={bankDeposit} onChange={e => setBankDeposit(e.target.checked)} />
                                    <span>Bank Deposit</span>
                                </label>
                                
                                <div></div> {/* Empty bottom-left to offset 2nd row checkboxes */}
                                
                                <label className="pc-checkbox-label">
                                    <input type="checkbox" className="pc-checkbox" checked={cashPayment} onChange={e => setCashPayment(e.target.checked)} />
                                    <span>Cash Payment</span>
                                </label>
                                <label className="pc-checkbox-label">
                                    <input type="checkbox" className="pc-checkbox" checked={bankWithdrawal} onChange={e => setBankWithdrawal(e.target.checked)} />
                                    <span>Bank Withdrawal</span>
                                </label>
                            </div>
                        </div>

                        <div className="pc-modal-footer">
                            <button className="pc-filter-btn" onClick={() => setIsFilterOpen(false)}>Filter</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Periodiccollection;
