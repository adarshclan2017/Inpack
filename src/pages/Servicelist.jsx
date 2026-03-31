import React, { useState } from 'react';
import '../styles/SalesReport.css'; // base empty state
import '../styles/Servicelist.css';

const Servicelist = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    
    // Form state
    const [fromDate, setFromDate] = useState(getTodayDate());
    const [toDate, setToDate] = useState(getTodayDate());
    const [filterSelect, setFilterSelect] = useState('All');
    const [phone, setPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [imei, setImei] = useState('');
    const [billNumber, setBillNumber] = useState('');

    const formatOrPlaceholder = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="sales-report-container">
            <div className="sales-report-header">
                <div style={{ marginRight: 'auto' }}>
                    <h1 className="sl-page-title">Service List Statement</h1>
                </div>
                <button className={`action-btn icon-btn ${isFilterOpen ? 'active' : ''}`} title="Filter options" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                    <i className="fa-solid fa-filter" style={{ fontSize: '18px', color: isFilterOpen ? '#4b9c9c' : 'inherit' }}></i>
                </button>
                <button className="action-btn icon-btn" title="Download report">
                    <i className="fa-solid fa-download" style={{ fontSize: '18px' }}></i>
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

            {/* Desktop Filter Modal */}
            {isFilterOpen && (
                <div className="sl-modal-overlay" onClick={() => setIsFilterOpen(false)}>
                    <div className="sl-filter-modal" onClick={e => e.stopPropagation()}>
                        <div className="sl-modal-header">
                            <h3>Filter Service Statement</h3>
                            <i className="fa-regular fa-circle-xmark sl-close-btn" onClick={() => setIsFilterOpen(false)}></i>
                        </div>
                        
                        <div className="sl-modal-body">
                            <div className="sl-filter-grid">
                                {/* From Date */}
                                <div className="sl-box">
                                    <div className="sl-input-content">
                                        <i className="fa-regular fa-calendar sl-icon"></i>
                                        <span className="sl-divider"></span>
                                        <input 
                                            type="text" 
                                            className="sl-input"
                                            placeholder="From Date"
                                            value={formatOrPlaceholder(fromDate)} 
                                            readOnly 
                                        />
                                        <input 
                                            type="date" 
                                            className="sl-hidden-date"
                                            value={fromDate} 
                                            onChange={(e) => setFromDate(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                {/* To Date */}
                                <div className="sl-box">
                                    <div className="sl-input-content">
                                        <i className="fa-regular fa-calendar sl-icon"></i>
                                        <span className="sl-divider"></span>
                                        <input 
                                            type="text" 
                                            className="sl-input"
                                            placeholder="To Date"
                                            value={formatOrPlaceholder(toDate)} 
                                            readOnly 
                                        />
                                        <input 
                                            type="date" 
                                            className="sl-hidden-date"
                                            value={toDate} 
                                            onChange={(e) => setToDate(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                {/* Filter Select */}
                                <div className="sl-box">
                                    <div className="sl-input-content">
                                        <i className="fa-solid fa-layer-group sl-icon"></i>
                                        <span className="sl-divider"></span>
                                        <select className="sl-input" value={filterSelect} onChange={e => setFilterSelect(e.target.value)}>
                                            <option value="All">All Categories</option>
                                            <option value="Active">Active Services</option>
                                            <option value="Inactive">Inactive Services</option>
                                        </select>
                                        <i className="fa-solid fa-caret-down sl-caret-icon"></i>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="sl-box">
                                    <div className="sl-input-content">
                                        <i className="fa-solid fa-phone sl-icon"></i>
                                        <span className="sl-divider"></span>
                                        <input type="text" className="sl-input" placeholder="Customer Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                        {phone && <i className="fa-solid fa-xmark sl-clear-icon" onClick={() => setPhone('')}></i>}
                                    </div>
                                </div>

                                {/* Customer Name */}
                                <div className="sl-box">
                                    <div className="sl-input-content">
                                        <i className="fa-solid fa-user sl-icon"></i>
                                        <span className="sl-divider"></span>
                                        <input type="text" className="sl-input" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                                        {customerName && <i className="fa-solid fa-xmark sl-clear-icon" onClick={() => setCustomerName('')}></i>}
                                    </div>
                                </div>

                                {/* IMEI Number */}
                                <div className="sl-box">
                                    <div className="sl-input-content">
                                        <i className="fa-solid fa-barcode sl-icon"></i>
                                        <span className="sl-divider"></span>
                                        <input type="text" className="sl-input" placeholder="IMEI Number" value={imei} onChange={e => setImei(e.target.value)} />
                                        {imei && <i className="fa-solid fa-xmark sl-clear-icon" onClick={() => setImei('')}></i>}
                                    </div>
                                </div>

                                {/* Bill Number */}
                                <div className="sl-box">
                                    <div className="sl-input-content">
                                        <i className="fa-solid fa-file-invoice sl-icon"></i>
                                        <span className="sl-divider"></span>
                                        <input type="text" className="sl-input" placeholder="Bill Number" value={billNumber} onChange={e => setBillNumber(e.target.value)} />
                                        {billNumber && <i className="fa-solid fa-xmark sl-clear-icon" onClick={() => setBillNumber('')}></i>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sl-modal-footer">
                            <button className="sl-filter-btn" onClick={() => setIsFilterOpen(false)}>Filter</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Servicelist;
