import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    const [showSignature, setShowSignature] = useState(false);

    // ── Signature pad ───────────────────────────────────────
    const canvasRef   = useRef(null);
    const isDrawing   = useRef(false);
    const lastPos     = useRef(null);
    const ctxRef      = useRef(null);

    // Return position in CSS-space coords relative to canvas
    const getCSSPos = (e) => {
        const canvas = canvasRef.current;
        const rect   = canvas.getBoundingClientRect();
        const src    = e.touches ? e.touches[0] : e;
        return {
            x: src.clientX - rect.left,
            y: src.clientY - rect.top,
        };
    };

    // Initialise canvas size whenever panel opens
    useEffect(() => {
        if (!showSignature) return;

        // Let the DOM paint first so offsetWidth is correct
        const frame = requestAnimationFrame(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const w   = canvas.offsetWidth;
            const h   = canvas.offsetHeight;

            canvas.width  = w * dpr;
            canvas.height = h * dpr;

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);           // coordinate space = CSS pixels
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth   = 2.5;
            ctx.lineCap     = 'round';
            ctx.lineJoin    = 'round';
            ctxRef.current  = ctx;
        });

        return () => cancelAnimationFrame(frame);
    }, [showSignature]);

    // Attach non-passive touch listeners manually to override browser scroll
    useEffect(() => {
        if (!showSignature) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const onTouchStart = (e) => {
            e.preventDefault();
            isDrawing.current = true;
            lastPos.current = getCSSPos(e);
        };

        const onTouchMove = (e) => {
            e.preventDefault();
            if (!isDrawing.current || !ctxRef.current) return;
            const pos = getCSSPos(e);
            const ctx = ctxRef.current;
            ctx.beginPath();
            ctx.moveTo(lastPos.current.x, lastPos.current.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            lastPos.current = pos;
        };

        const onTouchEnd = (e) => {
            e.preventDefault();
            isDrawing.current = false;
            lastPos.current   = null;
        };

        // { passive: false } lets us call preventDefault() to stop the page scrolling
        canvas.addEventListener('touchstart', onTouchStart, { passive: false });
        canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });
        canvas.addEventListener('touchend',   onTouchEnd,   { passive: false });

        return () => {
            canvas.removeEventListener('touchstart', onTouchStart);
            canvas.removeEventListener('touchmove',  onTouchMove);
            canvas.removeEventListener('touchend',   onTouchEnd);
        };
    }, [showSignature]);

    // Mouse handlers (desktop)
    const startDraw = useCallback((e) => {
        if (e.type !== 'mousedown') return;
        isDrawing.current = true;
        lastPos.current   = getCSSPos(e);
    }, []);

    const draw = useCallback((e) => {
        if (e.type !== 'mousemove') return;
        if (!isDrawing.current || !ctxRef.current) return;
        const pos = getCSSPos(e);
        const ctx = ctxRef.current;
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastPos.current = pos;
    }, []);

    const stopDraw = useCallback(() => {
        isDrawing.current = false;
        lastPos.current   = null;
    }, []);

    const clearSignature = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx    = ctxRef.current;
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, []);
    // Customer Details modal
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [custAddress, setCustAddress] = useState('');
    const [custGst, setCustGst] = useState('');
    const [custRoute, setCustRoute] = useState('');
    const [custClass, setCustClass] = useState('');
    const [custState, setCustState] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [fetchError, setFetchError] = useState('');

    const handleCustomerSearch = async (query) => {
        setCustName(query);
        setFetchError('');
        
        // Reset phone and other details whenever the name is changed
        setCustPhone('');
        setCustAddress('');
        setCustGst('');
        setCustRoute('');
        setCustClass('');
        setCustState('');

        if (!query) {
            setSearchResults([]);
            return;
        }
        try {
            // Use proxy path in dev, absolute URL in prod deployment
            const baseUrl = import.meta.env.DEV ? '' : 'http://148.72.215.143:2025';
            const apiUrl = `${baseUrl}/api2025/InPackService.asmx/loadOldCustomerDetails?CustomerName=${encodeURIComponent(query)}&PageNo=1&LicenseKey=ILT_LIC_9988056&IMEI=ILTUKAInpackPro1&PIN=2255`;
            
            const response = await fetch(apiUrl);
            const text = await response.text();
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            const stringElement = xmlDoc.getElementsByTagName("string")[0];
            
            let jsonStr = "";
            if (stringElement && stringElement.textContent) {
                jsonStr = stringElement.textContent;
            } else {
                const match = text.match(/\{[\s\S]*\}/);
                if (match) jsonStr = match[0];
            }
            
            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                setSearchResults(data.customers || []);
                if (!data.customers || data.customers.length === 0) {
                    setFetchError('No matches found.');
                }
            } else {
                setSearchResults([]);
                setFetchError('Failed to parse API response.');
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            setSearchResults([]);
            setFetchError(error.message || 'Network error (CORS might be blocking).');
        }
    };

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
                        <div className="je-terms-card">

                            {/* Row: Expected date + Job received */}
                            <div className="je-terms-row-2">
                                <div className="je-terms-field">
                                    <label className="je-terms-label">Expected Date</label>
                                    <div className="je-terms-input-wrap">
                                        <i className="fa-regular fa-calendar je-terms-fi"></i>
                                        <input
                                            type="date"
                                            className="je-terms-native-input"
                                            value={expectedDate}
                                            onChange={e => setExpectedDate(e.target.value)}
                                            onClick={(e) => e.target.showPicker?.()}
                                        />
                                    </div>
                                </div>
                                <div className="je-terms-field">
                                    <label className="je-terms-label">Job Received</label>
                                    <div className="je-terms-input-wrap">
                                        <i className="fa-regular fa-calendar je-terms-fi"></i>
                                        <input
                                            type="date"
                                            className="je-terms-native-input"
                                            value={jobReceived || new Date().toISOString().slice(0,10)}
                                            onChange={e => setJobReceived(e.target.value)}
                                            onClick={(e) => e.target.showPicker?.()}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row: Estimated + Advance */}
                            <div className="je-terms-row-2">
                                <div className="je-terms-field">
                                    <label className="je-terms-label">Estimated Amount</label>
                                    <div className="je-terms-input-wrap">
                                        <span className="je-terms-rupee">₹</span>
                                        <input className="je-terms-native-input" placeholder="0.00" type="number" value={estimatedAmount} onChange={e => setEstimatedAmount(e.target.value)} />
                                    </div>
                                </div>
                                <div className="je-terms-field">
                                    <label className="je-terms-label">Advance Received</label>
                                    <div className="je-terms-input-wrap">
                                        <span className="je-terms-rupee">₹</span>
                                        <input className="je-terms-native-input" placeholder="0.00" type="number" value={advanceReceived} onChange={e => setAdvanceReceived(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Multi mode toggle */}
                            <div className="je-terms-toggle-bar">
                                <span className="je-terms-toggle-label">Multi mode payment splits</span>
                                <label className="je-toggle-switch">
                                    <input type="checkbox" checked={multiMode} onChange={e => setMultiMode(e.target.checked)} />
                                    <span className="je-toggle-track"><span className="je-toggle-thumb"></span></span>
                                </label>
                            </div>

                            {/* Payment Split Rows */}
                            <div className="je-splits-list">
                                {[
                                    { id: '1', method: 'Cash',                icon: 'fa-regular fa-money-bill-1',   hasDropdown: true  },
                                    { id: '2', method: 'Federal Bank Swiping',icon: 'fa-regular fa-credit-card',    hasDropdown: true  },
                                    { id: '3', method: 'Google Pay',           icon: 'fa-brands fa-google-pay',      hasDropdown: true  },
                                    { id: '4', method: 'Bajaj FinServ',        icon: 'fa-regular fa-credit-card',    hasDropdown: true  },
                                    { id: '5', method: 'Margin Free',          icon: 'fa-solid fa-gift',             hasDropdown: true  },
                                    { id: '6', method: 'Credit',               icon: 'fa-regular fa-credit-card',    hasDropdown: false }
                                ].filter(s => multiMode ? true : s.id === '1').map(split => (
                                    <div key={split.id} className="je-split-row-wrap">
                                        <div className="je-split-row">

                                            {/* LEFT: icon + method name/select */}
                                            <div className="je-split-pill je-split-pill--method">
                                                <span className="je-split-pill-icon"><i className={split.icon}></i></span>
                                                {split.hasDropdown ? (
                                                    <select className="je-split-pill-select" defaultValue={split.method}>
                                                        <option>Cash</option>
                                                        <option>Federal Bank Swiping</option>
                                                        <option>Google Pay</option>
                                                        <option>Bajaj FinServ</option>
                                                        <option>Margin Free</option>
                                                    </select>
                                                ) : (
                                                    <span className="je-split-pill-name">{split.method}</span>
                                                )}
                                            </div>

                                            {/* RIGHT: amount + X */}
                                            <div className="je-split-pill je-split-pill--amount">
                                                <input
                                                    className="je-split-amt"
                                                    placeholder="0.00"
                                                    type="number"
                                                />
                                                <button className="je-split-x-btn"><i className="fa-solid fa-xmark"></i></button>
                                            </div>

                                        </div>

                                        {/* Credit card number field */}
                                        {split.id === '6' && (
                                            <div className="je-split-card-num-row">
                                                <i className="fa-regular fa-credit-card je-split-card-num-icon"></i>
                                                <input
                                                    className="je-split-card-num-input"
                                                    placeholder="XXXX  XXXX  XXXX  XXXX"
                                                    type="text"
                                                    maxLength={19}
                                                    onChange={(e) => {
                                                        let v = e.target.value.replace(/\D/g,'');
                                                        v = v.replace(/(.{4})/g,'$1 ').trim();
                                                        e.target.value = v;
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* Signature Toggle */}
                    <div className="je-signature-section">
                        <div className="je-toggle-row je-center-toggle">
                            <label className="je-toggle-switch">
                                <input type="checkbox" checked={showSignature} onChange={e => setShowSignature(e.target.checked)} />
                                <span className="je-toggle-track">
                                    <span className="je-toggle-thumb"></span>
                                </span>
                            </label>
                            <span className="je-toggle-label je-blue-label">Tap to see Signature pad</span>
                        </div>
                        
                        {/* Signature Pad Box */}
                        {showSignature && (
                            <div className="je-signature-pad-wrapper">
                                <div className="je-sig-header">
                                    <span className="je-sig-title">Draw Customer Signature Below</span>
                                    <button className="je-sig-clear-btn" onClick={clearSignature}>
                                        <i className="fa-solid fa-rotate-left"></i> Clear
                                    </button>
                                </div>
                                <div className="je-sig-canvas-wrap">
                                    <span className="je-sig-hint">Sign here</span>
                                    <canvas
                                        ref={canvasRef}
                                        className="je-sig-canvas"
                                        onMouseDown={startDraw}
                                        onMouseMove={draw}
                                        onMouseUp={stopDraw}
                                        onMouseLeave={stopDraw}
                                        onTouchStart={startDraw}
                                        onTouchMove={draw}
                                        onTouchEnd={stopDraw}
                                    />
                                    <div className="je-sig-baseline"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="je-full-save-button-container">
                        <button className="je-full-save-btn" onClick={onBack}>
                            Save
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

                        <div className="je-modal-card" style={{ overflow: 'visible' }}>
                            <div className="je-modal-field" style={{ position: 'relative', zIndex: searchResults.length > 0 ? 100 : 1 }}>
                                <i className="fa-regular fa-user je-field-icon"></i>
                                <input 
                                    className="je-input" 
                                    placeholder="Customer Name" 
                                    value={custName} 
                                    onChange={e => handleCustomerSearch(e.target.value)} 
                                    autoComplete="off"
                                />
                                {custName && <button className="je-modal-x" onClick={() => handleCustomerSearch('')}><i className="fa-solid fa-xmark"></i></button>}
                                
                                {fetchError && (
                                    <div style={{ position: 'absolute', top: '100%', left: 0, padding: '8px', background: '#fee2e2', color: '#ef4444', fontSize: '12px', border: '1px solid #f87171', borderRadius: '4px', zIndex: 100, marginTop: '4px' }}>
                                        {fetchError}
                                    </div>
                                )}
                                
                                {searchResults.length > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        background: '#fff',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        zIndex: 50,
                                        maxHeight: '200px',
                                        overflowY: 'auto',
                                        marginTop: '4px',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {searchResults.map((cust, idx) => (
                                            <div 
                                                key={idx} 
                                                style={{ 
                                                    padding: '12px 16px', 
                                                    borderBottom: '1px solid #f1f5f9', 
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                                onClick={() => {
                                                    setCustName(cust.customername || '');
                                                    setCustPhone(cust.mobile || '');
                                                    setCustAddress(cust.address || '');
                                                    setCustGst(cust.gstin || '');
                                                    setCustRoute(cust.route || '');
                                                    setCustClass(cust.class || '');
                                                    setCustState(cust.state || '');
                                                    setSearchResults([]);
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <span style={{ fontWeight: '600', color: '#1e293b' }}>{cust.customername}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                        <circle cx="130" cy="130" r="110" fill="#fdf6ee" />
                        {/* Speech bubble */}
                        <rect x="60" y="42" width="140" height="44" rx="12" fill="#0d9488" />
                        <polygon points="105,86 120,86 112,98" fill="#0d9488" />
                        <text x="130" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">No Data Found</text>
                        {/* Body */}
                        <ellipse cx="130" cy="210" rx="42" ry="14" fill="#e2c9a8" opacity="0.5" />
                        {/* Shirt */}
                        <path d="M95 175 Q100 155 130 152 Q160 155 165 175 L168 220 H92 Z" fill="#0d9488" opacity="0.85" />
                        {/* Arms */}
                        <path d="M95 175 Q78 178 75 192" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none" />
                        <path d="M165 175 Q182 178 185 192" stroke="#f5c89a" strokeWidth="14" strokeLinecap="round" fill="none" />
                        {/* Neck */}
                        <rect x="121" y="138" width="18" height="18" rx="4" fill="#f5c89a" />
                        {/* Head */}
                        <circle cx="130" cy="122" r="32" fill="#f5c89a" />
                        {/* Eyes */}
                        <ellipse cx="120" cy="120" rx="4" ry="5" fill="#2d1a0e" />
                        <ellipse cx="140" cy="120" rx="4" ry="5" fill="#2d1a0e" />
                        {/* Smile */}
                        <path d="M120 133 Q130 140 140 133" stroke="#2d1a0e" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Hair */}
                        <path d="M100 108 Q102 80 130 76 Q158 80 160 108 Q154 90 130 88 Q106 90 100 108Z" fill="#1a1a2e" />
                        <path d="M100 108 Q96 130 98 155 Q106 162 108 155 Q110 130 112 118Z" fill="#1a1a2e" />
                        <path d="M160 108 Q164 130 162 155 Q154 162 152 155 Q150 130 148 118Z" fill="#1a1a2e" />
                        {/* Badge / ID card on shirt */}
                        <rect x="123" y="165" width="14" height="18" rx="3" fill="white" opacity="0.9" />
                        <circle cx="130" cy="169" r="3" fill="#fbbf24" />
                        <rect x="125" y="175" width="10" height="2" rx="1" fill="#94a3b8" />
                        <rect x="125" y="179" width="7" height="2" rx="1" fill="#94a3b8" />
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
