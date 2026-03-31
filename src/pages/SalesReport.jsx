import React, { useState } from 'react';
import '../styles/SalesReport.css';

const SalesReport = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    // Get today's date in YYYY-MM-DD format for the date inputs
    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);

    // Format YYYY-MM-DD to DD-MM-YYYY for display purposes to match design exactly
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
            </div>
            
            <div className="empty-state-wrapper fade-in-up">
                <div className="illustration-container">
                    <div className="speech-bubble">
                        No Data Found
                    </div>
                    {/* SVG illustration matching the user's mobile app screen */}
                    <svg width="160" height="150" viewBox="0 0 160 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="person-illustration">
                        <g transform="translate(10, 10)">
                            {/* Body / Shirt */}
                            <path d="M20 140C20 100 40 85 70 85C100 85 120 100 120 140" fill="#4E9B9B" />
                            {/* Hair back */}
                            <path d="M45 55C42 20 98 20 95 55L105 100H35L45 55Z" fill="#111827" />
                            {/* Face / Neck */}
                            <rect x="62" y="65" width="16" height="15" fill="#fca5a5" />
                            <circle cx="70" cy="50" r="24" fill="#ffcdb2" />
                            {/* Hair Front Details */}
                            <path d="M46 50C46 30 60 26 70 26C80 26 94 30 94 50" fill="#111827" />
                            <circle cx="70" cy="50" r="23" fill="#ffcdb2" />
                            {/* Eyes & Mouth */}
                            <circle cx="60" cy="50" r="2.5" fill="#111827" />
                            <circle cx="80" cy="50" r="2.5" fill="#111827" />
                            <circle cx="70" cy="60" r="4" fill="#38bdf8" />
                            <path d="M66 43C68 41 72 41 74 43" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
                            {/* Lanyard Line */}
                            <path d="M55 85L68 110" stroke="#f1f5f9" strokeWidth="2" />
                            <path d="M85 85L72 110" stroke="#f1f5f9" strokeWidth="2" />
                            {/* ID Badge */}
                            <rect x="63" y="105" width="14" height="20" rx="3" fill="white" />
                            <circle cx="70" cy="112" r="3" fill="#fbbf24" />
                            <path d="M66 118H74" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                            {/* Arms */}
                            <path d="M25 110C20 90 5 80 -5 75" stroke="#ffcdb2" strokeWidth="8" strokeLinecap="round" />
                            <path d="M115 110C120 90 135 80 145 75" stroke="#ffcdb2" strokeWidth="8" strokeLinecap="round" />
                        </g>
                    </svg>
                </div>
                <h2 className="empty-state-text">Filter to see data</h2>
            </div>

            {/* Exact Filter Modal */}
            {isFilterOpen && (
                <div className="modal-overlay" onClick={() => setIsFilterOpen(false)}>
                    <div className="filter-modal" onClick={e => e.stopPropagation()}>
                        <div className="filter-modal-header">
                            <h3>Filter Sales Report</h3>
                            <i className="fa-regular fa-circle-xmark close-icon-btn" onClick={() => setIsFilterOpen(false)}></i>
                        </div>
                        <div className="filter-modal-body">
                            <div className="exact-ui-container">
                                <div className="exact-dates-row">
                                    <fieldset className="exact-fieldset">
                                        <legend>From date</legend>
                                        <div className="exact-input-content">
                                            <i className="fa-regular fa-calendar"></i>
                                            <span className="vertical-divider">|</span>
                                            <input 
                                                type="text" 
                                                className="custom-text-display"
                                                value={formatDate(fromDate)} 
                                                readOnly 
                                            />
                                            <input 
                                                type="date" 
                                                className="hidden-date-input"
                                                value={fromDate} 
                                                onChange={(e) => setFromDate(e.target.value)} 
                                            />
                                        </div>
                                    </fieldset>
                                    <fieldset className="exact-fieldset">
                                        <legend>To date</legend>
                                        <div className="exact-input-content">
                                            <input 
                                                type="text" 
                                                className="custom-text-display"
                                                value={formatDate(toDate)} 
                                                readOnly 
                                            />
                                            <span className="vertical-divider">|</span>
                                            <i className="fa-regular fa-calendar" style={{ zIndex: 1, pointerEvents: 'none' }}></i>
                                            <input 
                                                type="date" 
                                                className="hidden-date-input"
                                                value={toDate} 
                                                onChange={(e) => setToDate(e.target.value)} 
                                            />
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="exact-search-box">
                                    <input type="text" placeholder="Search Bill Number" />
                                    <i className="fa-solid fa-xmark" style={{ color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}></i>
                                </div>
                            </div>
                        </div>
                        <div className="filter-modal-footer">
                            <button className="apply-filter-btn" onClick={() => setIsFilterOpen(false)}>Filter</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesReport;