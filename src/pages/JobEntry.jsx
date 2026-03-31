import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobEntry.css';

/* ─── Sub-component: Service Form ───────────────────────── */
const ServiceForm = ({ onBack }) => {
    const [serviceType, setServiceType] = useState('backend');
    const [phone, setPhone] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [collect, setCollect] = useState('');
    const [status, setStatus] = useState('');
    const [warranty, setWarranty] = useState('non');
    const [serial1, setSerial1] = useState('');
    const [serial2, setSerial2] = useState('');
    const [complaint, setComplaint] = useState('');
    const [technician, setTechnician] = useState('');
    const [expectedDate, setExpectedDate] = useState('');
    const [jobReceived, setJobReceived] = useState('');
    const [estimatedAmount, setEstimatedAmount] = useState('');
    const [advanceReceived, setAdvanceReceived] = useState('');
    const [multiMode, setMultiMode] = useState(false);
    // Customer Details modal
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [custAddress, setCustAddress] = useState('');
    const [custGst, setCustGst] = useState('');
    const [custRoute, setCustRoute] = useState('');
    const [custClass, setCustClass] = useState('');
    const [custState, setCustState] = useState('');

    return (
        <>
        <div className="je-form-page">
            {/* Header */}
            <div className="je-form-header">
                <button className="je-back-btn" onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="je-form-title">Service</h1>
                <div className="je-form-header-actions">
                    <button className="je-icon-btn"><i className="fa-solid fa-rotate-right"></i></button>
                    <button className="je-icon-btn"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>

            {/* Form Body */}
            <div className="je-form-body">
                {/* ── Service Type ─────────────────────────────── */}
                <div className="je-section">
                    <h2 className="je-section-title">Service Type</h2>
                    <div className="je-radio-group">
                        {['quick', 'backend', 'field'].map(type => (
                            <label key={type} className={`je-radio-pill ${serviceType === type ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="serviceType"
                                    value={type}
                                    checked={serviceType === type}
                                    onChange={() => setServiceType(type)}
                                />
                                <span className="je-radio-dot"></span>
                                <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* ── Customer Details ──────────────────────────── */}
                <div className="je-section">
                    <h2 className="je-section-title">Customer Details</h2>
                    <div className="je-card">
                        <div className="je-input-row">
                            <i className="fa-solid fa-phone je-field-icon"></i>
                            <input
                                type="tel"
                                className="je-input"
                                placeholder="Customer Phone number"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <button className="je-add-customer-btn" onClick={() => setShowCustomerModal(true)}>
                                <i className="fa-solid fa-user-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Product Details ───────────────────────────── */}
                <div className="je-section">
                    <h2 className="je-section-title">Product Details</h2>
                    <div className="je-card je-product-card">
                        {/* Brand + Model */}
                        <div className="je-grid-2">
                            <div className="je-input-row je-border-right">
                                <i className="fa-regular fa-square je-field-icon"></i>
                                <input className="je-input" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} />
                            </div>
                            <div className="je-input-row">
                                <i className="fa-solid fa-person-running je-field-icon"></i>
                                <input className="je-input" placeholder="Model" value={model} onChange={e => setModel(e.target.value)} />
                            </div>
                        </div>

                        {/* Color + Collect */}
                        <div className="je-grid-2 je-border-top">
                            <div className="je-input-row je-border-right">
                                <i className="fa-solid fa-palette je-field-icon"></i>
                                <input className="je-input" placeholder="Color" value={color} onChange={e => setColor(e.target.value)} />
                            </div>
                            <div className="je-input-row">
                                <i className="fa-solid fa-box je-field-icon"></i>
                                <input className="je-input" placeholder="Collect" value={collect} onChange={e => setCollect(e.target.value)} />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="je-input-row je-border-top">
                            <i className="fa-solid fa-circle-info je-field-icon"></i>
                            <input className="je-input" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />
                        </div>

                        {/* Warranty Radio */}
                        <div className="je-warranty-row je-border-top">
                            {[
                                { val: 'warranty', label: 'Warranty' },
                                { val: 'out', label: 'Out of warranty' },
                                { val: 'non', label: 'Non warranty' },
                            ].map(w => (
                                <label key={w.val} className={`je-warranty-option ${warranty === w.val ? 'active' : ''}`}>
                                    <input type="radio" name="warranty" value={w.val} checked={warranty === w.val} onChange={() => setWarranty(w.val)} />
                                    <span className="je-warranty-dot"></span>
                                    <span>{w.label}</span>
                                </label>
                            ))}
                        </div>

                        {/* Serial Numbers */}
                        <div className="je-grid-2 je-border-top">
                            <div className="je-input-row je-border-right">
                                <i className="fa-solid fa-table-cells-large je-field-icon"></i>
                                <input className="je-input" placeholder="Serial number" value={serial1} onChange={e => setSerial1(e.target.value)} />
                                <i className="fa-solid fa-qrcode je-field-icon-right"></i>
                            </div>
                            <div className="je-input-row">
                                <input className="je-input" placeholder="Serial number" value={serial2} onChange={e => setSerial2(e.target.value)} />
                                <i className="fa-solid fa-qrcode je-field-icon-right"></i>
                            </div>
                        </div>

                        {/* Complaint */}
                        <div className="je-input-row je-border-top">
                            <i className="fa-solid fa-triangle-exclamation je-field-icon"></i>
                            <input className="je-input" placeholder="Complaint" value={complaint} onChange={e => setComplaint(e.target.value)} />
                        </div>

                        {/* Technician */}
                        <div className="je-input-row je-border-top">
                            <i className="fa-solid fa-user-gear je-field-icon"></i>
                            <input className="je-input" placeholder="Technician" value={technician} onChange={e => setTechnician(e.target.value)} />
                        </div>

                        {/* Attachment Buttons */}
                        <div className="je-attach-row je-border-top">
                            <button className="je-attach-btn" title="Camera">
                                <div className="je-attach-icon-wrap">
                                    <i className="fa-solid fa-camera"></i>
                                </div>
                                <span>Camera</span>
                            </button>
                            <button className="je-attach-btn" title="Gallery">
                                <div className="je-attach-icon-wrap">
                                    <i className="fa-regular fa-image"></i>
                                </div>
                                <span>Gallery</span>
                            </button>
                            <button className="je-attach-btn" title="Lock">
                                <div className="je-attach-icon-wrap">
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                                <span>Lock</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Terms ─────────────────────────────────────── */}
                <div className="je-section">
                    <h2 className="je-section-title">Terms</h2>
                    <div className="je-card je-product-card">
                        <div className="je-grid-2">
                            <div className="je-input-row je-border-right">
                                <i className="fa-regular fa-calendar je-field-icon"></i>
                                <input
                                    type="date"
                                    className="je-input"
                                    value={expectedDate}
                                    onChange={e => setExpectedDate(e.target.value)}
                                    onClick={(e) => e.target.showPicker?.()}
                                />
                            </div>
                            <div className="je-input-row">
                                <input
                                    type="date"
                                    className="je-input"
                                    value={jobReceived}
                                    onChange={e => setJobReceived(e.target.value)}
                                    onClick={(e) => e.target.showPicker?.()}
                                />
                                <i className="fa-regular fa-calendar je-field-icon-right"></i>
                            </div>
                        </div>

                        {/* Estimated amount */}
                        <div className="je-input-row je-border-top">
                            <span className="je-rupee-icon">₹</span>
                            <input className="je-input" placeholder="Estimated amount" type="number" value={estimatedAmount} onChange={e => setEstimatedAmount(e.target.value)} />
                        </div>

                        {/* Advance received */}
                        <div className="je-input-row je-border-top">
                            <span className="je-rupee-icon">₹</span>
                            <input className="je-input" placeholder="Advance received" type="number" value={advanceReceived} onChange={e => setAdvanceReceived(e.target.value)} />
                        </div>

                        {/* Multi mode payment splits toggle */}
                        <div className="je-toggle-row je-border-top">
                            <label className="je-toggle-switch">
                                <input type="checkbox" checked={multiMode} onChange={e => setMultiMode(e.target.checked)} />
                                <span className="je-toggle-track">
                                    <span className="je-toggle-thumb"></span>
                                </span>
                            </label>
                            <span className="je-toggle-label">Multi mode payment splits</span>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="je-form-actions">
                    <button className="je-save-btn" onClick={onBack}>
                        <i className="fa-solid fa-floppy-disk"></i>
                        Save Service
                    </button>
                    <button className="je-cancel-btn" onClick={onBack}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>

            {/* ── Customer Details Modal ──────────────────────── */}
            {showCustomerModal && (
                <div className="je-modal-overlay" onClick={() => setShowCustomerModal(false)}>
                    <div className="je-modal" onClick={e => e.stopPropagation()}>
                        <div className="je-modal-header">
                            <h2 className="je-modal-title">Customer Details</h2>
                            <button className="je-modal-close" onClick={() => setShowCustomerModal(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        <div className="je-modal-card">
                            <div className="je-modal-field">
                                <i className="fa-regular fa-user je-field-icon"></i>
                                <input className="je-input" placeholder="Customer Name" value={custName} onChange={e => setCustName(e.target.value)} />
                                {custName && <button className="je-modal-x" onClick={() => setCustName('')}><i className="fa-solid fa-xmark"></i></button>}
                            </div>
                            <div className="je-modal-field je-border-top">
                                <i className="fa-solid fa-phone je-field-icon"></i>
                                <input type="tel" className="je-input" placeholder="Customer Phone number" value={custPhone} onChange={e => setCustPhone(e.target.value)} />
                                {custPhone && <button className="je-modal-x" onClick={() => setCustPhone('')}><i className="fa-solid fa-xmark"></i></button>}
                            </div>
                            <div className="je-modal-field je-border-top">
                                <i className="fa-solid fa-location-dot je-field-icon"></i>
                                <input className="je-input" placeholder="Address" value={custAddress} onChange={e => setCustAddress(e.target.value)} />
                            </div>
                            <div className="je-modal-field je-border-top">
                                <i className="fa-regular fa-id-card je-field-icon"></i>
                                <input className="je-input" placeholder="Enter GST" value={custGst} onChange={e => setCustGst(e.target.value)} />
                                <span className="je-modal-divider"></span>
                                <button className="je-modal-download"><i className="fa-solid fa-download"></i></button>
                            </div>
                            <div className="je-modal-field je-border-top">
                                <i className="fa-solid fa-route je-field-icon"></i>
                                <input className="je-input" placeholder="Select Route" value={custRoute} onChange={e => setCustRoute(e.target.value)} />
                            </div>
                            <div className="je-modal-field je-border-top">
                                <i className="fa-solid fa-layer-group je-field-icon"></i>
                                <input className="je-input" placeholder="Select class" value={custClass} onChange={e => setCustClass(e.target.value)} />
                            </div>
                            <div className="je-modal-field je-border-top">
                                <i className="fa-solid fa-map je-field-icon"></i>
                                <input className="je-input" placeholder="Select state" value={custState} onChange={e => setCustState(e.target.value)} />
                            </div>
                        </div>

                        <button
                            className="je-modal-save-btn"
                            onClick={() => { setPhone(custPhone); setShowCustomerModal(false); }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

/* ─── Main Component: Job Entry List ─────────────────────── */
const JobEntry = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    const [showFilter, setShowFilter] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(today);
    const [toDate, setToDate] = useState(today);
    const [filterType, setFilterType] = useState('All');
    const [filterPhone, setFilterPhone] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterImei, setFilterImei] = useState('');
    const [filterBill, setFilterBill] = useState('');

    if (view === 'form') {
        return <ServiceForm onBack={() => setView('list')} />;
    }

    return (
        <div className="je-page">
            {/* Header */}
            <div className="je-header">
                <button className="je-back-btn" onClick={() => navigate('/welcome')}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="je-title">Service List</h1>
                <div className="je-header-actions">
                    <button className="je-icon-btn" onClick={() => setShowFilter(true)}>
                        <i className="fa-solid fa-bars-staggered"></i>
                    </button>
                    <button className="je-icon-btn">
                        <i className="fa-solid fa-download"></i>
                    </button>
                </div>
            </div>

            {/* Empty State */}
            <div className="je-empty-state">
                <div className="je-empty-illustration">
                    {/* Inline SVG — woman with "No Data Found" speech bubble */}
                    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Warm circle background */}
                        <circle cx="130" cy="130" r="110" fill="#fdf6ee"/>
                        {/* Speech bubble */}
                        <rect x="60" y="42" width="140" height="44" rx="12" fill="#0d9488"/>
                        <polygon points="105,86 120,86 112,98" fill="#0d9488"/>
                        <text x="130" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">No Data Found</text>
                        {/* Body */}
                        <ellipse cx="130" cy="210" rx="42" ry="14" fill="#e2c9a8" opacity="0.5"/>
                        {/* Shirt */}
                        <path d="M95 175 Q100 155 130 152 Q160 155 165 175 L168 220 H92 Z" fill="#0d9488" opacity="0.85"/>
                        {/* Arms */}
                        <path d="M95 175 Q78 178 75 192" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none"/>
                        <path d="M165 175 Q182 178 185 192" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none"/>
                        {/* Neck */}
                        <rect x="121" y="138" width="18" height="18" rx="4" fill="#f5c89a"/>
                        {/* Head */}
                        <circle cx="130" cy="122" r="32" fill="#f5c89a"/>
                        {/* Eyes */}
                        <ellipse cx="120" cy="120" rx="4" ry="5" fill="#2d1a0e"/>
                        <ellipse cx="140" cy="120" rx="4" ry="5" fill="#2d1a0e"/>
                        {/* Smile */}
                        <path d="M120 133 Q130 140 140 133" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round"/>
                        {/* Hair */}
                        <path d="M100 108 Q102 80 130 76 Q158 80 160 108 Q154 90 130 88 Q106 90 100 108Z" fill="#1a1a2e"/>
                        <path d="M100 108 Q96 130 98 155 Q106 162 108 155 Q110 130 112 118Z" fill="#1a1a2e"/>
                        <path d="M160 108 Q164 130 162 155 Q154 162 152 155 Q150 130 148 118Z" fill="#1a1a2e"/>
                        {/* Badge / ID card on shirt */}
                        <rect x="123" y="165" width="14" height="18" rx="3" fill="white" opacity="0.9"/>
                        <circle cx="130" cy="169" r="3" fill="#fbbf24"/>
                        <rect x="125" y="175" width="10" height="2" rx="1" fill="#94a3b8"/>
                        <rect x="125" y="179" width="7" height="2" rx="1" fill="#94a3b8"/>
                    </svg>
                </div>
                <p className="je-empty-text">Filter to see data</p>
            </div>

            {/* FAB */}
            <button className="je-fab" onClick={() => setView('form')}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* ── Filter Modal ─────────────────────────────── */}
            {showFilter && (
                <div className="je-modal-overlay" onClick={() => setShowFilter(false)}>
                    <div className="je-filter-modal" onClick={e => e.stopPropagation()}>
                        <div className="je-modal-header">
                            <h2 className="je-modal-title">Service List Statement</h2>
                            <button className="je-modal-close" onClick={() => setShowFilter(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        {/* Date Range */}
                        <div className="je-filter-date-row">
                            <div className="je-filter-date-field">
                                <label className="je-filter-date-label">From Date</label>
                                <div className="je-filter-date-inner">
                                    <i className="fa-regular fa-calendar je-field-icon"></i>
                                    <span className="je-filter-divider"></span>
                                    <input
                                        type="date"
                                        className="je-filter-date-input"
                                        value={fromDate}
                                        onChange={e => setFromDate(e.target.value)}
                                        onClick={(e) => e.target.showPicker?.()}
                                    />
                                </div>
                            </div>
                            <div className="je-filter-date-field">
                                <label className="je-filter-date-label">To Date</label>
                                <div className="je-filter-date-inner">
                                    <input
                                        type="date"
                                        className="je-filter-date-input"
                                        value={toDate}
                                        onChange={e => setToDate(e.target.value)}
                                        onClick={(e) => e.target.showPicker?.()}
                                    />
                                    <span className="je-filter-divider"></span>
                                    <i className="fa-regular fa-calendar je-field-icon"></i>
                                </div>
                            </div>
                        </div>

                        {/* Filter Type Dropdown */}
                        <div className="je-filter-select-wrap">
                            <i className="fa-solid fa-filter je-field-icon"></i>
                            <select
                                className="je-filter-select"
                                value={filterType}
                                onChange={e => setFilterType(e.target.value)}
                            >
                                <option>All</option>
                                <option>Quick</option>
                                <option>Backend</option>
                                <option>Field</option>
                            </select>
                            <i className="fa-solid fa-chevron-down je-filter-chevron"></i>
                        </div>

                        {/* Search Fields */}
                        <div className="je-filter-fields">
                            <div className="je-filter-field">
                                <input className="je-input" placeholder="Customer Phone number" value={filterPhone} onChange={e => setFilterPhone(e.target.value)} />
                                {filterPhone && <button className="je-modal-x" onClick={() => setFilterPhone('')}><i className="fa-solid fa-xmark"></i></button>}
                            </div>
                            <div className="je-filter-field">
                                <input className="je-input" placeholder="Customer Name" value={filterName} onChange={e => setFilterName(e.target.value)} />
                                {filterName && <button className="je-modal-x" onClick={() => setFilterName('')}><i className="fa-solid fa-xmark"></i></button>}
                            </div>
                            <div className="je-filter-field">
                                <input className="je-input" placeholder="IMEI Number" value={filterImei} onChange={e => setFilterImei(e.target.value)} />
                                {filterImei && <button className="je-modal-x" onClick={() => setFilterImei('')}><i className="fa-solid fa-xmark"></i></button>}
                            </div>
                            <div className="je-filter-field">
                                <input className="je-input" placeholder="Bill Number" value={filterBill} onChange={e => setFilterBill(e.target.value)} />
                                {filterBill && <button className="je-modal-x" onClick={() => setFilterBill('')}><i className="fa-solid fa-xmark"></i></button>}
                            </div>
                        </div>

                        <button className="je-modal-save-btn" onClick={() => setShowFilter(false)}>
                            Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobEntry;
