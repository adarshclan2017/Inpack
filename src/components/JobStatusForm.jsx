import React, { useState, useEffect } from 'react';

/* ── Grid Styles — always 2 columns at every screen size ── */
const gridStyles = `
  /* Override Bootstrap + browser defaults — remove all double-layer */
  input, textarea, select {
    -webkit-appearance: none !important;
    appearance: none !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent !important;
    border-radius: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  /* Kill Bootstrap's form-control styles */
  .jsf-row input,
  .jsf-row textarea {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
  }
  .jsf-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
  .jsf-grid-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }
  .jsf-row-flex {
    display: flex;
    align-items: stretch;
    gap: 12px;
  }
  @media (max-width: 480px) {
    .jsf-grid-2,
    .jsf-grid-actions {
      gap: 8px;
    }
  }
`;

const JobStatusForm = ({ data, onBack }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showAddSpare, setShowAddSpare] = useState(false);
    const [showCustomerInfo, setShowCustomerInfo] = useState(false);

    const [spareProductName, setSpareProductName] = useState('');
    const [spareProductId, setSpareProductId] = useState('');
    const [spareSerial, setSpareSerial] = useState('');
    const [spareQty, setSpareQty] = useState(0);
    const [spareRate, setSpareRate] = useState('');

    const custName    = data?.Name     || '';
    const custPhone   = data?.PhoneNo  || '';
    const custAddress = data?.Address1 || '';

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fmt     = (d) => d || '';
    const dateFmt = currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const timeFmt = currentTime.toLocaleTimeString('en-US');
    const wMap    = { '1': 'Warranty', '2': 'Out of warranty', '3': 'Non warranty' };

    // Editable state for all form fields
    const [jobId,         setJobId]         = useState(data?.job_no || data?.ServiceID || '');
    const [complaint,     setComplaint]     = useState(data?.LookUPComplaint || data?.Complaint || '');
    const [brand,         setBrand]         = useState(data?.LookUpPhoneDetails || data?.PhoneDetails || '');
    const [model,         setModel]         = useState(data?.LookUPModel || data?.Model || '');
    const [color,         setColor]         = useState(data?.LookUPColour || data?.Colour || '');
    const [status,        setStatus]        = useState(data?.Status || data?.DeviceState || '');
    const [warranty,      setWarranty]      = useState(data?.Warranty ? wMap[String(data.Warranty)] || '' : '');
    const [slNo,          setSlNo]          = useState(data?.IMEI || '');
    const [receivedOn,    setReceivedOn]    = useState(fmt(data?.JobReceivedDate || data?.BillDate || data?.Date));
    const [assignedOn,    setAssignedOn]    = useState(fmt(data?.DueDate || data?.ReturnedDate));
    const [remarks,       setRemarks]       = useState(data?.Remarks || '');
    const [serviceCharge, setServiceCharge] = useState(data?.EstimateAmount || data?.EstimatedAmount || '');
    const [updateStatus,  setUpdateStatus]  = useState('');

    /* ── Shared Inline Styles ── */
    const S = {
        page:    { minHeight: '100vh', background: '#f8fafc', margin: 0, width: '100%', maxWidth: '100vw', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" },
        header:  { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', display: 'flex', alignItems: 'center', padding: '0 20px', height: '64px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 4px 20px rgba(16,185,129,0.25)' },
        backBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '12px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'background 0.2s' },
        body:    { maxWidth: '800px', margin: '0 auto', width: '100%', padding: '24px 16px 48px', boxSizing: 'border-box' },
        card:    { background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '24px' },
        row:     { display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', minHeight: '54px', padding: '0 16px' },
        input:   { flex: 1, border: 'none', background: 'transparent', outline: 'none', boxShadow: 'none', fontSize: '14px', color: '#1e293b', fontWeight: '600', fontFamily: 'inherit', WebkitAppearance: 'none', appearance: 'none', padding: 0, margin: 0, width: '100%', minWidth: 0 },
        col:     { display: 'flex', flexDirection: 'column', gap: '14px' },
        sLabel:  { fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px', marginTop: 0 },
    };

    /* ── Input Row Helper ── */
    const Field = ({ icon, iconColor, value, onChange, placeholder, small = false }) => (
        <div style={S.row}>
            <i className={`fa-solid ${icon}`} style={{ color: iconColor, fontSize: '14px', marginRight: '12px', flexShrink: 0 }}></i>
            <input
                value={value}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                readOnly={!onChange}
                placeholder={placeholder}
                style={{ ...S.input, fontSize: small ? '13px' : '14px', cursor: onChange ? 'text' : 'default' }}
            />
        </div>
    );

    /* ──────────────── ADD SPARE VIEW ──────────────── */
    if (showAddSpare) return (
        <div style={S.page}>
            <style>{gridStyles}</style>
            <div style={S.header}>
                <button onClick={() => setShowAddSpare(false)} style={S.backBtn}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                    <i className="fa-solid fa-chevron-left" style={{ fontSize: '15px' }}></i>
                </button>
                <h1 style={{ flex: 1, textAlign: 'center', margin: 0, fontSize: '18px', fontWeight: '600' }}>Add Items</h1>
                <div style={{ width: '38px' }}></div>
            </div>

            <div style={S.body}>
                <h2 style={S.sLabel}>Enter Product Details</h2>
                <div style={S.card}>
                    <div style={S.col}>
                        <div style={S.row}>
                            <input placeholder="Product Name" value={spareProductName} onChange={(e) => setSpareProductName(e.target.value)} style={{ ...S.input, fontSize: '15px' }} />
                            {spareProductName ? <button onClick={() => setSpareProductName('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><i className="fa-solid fa-xmark" style={{ color: '#94a3b8' }}></i></button> : <i className="fa-solid fa-xmark" style={{ color: '#cbd5e1', padding: '4px' }}></i>}
                        </div>
                        <div style={S.row}>
                            <input placeholder="Product Id" value={spareProductId} onChange={(e) => setSpareProductId(e.target.value)} style={{ ...S.input, fontSize: '15px' }} />
                            <i className="fa-solid fa-qrcode" style={{ color: '#94a3b8', fontSize: '18px', padding: '4px' }}></i>
                        </div>
                        <div style={S.row}>
                            <input placeholder="Serial number" value={spareSerial} onChange={(e) => setSpareSerial(e.target.value)} style={{ ...S.input, fontSize: '15px' }} />
                            <i className="fa-solid fa-qrcode" style={{ color: '#94a3b8', fontSize: '18px', padding: '4px' }}></i>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
                        <div style={{ background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '180px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <i className="fa-solid fa-cart-shopping" style={{ color: '#10b981' }}></i> Qty
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', borderRadius: '24px', padding: '4px', maxWidth: '160px' }}>
                                <button onClick={() => setSpareQty(Math.max(0, spareQty - 1))} style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.06)' }}>
                                    <i className="fa-solid fa-minus" style={{ color: '#64748b', fontSize: '14px' }}></i>
                                </button>
                                <span style={{ fontWeight: '700', fontSize: '17px', color: '#1e293b', padding: '0 20px' }}>{spareQty.toFixed(1)}</span>
                                <button onClick={() => setSpareQty(spareQty + 1)} style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.06)' }}>
                                    <i className="fa-solid fa-plus" style={{ color: '#64748b', fontSize: '14px' }}></i>
                                </button>
                            </div>
                        </div>
                        <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>Stock: <b style={{ color: '#1e293b' }}>--</b></div>
                    </div>

                    <div className="jsf-row-flex" style={{ marginTop: '16px' }}>
                        <div style={{ ...S.row, flex: 1, minWidth: '160px' }}>
                            <i className="fa-solid fa-indian-rupee-sign" style={{ color: '#94a3b8', fontSize: '14px', marginRight: '10px' }}></i>
                            <input placeholder="Rate" value={spareRate} onChange={(e) => setSpareRate(e.target.value)} style={{ ...S.input, fontSize: '15px' }} />
                            {spareRate ? <button onClick={() => setSpareRate('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><i className="fa-solid fa-xmark" style={{ color: '#94a3b8' }}></i></button> : <i className="fa-solid fa-xmark" style={{ color: '#cbd5e1' }}></i>}
                        </div>
                        <button style={{ flex: 1, minWidth: '150px', background: '#10b981', color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(16,185,129,0.4)', minHeight: '54px' }}>
                            <i className="fa-solid fa-cart-plus" style={{ fontSize: '18px' }}></i> Add
                        </button>
                    </div>

                    <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '2px dashed #f1f5f9', fontWeight: '800', fontSize: '17px', color: '#1e293b', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Item Total:</span>
                        <span style={{ color: '#10b981' }}>₹ {(Number(spareRate || 0) * Number(spareQty || 0)).toFixed(2)}</span>
                    </div>
                </div>

                <button style={{ width: '100%', padding: '18px', fontSize: '18px', fontWeight: '700', color: 'white', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    Checkout
                </button>
            </div>
        </div>
    );

    /* ──────────────── MAIN JOB STATUS VIEW ──────────────── */
    return (
        <div style={S.page}>
            <style>{gridStyles}</style>

            {/* Customer Info Modal */}
            {showCustomerInfo && (
                <div onClick={() => setShowCustomerInfo(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                    <div onClick={(e) => e.stopPropagation()} style={{ background: '#e8eeec', borderRadius: '28px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', overflow: 'hidden', padding: '0 0 20px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '22px 20px 14px 20px', position: 'relative' }}>
                            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#10b981', textAlign: 'center', flex: 1 }}>Customer Details</h2>
                            <button onClick={() => setShowCustomerInfo(false)} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', borderRadius: '50%', border: '1.5px solid #94a3b8', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}>
                                <i className="fa-solid fa-xmark" style={{ color: '#64748b', fontSize: '14px' }}></i>
                            </button>
                        </div>
                        <div style={{ background: 'white', borderRadius: '20px', margin: '0 16px', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', top: '-9px', left: '14px', fontSize: '11px', color: '#94a3b8', fontWeight: '500', background: 'white', padding: '0 5px' }}>Customer name</span>
                                <div style={{ border: '1px solid #cbd5e1', borderRadius: '14px', padding: '14px 16px' }}>
                                    <input type="text" value={custName} readOnly style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '15px', fontWeight: '600', color: '#1e293b' }} />
                                </div>
                            </div>
                            <div style={{ border: '1px solid #cbd5e1', borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fa-solid fa-location-dot" style={{ color: '#94a3b8', fontSize: '16px', flexShrink: 0 }}></i>
                                <input type="text" placeholder="Place" value={custAddress} readOnly style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '15px', color: custAddress ? '#1e293b' : '#94a3b8' }} />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', top: '-9px', left: '14px', fontSize: '11px', color: '#94a3b8', fontWeight: '500', background: 'white', padding: '0 5px' }}>Customer phones number</span>
                                <div style={{ border: '1px solid #cbd5e1', borderRadius: '14px', padding: '14px 16px' }}>
                                    <input type="tel" value={custPhone} readOnly style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '15px', fontWeight: '600', color: '#1e293b' }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
                            <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: '#cbd5e1' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div style={S.header}>
                <button onClick={onBack} style={S.backBtn}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                    <i className="fa-solid fa-chevron-left" style={{ fontSize: '15px' }}></i>
                </button>
                <h1 style={{ flex: 1, textAlign: 'center', margin: 0, fontSize: '18px', fontWeight: '600' }}>Job Status</h1>
                <div style={{ width: '38px' }}></div>
            </div>

            {/* Body */}
            <div style={S.body}>

                {/* Search Job */}
                <div style={{ ...S.row, background: 'white', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ color: '#94a3b8', fontSize: '15px', marginRight: '12px' }}></i>
                    <input value={jobId} onChange={(e) => setJobId(e.target.value)} placeholder="Search Job" style={{ ...S.input, fontSize: '15px' }} />
                </div>

                {/* ── Product Details Card ── */}
                <h2 style={S.sLabel}>Product Details</h2>
                <div style={S.card}>
                    <div style={S.col}>
                        {/* Complaint — always full width */}
                        <Field icon="fa-triangle-exclamation" iconColor="#f97316" value={complaint} onChange={setComplaint} placeholder="Complaint" />

                        {/* Brand | Model */}
                        <div className="jsf-grid-2">
                            <Field icon="fa-tag"                  iconColor="#3b82f6" value={brand}     onChange={setBrand}     placeholder="Brand" />
                            <Field icon="fa-mobile-screen-button" iconColor="#10b981" value={model}     onChange={setModel}     placeholder="Model" />
                        </div>

                        {/* Color | Status */}
                        <div className="jsf-grid-2">
                            <Field icon="fa-palette"    iconColor="#a855f7" value={color}   onChange={setColor}   placeholder="Color" />
                            <Field icon="fa-circle-info" iconColor="#f97316" value={status} onChange={setStatus} placeholder="Status" />
                        </div>

                        {/* Warranty | Sl.No */}
                        <div className="jsf-grid-2">
                            <Field icon="fa-list-ul" iconColor="#0ea5e9" value={warranty} onChange={setWarranty} placeholder="Warranty" />
                            <Field icon="fa-hashtag" iconColor="#64748b" value={slNo}     onChange={setSlNo}     placeholder="Sl.No" />
                        </div>

                        {/* Received On | Assigned On */}
                        <div className="jsf-grid-2">
                            <Field icon="fa-calendar-check" iconColor="#10b981" value={receivedOn} onChange={setReceivedOn} placeholder="Received On" small />
                            <Field icon="fa-calendar-days"  iconColor="#3b82f6" value={assignedOn} onChange={setAssignedOn} placeholder="Assigned On" small />
                        </div>
                    </div>
                </div>

                {/* ── Status & Remarks Card ── */}
                <h2 style={S.sLabel}>Status & Remarks</h2>
                <div style={S.card}>
                    <div style={S.col}>

                        {/* Date pill + Status */}
                        <div className="jsf-grid-2">
                            {/* Teal Date-Time Pill */}
                            <div style={{ background: 'linear-gradient(135deg, #0f766e 0%, #059669 100%)', borderRadius: '14px', padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 4px 14px rgba(15,118,110,0.3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa-regular fa-calendar" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}></i>
                                    <span style={{ color: 'white', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>{dateFmt}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <i className="fa-regular fa-clock" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}></i>
                                    <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: '600', fontSize: '13px' }}>{timeFmt}</span>
                                </div>
                            </div>
                            {/* Update Status */}
                            <div style={S.row}>
                                <i className="fa-solid fa-signal" style={{ color: '#10b981', fontSize: '15px', marginRight: '12px', flexShrink: 0 }}></i>
                                <input
                                    value={updateStatus}
                                    onChange={(e) => setUpdateStatus(e.target.value)}
                                    placeholder="Update Status"
                                    style={{ ...S.input, fontWeight: '500' }}
                                />
                            </div>
                        </div>

                        {/* Remarks — full width */}
                        <div style={{ ...S.row, alignItems: 'flex-start', minHeight: '80px', padding: '14px 16px' }}>
                            <i className="fa-solid fa-pencil" style={{ color: '#a855f7', fontSize: '15px', marginRight: '12px', marginTop: '2px', flexShrink: 0 }}></i>
                            <textarea
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Remarks"
                                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', resize: 'none', height: '60px', fontSize: '15px', color: '#1e293b', fontFamily: 'inherit' }}
                            ></textarea>
                        </div>

                        {/* Service Charge | Spare Amount */}
                        <div className="jsf-grid-2">
                            <div style={S.row}>
                                <i className="fa-solid fa-indian-rupee-sign" style={{ color: '#10b981', fontSize: '15px', marginRight: '12px', flexShrink: 0 }}></i>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Service Charge</div>
                                    <input
                                        value={serviceCharge}
                                        onChange={(e) => setServiceCharge(e.target.value)}
                                        placeholder="0.00"
                                        style={{ ...S.input, fontSize: '15px', fontWeight: '800' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', background: '#fff5f5', borderRadius: '14px', border: '1px solid #fecaca', minHeight: '54px', padding: '0 16px' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Spare Amount</div>
                                    <div style={{ fontSize: '15px', fontWeight: '800', color: '#dc2626' }}>₹ 0.00</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Action Buttons ── */}
                <div className="jsf-grid-actions">
                    <button onClick={() => setShowAddSpare(true)}
                        style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#475569', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#10b981'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
                    >
                        <i className="fa-solid fa-briefcase" style={{ fontSize: '16px' }}></i> Add Spare
                    </button>
                    <button onClick={() => setShowCustomerInfo(true)}
                        style={{ background: 'white', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: '#475569', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.color = '#10b981'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}
                    >
                        <i className="fa-solid fa-user" style={{ fontSize: '16px' }}></i> Customer Info
                    </button>
                </div>

                {/* Save Button */}
                <button
                    style={{ width: '100%', padding: '18px', fontSize: '18px', fontWeight: '700', color: 'white', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(16,185,129,0.35)', transition: 'transform 0.1s, box-shadow 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(16,185,129,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(2px)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                >
                    <i className="fa-solid fa-floppy-disk" style={{ fontSize: '20px' }}></i>
                    Save Updates
                </button>
            </div>
        </div>
    );
};

export default JobStatusForm;
