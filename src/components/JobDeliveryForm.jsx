import React, { useState, useEffect, useRef } from 'react';
import '../styles/JobDeliveryForm.css';

// Fixed payment split rows — same as JobEntry
const SPLIT_METHODS = [
    { id: '1', method: 'Cash',                   icon: 'fa-regular fa-money-bill-1',  hasDropdown: true  },
    { id: '2', method: 'Federal Bank Swiping',   icon: 'fa-regular fa-credit-card',   hasDropdown: true  },
    { id: '3', method: 'Google Pay',             icon: 'fa-brands fa-google-pay',     hasDropdown: true  },
    { id: '4', method: 'Bajaj FinServ',          icon: 'fa-regular fa-credit-card',   hasDropdown: true  },
    { id: '5', method: 'Margin Free',            icon: 'fa-solid fa-gift',            hasDropdown: true  },
    { id: '6', method: 'Credit',                 icon: 'fa-regular fa-credit-card',   hasDropdown: false },
];

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    // Handle dd-mm-yyyy or yyyy-mm-dd formats
    if (dateStr.includes('-') && dateStr.length === 10) {
        const parts = dateStr.split('-');
        if (parts[0].length === 4) {
            // yyyy-mm-dd => dd-mm-yyyy
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return dateStr;
    }
    return dateStr;
};

const getTodayStr = () => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
};

const JobDeliveryForm = ({ data, onBack, onSaveSuccess }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [saveMsgType, setSaveMsgType] = useState('');

    // Job Delivery fields
    const [deliveredOn, setDeliveredOn] = useState(getTodayStr());
    const [serviceCharge, setServiceCharge] = useState(data?.ServiceCharge || data?.service_charge || '');
    const [deliveryRemarks, setDeliveryRemarks] = useState(data?.DeliveryRemarks || data?.delivery_remarks || '');

    // Multi mode payment — JobEntry style
    const [multiMode, setMultiMode] = useState(false);
    const [paymentAmounts, setPaymentAmounts] = useState({});
    const [openPaymentDropdown, setOpenPaymentDropdown] = useState(null);

    // Click-outside to close dropdown
    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest('.jdf-split-custom-select')) {
                setOpenPaymentDropdown(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        if (data) {
            // fillServiceJobDelivery API field names
            setServiceCharge(
                data.ActualAmount || data.ServiceCharge || data.service_charge || data.Amount || ''
            );
            setDeliveryRemarks(data.DeliveryRemarks || data.delivery_remarks || '');

            // Pre-fill any previously saved payment amounts
            const prev = {};
            if (data.DeliveryCashAmount)      prev['Cash']                 = data.DeliveryCashAmount;
            if (data.DeliveryCardAmount)      prev['Federal Bank Swiping'] = data.DeliveryCardAmount;
            if (data.DeliveryUPIAmount)       prev['Google Pay']           = data.DeliveryUPIAmount;
            if (data.DeliveryFinancierAmount) prev['Bajaj FinServ']        = data.DeliveryFinancierAmount;
            if (data.DeliveryWalletAmount)    prev['Margin Free']          = data.DeliveryWalletAmount;
            if (data.DeliveryCreditAmount)    prev['Credit']               = data.DeliveryCreditAmount;
            if (Object.keys(prev).length > 0) {
                setPaymentAmounts(prev);
                setMultiMode(true);
            }
        }
    }, [data]);

    const totalPaid = Object.values(paymentAmounts).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMsg('');
        try {
            const licenseKey = localStorage.getItem('licenseKey') || 'ILT_LIC_9988056';
            const imei       = localStorage.getItem('imei')       || 'ILTUKAInpackPro1';
            const pin        = localStorage.getItem('pin')        || '2255';

            // Resolve InternalServiceID — numeric ID, not the human-readable job number
            const internalServiceId =
                data?.InternalServiceID || data?.internal_service_id || '';

            // Customer / billing fields from the fillServiceJobDelivery record
            const internalAccountsId = data?.InternalAccountsID || '0';
            const customerName       = data?.Name || data?.CustomerName || data?.customer_name || '';
            const address1           = data?.Address1 || data?.address1 || '';
            const phoneNo            = data?.PhoneNo  || data?.phone_no  || '';
            const billType           = data?.BillType || '0';
            const internalReferenceId = data?.InternalReferenceID || '0';

            // Account IDs for each payment channel (from the delivery record)
            const cashAccountId      = data?.InternalDeliveryCashAccountID      || '45';
            const cardAccountId      = data?.InternalDeliveryCardAccountID      || '942';
            const upiAccountId       = data?.InternalDeliveryUPIAccountID       || '941';
            const financierAccountId = data?.InternalDeliveryFinancierAccountID || '944';
            const walletAccountId    = data?.InternalDeliveryWalletAccountID    || '1102';

            // Payment split amounts
            const cashAmt      = paymentAmounts['Cash']                 || '0';
            const cardAmt      = paymentAmounts['Federal Bank Swiping'] || '0';
            const upiAmt       = paymentAmounts['Google Pay']           || '0';
            const financierAmt = paymentAmounts['Bajaj FinServ']        || '0';
            const walletAmt    = paymentAmounts['Margin Free']          || '0';
            const creditAmt    = paymentAmounts['Credit']               || '0';

            // ServiceTotal = serviceCharge (editable field)
            const serviceTotal = parseFloat(serviceCharge || '0').toFixed(2);

            const jobDeliveryDetails = {
                InternalServiceID:                  String(internalServiceId),
                ReturnedDate:                        deliveredOn,           // yyyy-mm-dd
                DeliveryRemarks:                     deliveryRemarks,
                ServiceTotal:                        serviceTotal,
                InternalAccountsID:                  String(internalAccountsId),
                Name:                                customerName,
                Address1:                            address1,
                PhoneNo:                             phoneNo,
                BillType:                            String(billType),
                InternalDeliveryCashAccountID:       String(cashAccountId),
                InternalDeliveryCardAccountID:       String(cardAccountId),
                InternalDeliveryUPIAccountID:        String(upiAccountId),
                InternalDeliveryFinancierAccountID:  String(financierAccountId),
                InternalDeliveryWalletAccountID:     String(walletAccountId),
                DeliveryCashAmount:                  cashAmt,
                DeliveryCardAmount:                  cardAmt,
                DeliveryUPIAmount:                   upiAmt,
                DeliveryFinancierAmount:             financierAmt,
                DeliveryWalletAmount:                walletAmt,
                DeliveryCreditAmount:                creditAmt,
                InternalReferenceID:                 String(internalReferenceId),
            };

            const url =
                `/api2025/InPackService.asmx/saveJobDeliveryDetails` +
                `?JobDeliveryDetails=${encodeURIComponent(JSON.stringify(jobDeliveryDetails))}` +
                `&LicenseKey=${encodeURIComponent(licenseKey)}` +
                `&IMEI=${encodeURIComponent(imei)}` +
                `&PIN=${encodeURIComponent(pin)}`;

            console.log('saveJobDeliveryDetails payload:', jobDeliveryDetails);

            const res  = await fetch(url);
            const text = await res.text();
            console.log('saveJobDeliveryDetails raw response:', text);

            // Parse XML-wrapped response: <string>{"responseMessage":true,...}</string>
            const parser   = new DOMParser();
            const xmlDoc   = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let jsonStr    = stringEl?.textContent || '';
            if (!jsonStr) {
                const m = text.match(/\{[\s\S]*\}/);
                if (m) jsonStr = m[0];
            }

            if (jsonStr) {
                const result = JSON.parse(jsonStr);
                console.log('saveJobDeliveryDetails parsed result:', result);
                
                // API returns {"success":true, "message":"..."} or uses responseMessage
                const isSuccess = result.success === true || 
                                 result.success === 'true' ||
                                 result.responseMessage === true ||
                                 result.responseMessage === 'true' ||
                                 (typeof result.responseMessage === 'string' &&
                                    result.responseMessage.trim() !== '' &&
                                    result.responseMessage.toLowerCase() !== 'false');

                if (isSuccess) {
                    setSaveMsgType('success');
                    // Use the server's message if available, otherwise generic
                    const msg = result.message || 
                               (typeof result.responseMessage === 'string' ? result.responseMessage : 'Job delivery saved successfully!');
                    setSaveMsg(msg);
                    if (onSaveSuccess) setTimeout(onSaveSuccess, 1500);
                } else {
                    setSaveMsgType('error');
                    setSaveMsg(result.message || 'Save failed. Please try again.');
                }
            } else {
                // Non-JSON / unexpected response — treat as success if HTTP 200
                if (res.ok) {
                    setSaveMsgType('success');
                    setSaveMsg('Job delivery saved successfully!');
                    if (onSaveSuccess) setTimeout(onSaveSuccess, 1200);
                } else {
                    setSaveMsgType('error');
                    setSaveMsg('Server error. Please try again.');
                }
            }
        } catch (err) {
            console.error('saveJobDeliveryDetails error:', err);
            setSaveMsgType('error');
            setSaveMsg('Failed to save. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const d = data || {};

    return (
        <div className="jdf-wrapper">
            {/* Header */}
            <div className="jdf-header">
                <button className="jdf-back-btn" onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="jdf-header-title">
                    <span className="jdf-title-label">Job Delivery</span>
                    <span className="jdf-job-badge">{d.ServiceID || d.job_no || 'N/A'}</span>
                </div>
                <div className="jdf-header-right">
                    <span className="jdf-customer-name">
                        <i className="fa-regular fa-user"></i>
                        {d.Name || d.CustomerName || d.customer_name || 'Customer'}
                    </span>
                </div>
            </div>

            <div className="jdf-scroll">
                {/* Service Information Section */}
                <div className="jdf-section">
                    <div className="jdf-section-title">
                        <i className="fa-solid fa-circle-info"></i>
                        Service Information
                    </div>
                    <div className="jdf-fields-grid jdf-grid-2-persist">
                        {/* Row 1: Bill Date + Allotment Date */}
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Job Received On</label>
                            <div className="jdf-field-input">
                                <i className="fa-regular fa-calendar"></i>
                                <span>{d.BillDate || d.JobReceivedDate || d.job_received_date || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Job Assigned</label>
                            <div className="jdf-field-input">
                                <i className="fa-regular fa-calendar"></i>
                                <span>{d.AllotmentDate || d.AssignedDate || d.assigned_date || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Row 2: Brand + Model */}
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Brand</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-mobile-screen"></i>
                                <span>{d.Brand || d.brand || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Model</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-sitemap"></i>
                                <span>{d.Model || d.model || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Row 3: Colour + Status */}
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Colour</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-palette"></i>
                                <span>{d.Colour || d.Color || d.color || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Status</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-circle-info"></i>
                                <span>{d.Status || d.DeviceState || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Row 4: Complaint (full width) */}
                        <div className="jdf-field-group jdf-field-full">
                            <label className="jdf-field-label">Complaint</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                <span>{d.Complaint || d.complaint || d.ComplaintDetails || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Row 5: Technician + Job Completed */}
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Technician</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-users"></i>
                                <span>{d.ServiceEngineerName || d.TechnicianName || d.technician_name || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Job Completed</label>
                            <div className="jdf-field-input">
                                <i className="fa-regular fa-calendar"></i>
                                <span>{d.CompletedDate || d.completed_date || d.JobCompletedDate || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Row 6: Spare Amount + Actual Amount */}
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Spare Amount</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                <span>{d.SpareConsumptionAmount || '0.00'}</span>
                            </div>
                        </div>
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Total Amount</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                <span>{d.ActualAmount || d.TotalAmount || '0.00'}</span>
                            </div>
                        </div>

                        {/* Row 7: Technician Remarks (full width) */}
                        <div className="jdf-field-group jdf-field-full">
                            <label className="jdf-field-label">Technician Remarks</label>
                            <div className="jdf-field-input">
                                <i className="fa-solid fa-comment-dots"></i>
                                <span>{d.TechnicianRemarks || d.JobRemarks || d.technician_remarks || d.Remarks || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Delivery Section */}
                <div className="jdf-section jdf-section-delivery">
                    <div className="jdf-section-title jdf-title-green">
                        <i className="fa-solid fa-truck-fast"></i>
                        Job Delivery
                    </div>

                    <div className="jdf-fields-grid jdf-grid-2-persist">
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Delivered On</label>
                            <div className="jdf-field-input jdf-editable">
                                <i className="fa-regular fa-calendar"></i>
                                <input
                                    type="date"
                                    value={deliveredOn}
                                    onChange={e => setDeliveredOn(e.target.value)}
                                    onClick={e => e.target.showPicker?.()}
                                />
                            </div>
                        </div>
                        <div className="jdf-field-group">
                            <label className="jdf-field-label">Service Charge</label>
                            <div className="jdf-field-input jdf-editable">
                                <i className="fa-solid fa-gear"></i>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={serviceCharge}
                                    onChange={e => setServiceCharge(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="jdf-field-group jdf-field-full">
                            <label className="jdf-field-label">Delivery Remarks</label>
                            <div className="jdf-field-input jdf-editable">
                                <i className="fa-solid fa-gear"></i>
                                <input
                                    type="text"
                                    placeholder="Enter delivery remarks..."
                                    value={deliveryRemarks}
                                    onChange={e => setDeliveryRemarks(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Multi Mode Payment — JobEntry style */}
                <div className="jdf-section jdf-section-payment">
                    {/* Toggle bar */}
                    <div className="jdf-terms-toggle-bar">
                        <span className="jdf-terms-toggle-label">Multi mode payment splits</span>
                        <label className="jdf-toggle-switch">
                            <input
                                type="checkbox"
                                checked={multiMode}
                                onChange={e => setMultiMode(e.target.checked)}
                            />
                            <span className="jdf-toggle-track"><span className="jdf-toggle-thumb"></span></span>
                        </label>
                    </div>

                    {/* Payment Split Rows */}
                    <div className="jdf-splits-list">
                        {SPLIT_METHODS
                            .filter(s => multiMode ? true : s.id === '1')
                            .map(split => (
                            <div key={split.id} className="jdf-split-row-wrap">
                                <div className="jdf-split-row">

                                    {/* LEFT pill: icon + method name */}
                                    <div className="jdf-split-pill jdf-split-pill--method">
                                        <span className="jdf-split-pill-icon">
                                            <i className={split.icon}></i>
                                        </span>
                                        {split.hasDropdown ? (
                                            <div
                                                className="jdf-split-custom-select"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenPaymentDropdown(prev =>
                                                        prev === split.method ? null : split.method
                                                    );
                                                }}
                                            >
                                                <span className="jdf-split-custom-value">
                                                    {split.method}
                                                </span>
                                                <i className="fa-solid fa-chevron-down jdf-split-custom-chevron"></i>
                                                {openPaymentDropdown === split.method && (
                                                    <div className="jdf-split-custom-options" onClick={e => e.stopPropagation()}>
                                                        <div
                                                            className={`jdf-split-custom-option ${!paymentAmounts[split.method] ? 'active' : ''}`}
                                                            onClick={() => setOpenPaymentDropdown(null)}
                                                        >
                                                            {split.method}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="jdf-split-pill-name">{split.method}</span>
                                        )}
                                    </div>

                                    {/* RIGHT pill: amount + X */}
                                    <div className="jdf-split-pill jdf-split-pill--amount">
                                        <input
                                            className="jdf-split-amt"
                                            placeholder="0.00"
                                            type="number"
                                            value={paymentAmounts[split.method] || ''}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setPaymentAmounts(prev => ({ ...prev, [split.method]: val }));
                                            }}
                                        />
                                        <button
                                            className="jdf-split-x-btn"
                                            onClick={() => setPaymentAmounts(prev => ({ ...prev, [split.method]: '' }))}
                                        >
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>

                                </div>

                                {/* Credit card number sub-row */}
                                {split.id === '6' && (
                                    <div className="jdf-split-card-num-row">
                                        <i className="fa-regular fa-credit-card jdf-split-card-num-icon"></i>
                                        <input
                                            className="jdf-split-card-num-input"
                                            placeholder="XXXX  XXXX  XXXX  XXXX"
                                            type="text"
                                            maxLength={19}
                                            onChange={(e) => {
                                                let v = e.target.value.replace(/\D/g, '');
                                                v = v.replace(/(.{4})/g, '$1 ').trim();
                                                e.target.value = v;
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Total row (shown when multi-mode enabled and amounts entered) */}
                        {multiMode && totalPaid > 0 && (
                            <div className="jdf-total-row">
                                <span>Total Paid</span>
                                <span className="jdf-total-amount">₹ {totalPaid.toFixed(2)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Save Message */}
                {saveMsg && (
                    <div className={`jdf-save-msg jdf-save-msg--${saveMsgType}`}>
                        <i className={saveMsgType === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation'}></i>
                        {saveMsg}
                    </div>
                )}

                {/* Save Button */}
                <button
                    className="jdf-save-btn"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</>
                    ) : (
                        <><i className="fa-solid fa-floppy-disk"></i> Save</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default JobDeliveryForm;
