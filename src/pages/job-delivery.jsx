import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/job-done.css'; // Reusing the identical structurally perfect CSS

const JobDelivery = () => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Form state
    const [fromDate, setFromDate] = useState('28-03-2026');
    const [toDate, setToDate] = useState('28-03-2026');
    const [filterSelect, setFilterSelect] = useState('Not Delivered');
    const [phone, setPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [imei, setImei] = useState('');
    const [billNumber, setBillNumber] = useState('');

    const formatOrPlaceholder = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        if (year && month && day) return `${day}-${month}-${year}`;
        return dateStr; // if it's already DD-MM-YYYY
    };

    return (
        <div className="jd-page">
            <div className="jd-header">
                <button className="jd-back-btn" onClick={() => navigate('/welcome')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="jd-title">Job Delivery</h1>
                <div className="jd-header-actions">
                    <button className="jd-action-btn jd-icon-btn" title="Filter options" onClick={() => setIsFilterOpen(true)}>
                        <i className="fa-solid fa-bars-staggered"></i>
                    </button>
                    <button className="jd-action-btn jd-icon-btn" title="Download report">
                        <i className="fa-solid fa-download"></i>
                    </button>
                </div>
            </div>

            <div className="jd-empty-state-wrapper">
                <div className="jd-illustration-container" style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}>
                    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Circle background */}
                        <circle cx="130" cy="130" r="110" fill="#e8e1da" />

                        {/* Body */}
                        <ellipse cx="130" cy="210" rx="42" ry="14" fill="#d1cdcd" opacity="0.5" />
                        {/* Shirt */}
                        <path d="M95 175 Q100 155 130 152 Q160 155 165 175 L168 220 H92 Z" fill="#2d6a6a" opacity="0.95" />
                        {/* Arms with hands outwards */}
                        <path d="M95 175 Q60 190 85 220" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M165 175 Q200 190 175 220" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none" />
                        {/* Hands */}
                        <circle cx="85" cy="220" r="5" fill="#f5c89a" />
                        <circle cx="175" cy="220" r="5" fill="#f5c89a" />
                        {/* Neck */}
                        <rect x="121" y="138" width="18" height="18" rx="4" fill="#f5c89a" />
                        {/* Head */}
                        <circle cx="130" cy="122" r="32" fill="#f5c89a" />
                        {/* Eyes */}
                        <ellipse cx="120" cy="120" rx="4" ry="5" fill="#2d1a0e" />
                        <ellipse cx="140" cy="120" rx="4" ry="5" fill="#2d1a0e" />
                        {/* O Mouth */}
                        <circle cx="130" cy="135" r="3.5" fill="#5bc0be" />
                        {/* Hair */}
                        <path d="M100 108 Q102 80 130 76 Q158 80 160 108 Q154 90 130 88 Q106 90 100 108Z" fill="#1a1a2e" />
                        <path d="M100 108 Q96 130 98 155 Q106 162 108 155 Q110 130 112 118Z" fill="#1a1a2e" />
                        <path d="M160 108 Q164 130 162 155 Q154 162 152 155 Q150 130 148 118Z" fill="#1a1a2e" />
                        {/* Badge */}
                        <path d="M125 152 L125 166 L135 166 L135 152" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
                        <rect x="123" y="165" width="14" height="18" rx="3" fill="white" opacity="0.9" />
                        <circle cx="130" cy="169" r="3" fill="#fbbf24" />
                        <rect x="125" y="175" width="10" height="2" rx="1" fill="#94a3b8" />
                        <rect x="125" y="179" width="7" height="2" rx="1" fill="#94a3b8" />

                        {/* No Data Found Speech Bubble */}
                        <g transform="rotate(-5, 120, 80)">
                            <path d="M60 55 H185 Q195 55 195 65 V95 Q195 105 185 105 H125 L105 130 L110 105 H60 Q50 105 50 95 V65 Q50 55 60 55Z" fill="#4b9c9c" opacity="0.9" />
                            <text x="123" y="86" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="700" fill="white" textAnchor="middle" opacity="0.95" letterSpacing="0.2">No Data Found</text>
                        </g>
                    </svg>
                </div>
            </div>

            {/* Exactly Matching Filter Modal */}
            {isFilterOpen && (
                <div className="jd-modal-overlay" onClick={() => setIsFilterOpen(false)}>
                    <div className="jd-filter-modal" onClick={e => e.stopPropagation()}>
                        <div className="jd-modal-header">
                            <h3>Service List Statement</h3>
                            <i className="fa-regular fa-circle-xmark jd-close-btn" onClick={() => setIsFilterOpen(false)}></i>
                        </div>

                        <div className="jd-modal-body">
                            {/* Dates Row */}
                            <div className="jd-dates-row">
                                <fieldset className="jd-box jd-date-box">
                                    <legend>From Date</legend>
                                    <div className="jd-input-content">
                                        <i className="fa-regular fa-calendar jd-icon" style={{ zIndex: 1, pointerEvents: 'none' }}></i>
                                        <span className="jd-divider"></span>
                                        <input
                                            type="text"
                                            className="jd-input"
                                            placeholder="From Date"
                                            value={formatOrPlaceholder(fromDate)}
                                            readOnly
                                        />
                                        <input
                                            type="date"
                                            className="jd-hidden-date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                            onClick={(e) => e.target.showPicker?.()}
                                        />
                                    </div>
                                </fieldset>
                                <fieldset className="jd-box jd-date-box">
                                    <legend>To Date</legend>
                                    <div className="jd-input-content">
                                        <input
                                            type="text"
                                            className="jd-input"
                                            placeholder="To Date"
                                            value={formatOrPlaceholder(toDate)}
                                            readOnly
                                        />
                                        <span className="jd-divider"></span>
                                        <i className="fa-regular fa-calendar jd-icon" style={{ zIndex: 1, pointerEvents: 'none' }}></i>
                                        <input
                                            type="date"
                                            className="jd-hidden-date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                            onClick={(e) => e.target.showPicker?.()}
                                        />
                                    </div>
                                </fieldset>
                            </div>

                            {/* Select Dropdown */}
                            <div className="jd-box jd-filter-box">
                                <div className="jd-input-content">
                                    <i className="fa-solid fa-filter jd-icon"></i>
                                    <select className="jd-input" value={filterSelect} onChange={e => setFilterSelect(e.target.value)}>
                                        <option value="Not Delivered">Not Delivered</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="All">All</option>
                                    </select>
                                </div>
                                <i className="fa-solid fa-caret-down jd-caret-icon"></i>
                            </div>

                            <div className="jd-grid-2">
                                {/* Phone Number */}
                                <div className="jd-box jd-filter-box">
                                    <div className="jd-input-content">
                                        <input type="text" className="jd-input" placeholder="Customer Phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                    {phone && <i className="fa-solid fa-xmark jd-clear-icon" onClick={() => setPhone('')} style={{ pointerEvents: 'auto' }}></i>}
                                    {!phone && <i className="fa-solid fa-xmark jd-clear-icon" style={{ pointerEvents: 'none', color: '#cbd5e1', background: 'transparent' }}></i>}
                                </div>

                                {/* Customer Name */}
                                <div className="jd-box jd-filter-box">
                                    <div className="jd-input-content">
                                        <input type="text" className="jd-input" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                                    </div>
                                    {customerName && <i className="fa-solid fa-xmark jd-clear-icon" onClick={() => setCustomerName('')} style={{ pointerEvents: 'auto' }}></i>}
                                    {!customerName && <i className="fa-solid fa-xmark jd-clear-icon" style={{ pointerEvents: 'none', color: '#cbd5e1', background: 'transparent' }}></i>}
                                </div>

                                {/* IMEI Number */}
                                <div className="jd-box jd-filter-box">
                                    <div className="jd-input-content">
                                        <input type="text" className="jd-input" placeholder="IMEI Number" value={imei} onChange={e => setImei(e.target.value)} />
                                    </div>
                                    {imei && <i className="fa-solid fa-xmark jd-clear-icon" onClick={() => setImei('')} style={{ pointerEvents: 'auto' }}></i>}
                                    {!imei && <i className="fa-solid fa-xmark jd-clear-icon" style={{ pointerEvents: 'none', color: '#cbd5e1', background: 'transparent' }}></i>}
                                </div>

                                {/* Bill Number */}
                                <div className="jd-box jd-filter-box">
                                    <div className="jd-input-content">
                                        <input type="text" className="jd-input" placeholder="Bill Number" value={billNumber} onChange={e => setBillNumber(e.target.value)} />
                                    </div>
                                    {billNumber && <i className="fa-solid fa-xmark jd-clear-icon" onClick={() => setBillNumber('')} style={{ pointerEvents: 'auto' }}></i>}
                                    {!billNumber && <i className="fa-solid fa-xmark jd-clear-icon" style={{ pointerEvents: 'none', color: '#cbd5e1', background: 'transparent' }}></i>}
                                </div>
                            </div>
                        </div>

                        <div className="jd-modal-footer">
                            <button className="jd-filter-btn" onClick={() => setIsFilterOpen(false)}>Filter</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDelivery;
