import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ServiceList.css';

const ServiceList = ({ 
    title = "Service List", 
    statusOptions = [], 
    defaultStatusId = 0,
    onAddNew = null,
    onBack = null,
    onItemClick = null
}) => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serviceList, setServiceList] = useState([]);

    // Date Logic
    const getTodayDate = () => new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(getTodayDate());
    const [toDate, setToDate] = useState(getTodayDate());

    // Filter Logic
    const [internalTypeId, setInternalTypeId] = useState(defaultStatusId);
    const [filterPhone, setFilterPhone] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterImei, setFilterImei] = useState('');
    const [filterBill, setFilterBill] = useState('');

    // Dropdown / AutoFill States
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [filterPhoneResults, setFilterPhoneResults] = useState([]);
    const [filterPhoneDropdown, setFilterPhoneDropdown] = useState(false);
    const [filterNameResults, setFilterNameResults] = useState([]);
    const [filterNameDropdown, setFilterNameDropdown] = useState(false);
    const [filterImeiResults, setFilterImeiResults] = useState([]);
    const [filterImeiDropdown, setFilterImeiDropdown] = useState(false);
    const [filterBillResults, setFilterBillResults] = useState([]);
    const [filterBillDropdown, setFilterBillDropdown] = useState(false);

    const statusDropdownRef = useRef(null);

    const formatOrPlaceholder = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
                setStatusDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchAutoFillInfo = async (query, searchField, setResults, setDropdown) => {
        if (!query.trim()) {
            setResults([]);
            setDropdown(false);
            return;
        }

        try {
            const licenseKey = localStorage.getItem("licenseKey") || "ILT_LIC_9988056";
            const imei = localStorage.getItem("imei") || "ILTUKAInpackPro1";
            const pin = localStorage.getItem("pin") || "2255";
            const internalUserId = localStorage.getItem("internalUserId") || "41";

            const branchName = localStorage.getItem("branchId") || "";
            const branchDetails = JSON.parse(localStorage.getItem("branch_details") || "[]");
            const branchObj = branchDetails.find(b => b.branch_id === branchName);
            const branchId = branchObj ? branchObj.internal_branch_id : "2";

            const url = `/api2025/InPackService.asmx/loadAutoFill?SearchFrom=service&SearchField=${searchField}&InternalBranchID=${branchId}&InternalUserID=${internalUserId}&PageNo=1&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&Query=${encodeURIComponent(query)}`;

            const res = await fetch(url);
            const text = await res.text();

            let jsonStr = '';
            try {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                const stringEl = xmlDoc.getElementsByTagName('string')[0];
                if (stringEl && stringEl.textContent) {
                    jsonStr = stringEl.textContent;
                } else {
                    const m = text.match(/\{[\s\S]*\}/);
                    if (m) jsonStr = m[0];
                    else jsonStr = text;
                }
            } catch (e) {
                jsonStr = text;
            }

            if (jsonStr) {
                try {
                    const data = JSON.parse(jsonStr);
                    const results = data[searchField] || [];
                    
                    const mapped = results.map(item => ({
                        value: item.value || '',
                        id: item.InternalID || ''
                    })).filter(i => i.value && i.value.toLowerCase().includes(query.toLowerCase()));

                    setResults(mapped);
                    setDropdown(mapped.length > 0);
                } catch (e) {
                    setResults([]);
                    setDropdown(false);
                }
            }
        } catch (err) {
            setResults([]);
            setDropdown(false);
        }
    };

    const fetchServiceData = async () => {
        setIsLoading(true);
        try {
            const licenseKey = localStorage.getItem("licenseKey") || "ILT_LIC_9988056";
            const imei = localStorage.getItem("imei") || "ILTUKAInpackPro1";
            const pin = localStorage.getItem("pin") || "2255";
            const internalUserId = localStorage.getItem("internalUserId") || "41";

            const branchName = localStorage.getItem("branchId") || "";
            const branchDetails = JSON.parse(localStorage.getItem("branch_details") || "[]");
            const branchObj = branchDetails.find(b => b.branch_id === branchName);
            const branchId = branchObj ? branchObj.internal_branch_id : "2";

            const url = `/api2025/InPackService.asmx/loadRptServiceDetails?InternalBranchID=${branchId}&FromDate=${fromDate}&ToDate=${toDate}&PageNo=1&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&InternalUserID=${internalUserId}&InternalTypeID=${internalTypeId}&ServiceID=${encodeURIComponent(filterBill)}&SerialNo=${encodeURIComponent(filterImei)}&Name=${encodeURIComponent(filterName)}&PhoneNo=${encodeURIComponent(filterPhone)}`;

            const res = await fetch(url);
            const text = await res.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let jsonStr = '';
            if (stringEl && stringEl.textContent) {
                jsonStr = stringEl.textContent;
            } else {
                const m = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                if (m) jsonStr = m[0];
            }

            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                const results = data.services || data.Table || data.data || [];
                setServiceList(Array.isArray(results) ? results : []);
            }
        } catch (err) {
            console.error('loadRptServiceDetails error:', err);
            setServiceList([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusConfig = (status) => {
        const s = (status || '').toLowerCase();
        if (s.includes('new')) return { color: '#0369a1', bg: '#e0f2fe', border: '#bae6fd' }; // Light Blue
        if (s.includes('deliver') && !s.includes('not')) return { color: '#047857', bg: '#d1fae5', border: '#a7f3d0' }; // Green
        if (s.includes('not deliver')) return { color: '#b91c1c', bg: '#fee2e2', border: '#fecaca' }; // Red
        if (s.includes('complete') && !s.includes('not')) return { color: '#0f766e', bg: '#ccfbf1', border: '#99f6e4' }; // Teal
        if (s.includes('not complete')) return { color: '#b45309', bg: '#fef3c7', border: '#fde68a' }; // Amber
        return { color: '#4b5563', bg: '#f3f4f6', border: '#e5e7eb' }; // Gray
    };

    useEffect(() => {
        fetchServiceData();
    }, []);

    const handleBack = () => {
        if (onBack) onBack();
        else navigate('/welcome');
    };

    return (
        <div className="sl-page">
            <div className="sl-header">
                <button className="sl-back-btn" onClick={handleBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="sl-title">{title}</h1>
                <div className="sl-header-actions">
                    <button className="sl-icon-btn" onClick={() => setIsFilterOpen(true)}>
                        <i className="fa-solid fa-bars-staggered"></i>
                    </button>
                    <button className="sl-icon-btn">
                        <i className="fa-solid fa-download"></i>
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="sl-loading">
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                    <p>Loading services...</p>
                </div>
            ) : serviceList.length > 0 ? (
                <div className="sl-list-container">
                    {serviceList.map((service, idx) => {
                        const config = getStatusConfig(service.Status || service.DeviceState);
                        const cardStyle = { '--status-color': config.color, '--status-bg': config.bg, '--status-border': config.border };
                        
                        return (
                            <div 
                                key={idx} 
                                className="sl-card" 
                                onClick={() => onItemClick && onItemClick(service)}
                                style={{ ...cardStyle, cursor: onItemClick ? 'pointer' : 'default' }}
                            >
                                <div className="sl-card-header">
                                    <span className="sl-job-id">{service.job_no || service.ServiceID || service.ServiceEngineerName || 'N/A'}</span>
                                    <span className="sl-date">{service.Date || service.JobReceivedDate || ''}</span>
                                </div>

                                <div className="sl-card-body">
                                    <div className="sl-customer-info">
                                        <div className="sl-info-row">
                                            <i className="fa-regular fa-user"></i>
                                            <span>{service.CustomerName || service.Name || 'N/A'}</span>
                                        </div>
                                        <div className="sl-info-row">
                                            <i className="fa-solid fa-phone"></i>
                                            <span>{service.Mobile || service.PhoneNo || 'N/A'}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="sl-status-badge">
                                        {service.Status || service.DeviceState || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="sl-empty-state">
                    <div className="sl-empty-illustration">
                        <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="130" cy="130" r="110" fill="#fdf6ee" />
                            <rect x="60" y="42" width="140" height="44" rx="12" fill="#0d9488" />
                            <polygon points="105,86 120,86 112,98" fill="#0d9488" />
                            <text x="130" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">No Data Found</text>
                            <ellipse cx="130" cy="210" rx="42" ry="14" fill="#e2c9a8" opacity="0.5" />
                            <path d="M95 175 Q100 155 130 152 Q160 155 165 175 L168 220 H92 Z" fill="#0d9488" opacity="0.85" />
                            <path d="M95 175 Q78 178 75 192" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none" />
                            <path d="M165 175 Q182 178 185 192" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none" />
                            <rect x="121" y="138" width="18" height="18" rx="4" fill="#f5c89a" />
                            <circle cx="130" cy="122" r="32" fill="#f5c89a" />
                            <ellipse cx="120" cy="120" rx="4" ry="5" fill="#2d1a0e" />
                            <ellipse cx="140" cy="120" rx="4" ry="5" fill="#2d1a0e" />
                            <path d="M120 133 Q130 140 140 133" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
                            <path d="M100 108 Q102 80 130 76 Q158 80 160 108 Q154 90 130 88 Q106 90 100 108Z" fill="#1a1a2e" />
                            <path d="M100 108 Q96 130 98 155 Q106 162 108 155 Q110 130 112 118Z" fill="#1a1a2e" />
                            <path d="M160 108 Q164 130 162 155 Q154 162 152 155 Q150 130 148 118Z" fill="#1a1a2e" />
                            <rect x="123" y="165" width="14" height="18" rx="3" fill="white" opacity="0.9" />
                            <circle cx="130" cy="169" r="3" fill="#fbbf24" />
                            <rect x="125" y="175" width="10" height="2" rx="1" fill="#94a3b8" />
                            <rect x="125" y="179" width="7" height="2" rx="1" fill="#94a3b8" />
                        </svg>
                    </div>
                    <p className="sl-empty-text">Filter to see data</p>
                </div>
            )}

            {onAddNew && (
                <button className="sl-fab" onClick={onAddNew}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            )}

            {isFilterOpen && (
                <div className="sl-modal-overlay" onClick={() => setIsFilterOpen(false)}>
                    <div className="sl-filter-modal" onClick={e => e.stopPropagation()}>
                        <div className="sl-modal-header">
                            <h2 className="sl-modal-title">{title} Statement</h2>
                            <button className="sl-modal-close" onClick={() => setIsFilterOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        <div className="sl-filter-date-row">
                            <div className="sl-filter-date-field">
                                <label>From Date</label>
                                <div className="sl-filter-date-inner">
                                    <i className="fa-regular fa-calendar"></i>
                                    <span className="sl-divider"></span>
                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={e => setFromDate(e.target.value)}
                                        onClick={(e) => e.target.showPicker?.()}
                                    />
                                </div>
                            </div>
                            <div className="sl-filter-date-field">
                                <label>To Date</label>
                                <div className="sl-filter-date-inner">
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={e => setToDate(e.target.value)}
                                        onClick={(e) => e.target.showPicker?.()}
                                    />
                                    <span className="sl-divider"></span>
                                    <i className="fa-regular fa-calendar"></i>
                                </div>
                            </div>
                        </div>

                        {statusOptions.length > 0 && (
                            <div className="sl-filter-select-wrap" ref={statusDropdownRef}>
                                <i className="fa-solid fa-filter"></i>
                                <div 
                                    className="sl-custom-select"
                                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                                >
                                    <span>
                                        {statusOptions.find(opt => opt.id === internalTypeId)?.label || 'All'}
                                    </span>
                                    <i className={`fa-solid fa-chevron-down ${statusDropdownOpen ? 'open' : ''}`}></i>
                                    
                                    {statusDropdownOpen && (
                                        <div className="sl-custom-options">
                                            {statusOptions.map(opt => (
                                                <div 
                                                    key={opt.id}
                                                    className={`sl-custom-option ${internalTypeId === opt.id ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setInternalTypeId(opt.id);
                                                        setStatusDropdownOpen(false);
                                                    }}
                                                >
                                                    {opt.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="sl-filter-fields">
                            {/* Phone */}
                            <div className="sl-filter-field">
                                <input 
                                    placeholder="Customer Phone number" 
                                    value={filterPhone} 
                                    onChange={e => {
                                        setFilterPhone(e.target.value);
                                        fetchAutoFillInfo(e.target.value, 'PhoneNo', setFilterPhoneResults, setFilterPhoneDropdown);
                                    }} 
                                    onFocus={() => { if(filterPhoneResults.length > 0) setFilterPhoneDropdown(true); }}
                                    onBlur={() => setTimeout(() => setFilterPhoneDropdown(false), 150)}
                                />
                                {filterPhone && <i className="fa-solid fa-xmark sl-clear" onClick={() => { setFilterPhone(''); setFilterPhoneResults([]); }}></i>}
                                {filterPhoneDropdown && filterPhoneResults.length > 0 && (
                                    <div className="sl-autofill-dropdown">
                                        {filterPhoneResults.map((r, i) => (
                                            <div key={i} onMouseDown={() => { setFilterPhone(r.value); setFilterPhoneDropdown(false); }}>{r.value}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Name */}
                            <div className="sl-filter-field">
                                <input 
                                    placeholder="Customer Name" 
                                    value={filterName} 
                                    onChange={e => {
                                        setFilterName(e.target.value);
                                        fetchAutoFillInfo(e.target.value, 'Name', setFilterNameResults, setFilterNameDropdown);
                                    }} 
                                    onFocus={() => { if(filterNameResults.length > 0) setFilterNameDropdown(true); }}
                                    onBlur={() => setTimeout(() => setFilterNameDropdown(false), 150)}
                                />
                                {filterName && <i className="fa-solid fa-xmark sl-clear" onClick={() => { setFilterName(''); setFilterNameResults([]); }}></i>}
                                {filterNameDropdown && filterNameResults.length > 0 && (
                                    <div className="sl-autofill-dropdown">
                                        {filterNameResults.map((r, i) => (
                                            <div key={i} onMouseDown={() => { setFilterName(r.value); setFilterNameDropdown(false); }}>{r.value}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* IMEI */}
                            <div className="sl-filter-field">
                                <input 
                                    placeholder="IMEI Number" 
                                    value={filterImei} 
                                    onChange={e => {
                                        setFilterImei(e.target.value);
                                        fetchAutoFillInfo(e.target.value, 'imei', setFilterImeiResults, setFilterImeiDropdown);
                                    }} 
                                    onFocus={() => { if(filterImeiResults.length > 0) setFilterImeiDropdown(true); }}
                                    onBlur={() => setTimeout(() => setFilterImeiDropdown(false), 150)}
                                />
                                {filterImei && <i className="fa-solid fa-xmark sl-clear" onClick={() => { setFilterImei(''); setFilterImeiResults([]); }}></i>}
                                {filterImeiDropdown && filterImeiResults.length > 0 && (
                                    <div className="sl-autofill-dropdown">
                                        {filterImeiResults.map((r, i) => (
                                            <div key={i} onMouseDown={() => { setFilterImei(r.value); setFilterImeiDropdown(false); }}>{r.value}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Bill */}
                            <div className="sl-filter-field">
                                <input 
                                    placeholder="Bill Number" 
                                    value={filterBill} 
                                    onChange={e => {
                                        setFilterBill(e.target.value);
                                        fetchAutoFillInfo(e.target.value, 'ServiceID', setFilterBillResults, setFilterBillDropdown);
                                    }} 
                                    onFocus={() => { if(filterBillResults.length > 0) setFilterBillDropdown(true); }}
                                    onBlur={() => setTimeout(() => setFilterBillDropdown(false), 150)}
                                />
                                {filterBill && <i className="fa-solid fa-xmark sl-clear" onClick={() => { setFilterBill(''); setFilterBillResults([]); }}></i>}
                                {filterBillDropdown && filterBillResults.length > 0 && (
                                    <div className="sl-autofill-dropdown">
                                        {filterBillResults.map((r, i) => (
                                            <div key={i} onMouseDown={() => { setFilterBill(r.value); setFilterBillDropdown(false); }}>{r.value}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button className="sl-submit-btn" onClick={() => { fetchServiceData(); setIsFilterOpen(false); }}>
                            Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceList;
