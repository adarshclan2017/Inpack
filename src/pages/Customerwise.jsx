import React, { useState } from 'react';
import '../styles/SalesReport.css'; // base empty state
import '../styles/Customerwise.css';

const Customerwise = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const getTodayDate = () => new Date().toISOString().split('T')[0];
    
    // Form state
    const [fromDate, setFromDate] = useState(getTodayDate());
    const [toDate, setToDate] = useState(getTodayDate());
    const [route, setRoute] = useState('');
    const [customerClass, setCustomerClass] = useState('');

    const [locationSearch, setLocationSearch] = useState('');
    const [showLocationOptions, setShowLocationOptions] = useState(false);
    const locations = ['Store 1', 'Store 2', 'Warehouse'];
    const filteredLocations = locations.filter(loc => loc.toLowerCase().includes(locationSearch.toLowerCase()));

    const [categorySearch, setCategorySearch] = useState('');
    const [showCategoryOptions, setShowCategoryOptions] = useState(false);
    const categories = ['Electronics', 'Clothing', 'Food'];
    const filteredCategories = categories.filter(cat => cat.toLowerCase().includes(categorySearch.toLowerCase()));

    const [salesReturn, setSalesReturn] = useState(false);

    const formatOrPlaceholder = (dateStr) => {
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
                <div className="cw-modal-overlay" onClick={() => setIsFilterOpen(false)}>
                    <div className="cw-filter-modal" onClick={e => e.stopPropagation()}>
                        <div className="cw-modal-header">
                            <h3>Filter Customer Wise Sales Report</h3>
                            <i className="fa-regular fa-circle-xmark cw-close-btn" onClick={() => setIsFilterOpen(false)}></i>
                        </div>

                        <div className="cw-modal-body">
                            <div className="cw-filter-grid">
                                {/* From Date */}
                                <div className="cw-box">
                                    <div className="cw-input-content">
                                        <i className="fa-regular fa-calendar cw-icon"></i>
                                        <span className="cw-divider"></span>
                                        <input
                                            type="text"
                                            className="cw-input"
                                            placeholder="From Date"
                                            value={formatOrPlaceholder(fromDate)}
                                            readOnly
                                        />
                                        <input
                                            type="date"
                                            className="cw-hidden-date"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* To Date */}
                                <div className="cw-box">
                                    <div className="cw-input-content">
                                        <i className="fa-regular fa-calendar cw-icon"></i>
                                        <span className="cw-divider"></span>
                                        <input
                                            type="text"
                                            className="cw-input"
                                            placeholder="To Date"
                                            value={formatOrPlaceholder(toDate)}
                                            readOnly
                                        />
                                        <input
                                            type="date"
                                            className="cw-hidden-date"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Select Route */}
                                <div className="cw-box">
                                    <div className="cw-input-content">
                                        <i className="fa-solid fa-route cw-icon"></i>
                                        <span className="cw-divider"></span>
                                        <input type="text" className="cw-input" placeholder="Select Route" value={route} onChange={e => setRoute(e.target.value)} />
                                    </div>
                                </div>

                                {/* Select Class */}
                                <div className="cw-box">
                                    <div className="cw-input-content">
                                        <i className="fa-solid fa-address-book cw-icon"></i>
                                        <span className="cw-divider"></span>
                                        <input type="text" className="cw-input" placeholder="Select Class" value={customerClass} onChange={e => setCustomerClass(e.target.value)} />
                                    </div>
                                </div>

                                {/* Location - Dropdown Search */}
                                <div className="cw-box">
                                    <div className="cw-input-content">
                                        <i className="fa-solid fa-location-dot cw-icon"></i>
                                        <span className="cw-divider"></span>
                                        <input
                                            type="text"
                                            className="cw-input"
                                            placeholder="Location"
                                            value={locationSearch}
                                            onChange={(e) => setLocationSearch(e.target.value)}
                                            onFocus={() => setShowLocationOptions(true)}
                                            onBlur={() => setTimeout(() => setShowLocationOptions(false), 200)}
                                        />
                                        <i className="fa-solid fa-caret-down cw-caret-icon" onClick={() => setShowLocationOptions(!showLocationOptions)}></i>

                                        {showLocationOptions && (
                                            <div className="cw-search-dropdown-menu">
                                                {filteredLocations.length > 0 ? filteredLocations.map(loc => (
                                                    <div key={loc} className="cw-search-dropdown-item" onClick={() => { setLocationSearch(loc); setShowLocationOptions(false); }}>
                                                        {loc}
                                                    </div>
                                                )) : (
                                                    <div className="cw-search-dropdown-item" style={{ color: '#94a3b8', fontStyle: 'italic' }}>No locations found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Category Name - Clear Search */}
                                <div className="cw-box">
                                    <div className="cw-input-content">
                                        <i className="fa-solid fa-tags cw-icon"></i>
                                        <span className="cw-divider"></span>
                                        <input
                                            type="text"
                                            className="cw-input"
                                            placeholder="Category Name"
                                            value={categorySearch}
                                            onChange={(e) => setCategorySearch(e.target.value)}
                                            onFocus={() => setShowCategoryOptions(true)}
                                            onBlur={() => setTimeout(() => setShowCategoryOptions(false), 200)}
                                        />
                                        {categorySearch && <i className="fa-solid fa-xmark cw-clear-icon" onClick={() => setCategorySearch('')}></i>}

                                        {showCategoryOptions && (
                                            <div className="cw-search-dropdown-menu">
                                                {filteredCategories.length > 0 ? filteredCategories.map(cat => (
                                                    <div key={cat} className="cw-search-dropdown-item" onClick={() => { setCategorySearch(cat); setShowCategoryOptions(false); }}>
                                                        {cat}
                                                    </div>
                                                )) : (
                                                    <div className="cw-search-dropdown-item" style={{ color: '#94a3b8', fontStyle: 'italic' }}>No categories found</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Sales Return Checkbox */}
                            <div className="cw-checkbox-row">
                                <label className="cw-checkbox-label">
                                    <input type="checkbox" className="cw-checkbox" checked={salesReturn} onChange={e => setSalesReturn(e.target.checked)} />
                                    <span>Sales Return</span>
                                </label>
                            </div>
                        </div>

                        <div className="cw-modal-footer">
                            <button className="cw-filter-btn" onClick={() => setIsFilterOpen(false)}>Filter</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customerwise;
