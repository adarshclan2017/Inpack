import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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

  /* ── Status Picker Popup ── */
  .jsf-picker-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .jsf-picker-modal {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 480px;
    padding: 0 0 20px 0;
    box-shadow: 0 24px 48px rgba(0,0,0,0.2);
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .jsf-picker-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 10px 20px;
    position: relative;
    flex-shrink: 0;
  }
  .jsf-picker-title {
    font-size: 18px;
    font-weight: 700;
    color: #10b981;
    margin: 0;
  }
  .jsf-picker-close {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1.5px solid #94a3b8;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }
  .jsf-picker-search-wrap {
    padding: 0 16px 12px 16px;
    flex-shrink: 0;
  }
  .jsf-picker-search-field {
    display: flex;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 0 14px;
    min-height: 46px;
    gap: 10px;
  }
  .jsf-picker-search-input {
    flex: 1;
    font-size: 14px;
    color: #1e293b;
    font-family: inherit;
    background: transparent !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  .jsf-picker-add-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #10b981;
    font-size: 18px;
    padding: 2px;
    display: flex;
    align-items: center;
  }
  .jsf-picker-save-btn {
    background: #10b981;
    border: none;
    border-radius: 8px;
    color: white;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .jsf-picker-save-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .jsf-picker-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 4px 16px 16px 16px;
    overflow-y: auto;
    flex: 1;
  }
  .jsf-picker-chip {
    background: #f1f5f9;
    border: 1.5px solid #e2e8f0;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
    color: #475569;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
  }
  .jsf-picker-chip:hover {
    border-color: #10b981;
    color: #10b981;
    background: #ecfdf5;
  }
  .jsf-picker-chip.active {
    background: #10b981;
    border-color: #10b981;
    color: white;
  }
  .jsf-picker-empty {
    color: #94a3b8;
    font-size: 14px;
    padding: 12px 0;
    width: 100%;
    text-align: center;
  }
  .jsf-picker-actions {
    padding: 8px 16px 0 16px;
    flex-shrink: 0;
  }
  .jsf-picker-cancel {
    width: 100%;
    padding: 14px;
    border-radius: 14px;
    border: 1.5px solid #e2e8f0;
    background: white;
    font-size: 15px;
    font-weight: 700;
    color: #475569;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
  }
  .jsf-picker-cancel:hover {
    border-color: #10b981;
    color: #10b981;
  }
`;

/* ── Spare item dropdown — defined at module scope so React never remounts it ── */
const SpareDropdown = ({ open, results, loading, hasMore, onSelect, onLoadMore, emptyHint, field }) => {
    const handleDropScroll = (e) => {
        if (!hasMore || loading) return;
        const el = e.currentTarget;
        if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
            onLoadMore();
        }
    };
    if (!open) return null;

    const getLabel = (item) => {
        if (field === 'serial') return item.serial_no || item.ss_batch_no || '—';
        if (field === 'pid') return item.product_id || '—';
        return item.product_name || '—'; // 'name' is default
    };

    return (
        <div
            onScroll={handleDropScroll}
            onWheel={e => e.stopPropagation()}
            style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
                background: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                border: '1px solid #e2e8f0', zIndex: 300, maxHeight: '260px',
                overflowY: 'scroll', overflowX: 'hidden'
            }}
        >
            {results.length === 0 && !loading && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '8px' }}></i>{emptyHint}
                </div>
            )}
            {loading && results.length === 0 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>Loading…
                </div>
            )}
            {results.map((item, idx) => (
                <div key={idx} onClick={() => onSelect(item)}
                    style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                    <span style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>{getLabel(item)}</span>
                </div>
            ))}
            {loading && results.length > 0 && (
                <div style={{ padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: '6px' }}></i>Loading more…
                </div>
            )}
        </div>
    );
};

const JobStatusForm = ({ data, onBack }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showAddSpare, setShowAddSpare] = useState(false);
    const [showCustomerInfo, setShowCustomerInfo] = useState(false);

    const [spareProductName, setSpareProductName] = useState('');
    const [spareProductId, setSpareProductId] = useState('');
    const [spareSerial, setSpareSerial] = useState('');
    const [spareQty, setSpareQty] = useState(0);
    const [spareRate, setSpareRate] = useState('');
    const [spareInternalProductId, setSpareInternalProductId] = useState('');
    const [spareStock, setSpareStock] = useState('--');
    const [batchType, setBatchType] = useState('non'); // 'single', 'multi', 'non'
    const [spareInternalBatchId, setSpareInternalBatchId] = useState('');
    const [addedItems, setAddedItems] = useState([]);
    // Pre-fill spare amount from saved SpareConsumptionAmount or ActualAmount
    const [spareAmount, setSpareAmount] = useState(
        Number(data?.SpareConsumptionAmount || data?.ActualAmount || 0)
    );

    // ── Picker State (Serial / Product Name / Product ID) ────────
    const [serialSearch, setSerialSearch] = useState('');
    const [serialResults, setSerialResults] = useState([]);
    const [serialLoading, setSerialLoading] = useState(false);
    const [serialPage, setSerialPage] = useState(1);
    const [serialHasMore, setSerialHasMore] = useState(false);
    const [serialOpen, setSerialOpen] = useState(false);
    const serialDebounceRef = useRef(null);

    const [nameSearch, setNameSearch] = useState('');
    const [nameResults, setNameResults] = useState([]);
    const [nameLoading, setNameLoading] = useState(false);
    const [namePage, setNamePage] = useState(1);
    const [nameHasMore, setNameHasMore] = useState(false);
    const [nameOpen, setNameOpen] = useState(false);
    const nameDebounceRef = useRef(null);

    const [pidSearch, setPidSearch] = useState('');
    const [pidResults, setPidResults] = useState([]);
    const [pidLoading, setPidLoading] = useState(false);
    const [pidPage, setPidPage] = useState(1);
    const [pidHasMore, setPidHasMore] = useState(false);
    const [pidOpen, setPidOpen] = useState(false);
    const pidDebounceRef = useRef(null);

    const custName = data?.Name || '';
    const custPhone = data?.PhoneNo || '';
    const custAddress = data?.Address1 || '';

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fmt = (d) => d || '';
    const dateFmt = currentTime.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const timeFmt = currentTime.toLocaleTimeString('en-US');
    const wMap = { '1': 'Warranty', '2': 'Out of warranty', '3': 'Non warranty' };

    // Editable state for all form fields
    const [jobId, setJobId] = useState(data?.job_no || data?.ServiceID || '');
    const [complaint, setComplaint] = useState(data?.LookUPComplaint || data?.PhoneComplaint || data?.Complaint || '');
    const [brand, setBrand] = useState(data?.LookUpPhoneDetails || data?.PhoneDetails || '');
    const [model, setModel] = useState(data?.LookUPModel || data?.PhoneModel || data?.Model || '');
    const [color, setColor] = useState(data?.LookUPColour || data?.PhoneColour || data?.Colour || '');
    const [status, setStatus] = useState(data?.Status || data?.DeviceState || '');
    const [warranty, setWarranty] = useState(data?.Warranty ? wMap[String(data.Warranty)] || '' : '');
    const [slNo, setSlNo] = useState(data?.IMEI || '');
    const [receivedOn, setReceivedOn] = useState(fmt(data?.JobReceivedDate || data?.BillDate || data?.Date));
    const [assignedOn, setAssignedOn] = useState(fmt(data?.DueDate || data?.ReturnedDate));
    const [remarks, setRemarks] = useState(data?.JobRemarks || data?.Remarks || '');
    const [serviceCharge, setServiceCharge] = useState(data?.EstimateAmount || data?.EstimatedAmount || '');
    // Pre-fill the previously saved completion status
    const [updateStatus, setUpdateStatus] = useState(data?.LUQuickStatus || '');
    const [updateStatusId, setUpdateStatusId] = useState(data?.InternalQuickStatusID ? String(data.InternalQuickStatusID) : '');

    // ── Status Picker State ──────────────────────────────────
    const [showStatusPicker, setShowStatusPicker] = useState(false);
    const [statusOptions, setStatusOptions] = useState([]);
    const [extraStatusOpts, setExtraStatusOpts] = useState([]);
    const [statusSearch, setStatusSearch] = useState('');
    const [showAddStatus, setShowAddStatus] = useState(false);
    const [newStatusInput, setNewStatusInput] = useState('');
    const [statusLoading, setStatusLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

    const showMsg = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    };

    // Fetch DeviceState lookup on mount
    useEffect(() => {
        const fetchLookup = async () => {
            setStatusLoading(true);
            try {
                const licenseKey = localStorage.getItem('licenseKey') || 'ILT_LIC_9988056';
                const imei = localStorage.getItem('imei') || 'ILTUKAInpackPro1';
                const pin = localStorage.getItem('pin') || '2255';
                const internalUserId = localStorage.getItem('internalUserId') || '41';

                const url = `/api2025/InPackService.asmx/loadLookup?InternalUserID=${internalUserId}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}`;
                const res = await fetch(url);
                const text = await res.text();

                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, 'text/xml');
                const stringEl = xmlDoc.getElementsByTagName('string')[0];
                let jsonStr = '';
                if (stringEl && stringEl.textContent) {
                    jsonStr = stringEl.textContent;
                } else {
                    const m = text.match(/\{[\s\S]*\}/);
                    if (m) jsonStr = m[0];
                }

                if (jsonStr) {
                    const d = JSON.parse(jsonStr);
                    const opts = (d.DeviceState || [])
                        .map(item => ({
                            id: String(item.internal_lookup_id || ''),
                            label: String(item.lookup_data || '')
                        }))
                        .filter(i => i.label);
                    setStatusOptions(opts);
                }
            } catch (err) {
                console.error('loadLookup error (JobStatusForm):', err);
            } finally {
                setStatusLoading(false);
            }
        };
        fetchLookup();
    }, []);

    const openStatusPicker = () => {
        setStatusSearch('');
        setShowAddStatus(false);
        setNewStatusInput('');
        setShowStatusPicker(true);
    };

    const closeStatusPicker = () => {
        setShowStatusPicker(false);
        setStatusSearch('');
        setShowAddStatus(false);
        setNewStatusInput('');
    };

    const handleStatusSelect = (opt) => {
        setUpdateStatus(opt.label);
        setUpdateStatusId(opt.id);
        closeStatusPicker();
    };

    const handleAddNewStatus = async () => {
        const v = newStatusInput.trim();
        if (!v) return;
        try {
            const licenseKey = localStorage.getItem('licenseKey') || 'ILT_LIC_9988056';
            const imei = localStorage.getItem('imei') || 'ILTUKAInpackPro1';
            const pin = localStorage.getItem('pin') || '2255';
            const internalUserId = localStorage.getItem('internalUserId') || '41';

            const url = `/api2025/InPackService.asmx/saveLookupDetails?InternalLookupID=0&LookupFrom=DeviceState&LookupData=${encodeURIComponent(v)}&InternalUserID=${internalUserId}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}`;
            const res = await fetch(url);
            const text = await res.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let newId = '0';
            if (stringEl && stringEl.textContent) {
                try {
                    const d = JSON.parse(stringEl.textContent);
                    newId = String(d.internal_lookup_id || '0');
                } catch {
                    const possible = stringEl.textContent.trim();
                    if (!isNaN(possible)) newId = possible;
                }
            }
            const newObj = { id: newId, label: v };
            setExtraStatusOpts(prev => [...prev, newObj]);
            setUpdateStatus(v);
            setUpdateStatusId(newId);
            closeStatusPicker();
        } catch (err) {
            console.error('saveLookupDetails error:', err);
            const newObj = { id: '0', label: v };
            setExtraStatusOpts(prev => [...prev, newObj]);
            setUpdateStatus(v);
            setUpdateStatusId('0');
            closeStatusPicker();
        }
    };

    const allStatusOptions = [...statusOptions, ...extraStatusOpts].filter(o =>
        o.label.toLowerCase().includes(statusSearch.toLowerCase())
    );

    /* ── Shared Inline Styles ── */
    const S = {
        page: { minHeight: '100vh', background: '#f8fafc', margin: 0, width: '100%', maxWidth: '100vw', overflowX: 'hidden', fontFamily: "'Inter', sans-serif" },
        header: { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', display: 'flex', alignItems: 'center', padding: '0 20px', height: '64px', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 4px 20px rgba(16,185,129,0.25)' },
        backBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '12px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', transition: 'background 0.2s' },
        body: { maxWidth: '800px', margin: '0 auto', width: '100%', padding: '24px 16px 48px', boxSizing: 'border-box' },
        card: { background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9', marginBottom: '24px' },
        row: { display: 'flex', alignItems: 'center', background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', minHeight: '54px', padding: '0 16px' },
        input: { flex: 1, border: 'none', background: 'transparent', outline: 'none', boxShadow: 'none', fontSize: '14px', color: '#1e293b', fontWeight: '600', fontFamily: 'inherit', WebkitAppearance: 'none', appearance: 'none', padding: 0, margin: 0, width: '100%', minWidth: 0 },
        col: { display: 'flex', flexDirection: 'column', gap: '14px' },
        sLabel: { fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px', marginTop: 0 },
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

    /* ── Shared loadSerialNo fetch ── */
    const fetchSpareItems = useCallback(async (search, page, setLoading, setResults, setHasMore, append = false) => {
        setLoading(true);
        try {
            const licenseKey = localStorage.getItem('licenseKey') || 'ILT_LIC_9988056';
            const imei = localStorage.getItem('imei') || 'ILTUKAInpackPro1';
            const pin = localStorage.getItem('pin') || '2255';
            const branchId = localStorage.getItem('internalBranchID') || '2';
            const locationId = localStorage.getItem('internallocationid') || '2';

            const url = `/api2025/InPackService.asmx/loadSerialNo?SerialNo=${encodeURIComponent(search || '0')}&INTERNALPRODUCTID=0&InternalBranchID=${branchId}&PageNo=${page}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&internallocationid=${locationId}`;
            const res = await fetch(url);
            const text = await res.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let jsonStr = stringEl?.textContent || '';
            if (!jsonStr) { const m = text.match(/\{[\s\S]*\}/); if (m) jsonStr = m[0]; }

            if (jsonStr) {
                const parsed = JSON.parse(jsonStr);
                const rows = Array.isArray(parsed) ? parsed : (parsed.Table || parsed.data || Object.values(parsed).find(v => Array.isArray(v)) || []);
                setHasMore(rows.length >= 10);
                setResults(prev => append ? [...prev, ...rows] : rows);
            } else {
                if (!append) setResults([]);
                setHasMore(false);
            }
        } catch (err) {
            console.error('loadSerialNo error:', err);
            if (!append) setResults([]);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, []);

    /* Apply selection — shared across all three pickers */
    const applySpareSelection = (item, isSerial = false) => {
        setSpareProductName(item.product_name || '');
        setSpareProductId(item.product_id || '');
        setNameSearch(item.product_name || '');
        setPidSearch(item.product_id || '');
        setSpareInternalProductId(item.internal_product_id || '');
        setSpareInternalBatchId(item.internal_batch_id || item.InternalBatchID || '');
        setSpareRate(item.ss_retailRate || item.r_price || item.p_price || '');
        setSpareStock(item.p_currentstock || item.ss_quantity || '0');

        // Determine Batch Type
        const allowBatchIdx = String(item.allowbatch || '0');
        const serialNum = item.serial_no || item.ss_batch_no || '';
        const imeiPerUnit = String(item.p_imei_perunit || '');

        let type = 'non';
        if (allowBatchIdx === '1') {
            // Usually if it has a unique serial/IMEI per unit, it is a "Single Batch"
            if (imeiPerUnit === '1.00' || imeiPerUnit === '1' || serialNum) {
                type = 'single';
            } else {
                type = 'multi';
            }
        }
        setBatchType(type);
        setSpareQty(type === 'non' ? 0 : 1);

        if (isSerial) {
            setSpareSerial(item.serial_no || item.ss_batch_no || '');
            setSerialSearch(item.serial_no || item.ss_batch_no || '');
        } else {
            setSpareSerial('');
            setSerialSearch('');
        }
    };

    const closeAllPickers = () => { setSerialOpen(false); setNameOpen(false); setPidOpen(false); };

    /* ── Serial picker handlers ── */
    const handleSerialSearchChange = (val) => {
        setSerialSearch(val); setSerialPage(1); setSerialResults([]); setSerialOpen(true);
        setNameOpen(false); setPidOpen(false);
        clearTimeout(serialDebounceRef.current);
        serialDebounceRef.current = setTimeout(() => fetchSpareItems(val, 1, setSerialLoading, setSerialResults, setSerialHasMore, false), 350);
    };
    const handleSerialFocus = () => {
        setSerialOpen(true); setNameOpen(false); setPidOpen(false);
        if (serialResults.length === 0 && !serialLoading) fetchSpareItems(serialSearch, 1, setSerialLoading, setSerialResults, setSerialHasMore, false);
    };
    const handleSerialSelect = (item) => { applySpareSelection(item, true); closeAllPickers(); };
    const handleSerialLoadMore = () => {
        const next = serialPage + 1; setSerialPage(next);
        fetchSpareItems(serialSearch, next, setSerialLoading, setSerialResults, setSerialHasMore, true);
    };

    /* ── Product Name picker handlers ── */
    const handleNameSearchChange = (val) => {
        setNameSearch(val); setNamePage(1); setNameResults([]); setNameOpen(true);
        setSerialOpen(false); setPidOpen(false);
        clearTimeout(nameDebounceRef.current);
        nameDebounceRef.current = setTimeout(() => fetchSpareItems(val, 1, setNameLoading, setNameResults, setNameHasMore, false), 350);
    };
    const handleNameFocus = () => {
        setNameOpen(true); setSerialOpen(false); setPidOpen(false);
        if (nameResults.length === 0 && !nameLoading) fetchSpareItems(nameSearch, 1, setNameLoading, setNameResults, setNameHasMore, false);
    };
    const handleNameSelect = (item) => { applySpareSelection(item, false); closeAllPickers(); };
    const handleNameLoadMore = () => {
        const next = namePage + 1; setNamePage(next);
        fetchSpareItems(nameSearch, next, setNameLoading, setNameResults, setNameHasMore, true);
    };

    /* ── Product ID picker handlers ── */
    const handlePidSearchChange = (val) => {
        setPidSearch(val); setPidPage(1); setPidResults([]); setPidOpen(true);
        setSerialOpen(false); setNameOpen(false);
        clearTimeout(pidDebounceRef.current);
        pidDebounceRef.current = setTimeout(() => fetchSpareItems(val, 1, setPidLoading, setPidResults, setPidHasMore, false), 350);
    };
    const handlePidFocus = () => {
        setPidOpen(true); setSerialOpen(false); setNameOpen(false);
        if (pidResults.length === 0 && !pidLoading) fetchSpareItems(pidSearch, 1, setPidLoading, setPidResults, setPidHasMore, false);
    };
    const handlePidSelect = (item) => { applySpareSelection(item, false); closeAllPickers(); };
    const handlePidLoadMore = () => {
        const next = pidPage + 1; setPidPage(next);
        fetchSpareItems(pidSearch, next, setPidLoading, setPidResults, setPidHasMore, true);
    };

    const handleSave = async () => {

        setIsSaving(true);
        try {
            const licenseKey = localStorage.getItem('licenseKey') || 'ILT_LIC_9988056';
            const imei = localStorage.getItem('imei') || 'ILTUKAInpackPro1';
            const pin = localStorage.getItem('pin') || '2255';
            const internalUserId = localStorage.getItem('internalUserId') || '41';
            const locationId = localStorage.getItem('internallocationid') || '2';

            const serviceInternalId = data?.InternalServiceID || data?.internal_service_id || data?.internal_id || data?.InternalID || '';

            const jobDetailsObj = {
                internalserviceid: String(serviceInternalId),
                internallocationid: String(locationId),
                serviceid: String(jobId),
                completedDate: currentTime.toISOString().split('T')[0], // YYYY-MM-DD
                internalquickstatusid: String(updateStatusId),
                internalquickstatus: "0",
                actualamount: Number(spareAmount || 0).toFixed(2),
                jobremarks: remarks,
                internaluserid: String(internalUserId),
                items: addedItems.map(item => ({
                    internal_product_id: Number(item.internalProductId || 0),
                    internal_batch_id: String(item.internalBatchId || item.serial || ''),
                    rate: Number(item.rate || 0),
                    quantity: Number(item.qty || 0)
                }))
            };

            console.log('Sending JobDetails:', jobDetailsObj);

            // Reverting to GET as POST caused a 500 error, which suggests the server isn't configured for JSON POSTs
            const url = `/api2025/InPackService.asmx/saveJobDoneDetails?JobDetails=${encodeURIComponent(JSON.stringify(jobDetailsObj))}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&InternalUserID=${internalUserId}`;

            console.log('Full Request URL:', url);

            const response = await fetch(url);
            const text = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let responseData = null;
            let jsonStr = stringEl?.textContent || '';

            // Check for xsi:nil="true"
            const isNil = stringEl?.getAttribute('xsi:nil') === 'true';

            if (!jsonStr && !isNil) {
                const m = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                if (m) jsonStr = m[0];
            }

            if (jsonStr) {
                try {
                    // Sanitize JSON string: remove control characters that break JSON.parse
                    const sanitizedJson = jsonStr.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
                    responseData = JSON.parse(sanitizedJson);
                    console.log('Save Job Done Response:', responseData);

                    if (responseData.success || responseData.status === "1" || responseData.Success === "True") {
                        showMsg('Job Details Saved Successfully!', 'success');
                        setTimeout(() => { if (onBack) onBack(); }, 1500);
                    } else {
                        const errMsg = responseData.message || responseData.Message || 'Server side error occurred.';
                        showMsg(`Error: ${errMsg}`, 'error');
                        console.error('Server reported failure:', responseData);
                    }
                } catch (e) {
                    console.error('JSON parse error on save response:', e);
                    console.log('Raw Response Text:', text);
                    showMsg('Saved, but received unexpected response format.', 'warning');
                    setTimeout(() => { if (onBack) onBack(); }, 1500);
                }
            } else if (isNil) {
                console.warn('API returned nil/null. This often means missing or invalid parameters.', jobDetailsObj);
                showMsg('Server returned no response. Check console for details.', 'error');
            } else {
                console.log('Empty or unknown response format:', text);
                showMsg('Unexpected response from server.', 'error');
            }

        } catch (err) {
            console.error('saveJobDoneDetails error:', err);
            showMsg('Failed to save job details. Please try again.', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddSpare = () => {
        if (!spareProductName || spareQty <= 0) return;

        // Check for duplicates
        const existing = addedItems.findIndex(item =>
            item.internalProductId === spareInternalProductId &&
            item.internalBatchId === spareInternalBatchId &&
            item.serial === spareSerial
        );

        if (existing !== -1) {
            if (batchType === 'single') {
                showMsg('This serial number is already in the list.', 'info');
                return;
            }
            // For multi/non-batch, we can just update the quantity
            const updated = [...addedItems];
            updated[existing].qty += spareQty;
            updated[existing].total = (Number(updated[existing].rate || 0) * Number(updated[existing].qty || 0));
            setAddedItems(updated);
        } else {
            const newItem = {
                name: spareProductName,
                pid: spareProductId,
                serial: spareSerial,
                qty: spareQty,
                rate: spareRate || '0',
                total: (Number(spareRate || 0) * Number(spareQty || 0)),
                batchType: batchType,
                internalProductId: spareInternalProductId,
                internalBatchId: spareInternalBatchId
            };
            setAddedItems(prev => [...prev, newItem]);
        }

        setNameSearch(''); setPidSearch(''); setSerialSearch('');
        setSpareProductName(''); setSpareProductId(''); setSpareSerial('');
        setSpareQty(0); setSpareRate(''); setSpareStock('--'); setBatchType('non');
    };

    const handleRemoveItem = (idx) => {
        setAddedItems(prev => prev.filter((_, i) => i !== idx));
    };

    const handleCheckout = () => {
        setSpareAmount(grandTotal);
        setShowAddSpare(false);
    };

    const grandTotal = addedItems.reduce((acc, item) => acc + item.total, 0);

    /* ──────────────── ADD SPARE VIEW ──────────────── */
    if (showAddSpare) return (
        <div style={S.page} onClick={closeAllPickers}>
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

                        {/* ── Product Name Picker ── */}
                        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <div style={{ ...S.row, background: nameOpen ? '#eff6ff' : undefined, borderColor: nameOpen ? '#3b82f6' : undefined, transition: 'all 0.2s' }}>
                                <i className="fa-solid fa-box" style={{ color: '#3b82f6', fontSize: '14px', marginRight: '12px', flexShrink: 0 }}></i>
                                <input
                                    placeholder="Search Product Name…"
                                    value={nameSearch}
                                    onChange={e => handleNameSearchChange(e.target.value)}
                                    onFocus={handleNameFocus}
                                    style={{ ...S.input, fontSize: '15px' }}
                                    autoComplete="off"
                                />
                                {nameLoading
                                    ? <i className="fa-solid fa-spinner fa-spin" style={{ color: '#3b82f6', fontSize: '14px', flexShrink: 0 }}></i>
                                    : nameSearch
                                        ? <button onClick={() => { setNameSearch(''); setNameResults([]); setNameOpen(false); setSpareProductName(''); setSpareProductId(''); setSpareSerial(''); setSerialSearch(''); setPidSearch(''); setSpareStock('--'); setBatchType('non'); setSpareQty(0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}><i className="fa-solid fa-xmark" style={{ color: '#94a3b8' }}></i></button>
                                        : <i className="fa-solid fa-chevron-down" style={{ color: '#cbd5e1', fontSize: '12px' }}></i>
                                }
                            </div>
                            <SpareDropdown field="name" open={nameOpen} results={nameResults} loading={nameLoading} hasMore={nameHasMore}
                                onSelect={handleNameSelect} onLoadMore={handleNameLoadMore}
                                emptyHint={nameSearch ? 'No results found' : 'Type to search product name'} />
                        </div>

                        {/* ── Product ID Picker ── */}
                        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <div style={{ ...S.row, background: pidOpen ? '#faf5ff' : undefined, borderColor: pidOpen ? '#a855f7' : undefined, transition: 'all 0.2s' }}>
                                <i className="fa-solid fa-qrcode" style={{ color: '#a855f7', fontSize: '15px', marginRight: '12px', flexShrink: 0 }}></i>
                                <input
                                    placeholder="Search Product ID…"
                                    value={pidSearch}
                                    onChange={e => handlePidSearchChange(e.target.value)}
                                    onFocus={handlePidFocus}
                                    style={{ ...S.input, fontSize: '15px' }}
                                    autoComplete="off"
                                />
                                {pidLoading
                                    ? <i className="fa-solid fa-spinner fa-spin" style={{ color: '#a855f7', fontSize: '14px', flexShrink: 0 }}></i>
                                    : pidSearch
                                        ? <button onClick={() => { setPidSearch(''); setPidResults([]); setPidOpen(false); setSpareProductName(''); setSpareProductId(''); setSpareSerial(''); setSerialSearch(''); setNameSearch(''); setSpareStock('--'); setBatchType('non'); setSpareQty(0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}><i className="fa-solid fa-xmark" style={{ color: '#94a3b8' }}></i></button>
                                        : <i className="fa-solid fa-chevron-down" style={{ color: '#cbd5e1', fontSize: '12px' }}></i>
                                }
                            </div>
                            <SpareDropdown field="pid" open={pidOpen} results={pidResults} loading={pidLoading} hasMore={pidHasMore}
                                onSelect={handlePidSelect} onLoadMore={handlePidLoadMore}
                                emptyHint={pidSearch ? 'No results found' : 'Type to search product ID'} />
                        </div>

                        {/* ── Serial Number Picker ── */}
                        <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
                            <div style={{ ...S.row, background: serialOpen ? '#f0fdf4' : undefined, borderColor: serialOpen ? '#10b981' : undefined, transition: 'all 0.2s' }}>
                                <i className="fa-solid fa-barcode" style={{ color: '#10b981', fontSize: '16px', marginRight: '12px', flexShrink: 0 }}></i>
                                <input
                                    placeholder="Search Serial Number…"
                                    value={serialSearch}
                                    onChange={e => handleSerialSearchChange(e.target.value)}
                                    onFocus={handleSerialFocus}
                                    style={{ ...S.input, fontSize: '15px' }}
                                    autoComplete="off"
                                />
                                {serialLoading
                                    ? <i className="fa-solid fa-spinner fa-spin" style={{ color: '#10b981', fontSize: '14px', flexShrink: 0 }}></i>
                                    : serialSearch
                                        ? <button onClick={() => { setSerialSearch(''); setSerialResults([]); setSerialOpen(false); setSpareProductName(''); setSpareProductId(''); setSpareSerial(''); setNameSearch(''); setPidSearch(''); setSpareStock('--'); setBatchType('non'); setSpareQty(0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}><i className="fa-solid fa-xmark" style={{ color: '#94a3b8' }}></i></button>
                                        : <i className="fa-solid fa-chevron-down" style={{ color: '#cbd5e1', fontSize: '12px' }}></i>
                                }
                            </div>
                            <SpareDropdown field="serial" open={serialOpen} results={serialResults} loading={serialLoading} hasMore={serialHasMore}
                                onSelect={handleSerialSelect} onLoadMore={handleSerialLoadMore}
                                emptyHint={serialSearch ? 'No results found' : 'Type to search serial numbers'} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', flexWrap: 'wrap', gap: '16px' }}>
                        <div style={{ background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, minWidth: '180px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                                <i className="fa-solid fa-cart-shopping" style={{ color: '#10b981' }}></i> Qty
                                {spareStock !== '--' && (
                                    <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#94a3b8', background: '#fff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                                        {batchType === 'single' ? 'Single Batch' : batchType === 'multi' ? 'Multi Batch' : 'Non Batch'}
                                    </span>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0', borderRadius: '24px', padding: '4px', maxWidth: '160px' }}>
                                <button onClick={() => setSpareQty(prev => Math.max(batchType === 'non' ? 0 : 1, prev - 1))} style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.06)' }}>
                                    <i className="fa-solid fa-minus" style={{ color: '#64748b', fontSize: '14px' }}></i>
                                </button>
                                <span style={{ fontWeight: '700', fontSize: '17px', color: '#1e293b', padding: '0 20px' }}>{spareQty.toFixed(1)}</span>
                                <button
                                    onClick={() => {
                                        const stockLimit = Number(spareStock || 0);
                                        if (batchType === 'single' && spareQty >= 1) return;
                                        if (spareQty < stockLimit) setSpareQty(prev => prev + 1);
                                    }}
                                    style={{ width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.06)' }}
                                >
                                    <i className="fa-solid fa-plus" style={{ color: '#64748b', fontSize: '14px' }}></i>
                                </button>
                            </div>
                        </div>
                        <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>Stock: <b style={{ color: '#1e293b' }}>{spareStock}</b></div>
                    </div>

                    <div className="jsf-row-flex" style={{ marginTop: '16px' }}>
                        <div style={{ ...S.row, flex: 1, minWidth: '160px' }}>
                            <i className="fa-solid fa-indian-rupee-sign" style={{ color: '#94a3b8', fontSize: '14px', marginRight: '10px' }}></i>
                            <input placeholder="Rate" value={spareRate} onChange={(e) => setSpareRate(e.target.value)} style={{ ...S.input, fontSize: '15px' }} />
                            {spareRate ? <button onClick={() => setSpareRate('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><i className="fa-solid fa-xmark" style={{ color: '#94a3b8' }}></i></button> : <i className="fa-solid fa-xmark" style={{ color: '#cbd5e1' }}></i>}
                        </div>
                        <button
                            onClick={handleAddSpare}
                            disabled={!spareProductName || spareQty <= 0}
                            style={{ flex: 1, minWidth: '150px', background: (!spareProductName || spareQty <= 0) ? '#cbd5e1' : '#10b981', color: 'white', border: 'none', borderRadius: '14px', fontSize: '16px', fontWeight: '700', cursor: (!spareProductName || spareQty <= 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: (!spareProductName || spareQty <= 0) ? 'none' : '0 4px 14px rgba(16,185,129,0.4)', minHeight: '54px' }}>
                            <i className="fa-solid fa-cart-plus" style={{ fontSize: '18px' }}></i> Add
                        </button>
                    </div>

                    <div style={{ marginTop: '28px', paddingTop: '18px', borderTop: '2px dashed #f1f5f9', fontWeight: '800', fontSize: '17px', color: '#1e293b', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Current Item Total:</span>
                        <span style={{ color: '#10b981' }}>₹ {(Number(spareRate || 0) * Number(spareQty || 0)).toFixed(2)}</span>
                    </div>
                </div>

                {addedItems.length > 0 && (
                    <>
                        <h2 style={{ ...S.sLabel, marginTop: '24px' }}>Added Spares Checklist</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                            {addedItems.map((item, idx) => (
                                <div key={idx} style={{ ...S.card, padding: '16px', marginBottom: 0, borderLeft: '4px solid #10b981', display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                                    <div style={{ width: '40px', height: '40px', background: '#ecfdf5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                        <i className="fa-solid fa-wrench"></i>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{item.name}</span>
                                            {item.serial && <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>SN: {item.serial}</span>}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                                            {item.qty} {item.qty > 1 ? 'units' : 'unit'} @ ₹{Number(item.rate).toFixed(2)}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', paddingRight: '40px' }}>
                                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#10b981' }}>₹{item.total.toFixed(2)}</div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveItem(idx)}
                                        style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div style={{ ...S.card, padding: '18px 24px', marginBottom: '24px', background: '#1e293b', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Grand Total</div>
                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#10b981' }}>₹{grandTotal.toFixed(2)}</div>
                        </div>
                    </>
                )}

                <button
                    onClick={handleCheckout}
                    disabled={addedItems.length === 0}
                    style={{
                        width: '100%', padding: '18px', fontSize: '18px', fontWeight: '700', color: 'white',
                        background: addedItems.length === 0 ? '#cbd5e1' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '16px', border: 'none', cursor: addedItems.length === 0 ? 'not-allowed' : 'pointer',
                        boxShadow: addedItems.length === 0 ? 'none' : '0 6px 20px rgba(16,185,129,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'
                    }}>
                    Checkout {addedItems.length > 0 ? `(${addedItems.length} ${addedItems.length > 1 ? 'Items' : 'Item'})` : ''}
                </button>
            </div>
        </div>
    );

    /* ──────────────── MAIN JOB STATUS VIEW ──────────────── */
    return (
        <div style={S.page}>
            <style>{gridStyles}</style>

            {/* ── Status Picker Popup ── */}
            {showStatusPicker && (
                <div className="jsf-picker-overlay" onClick={closeStatusPicker}>
                    <div className="jsf-picker-modal" onClick={e => e.stopPropagation()}>

                        <div className="jsf-picker-header">
                            <h2 className="jsf-picker-title">Update Status</h2>
                            <button className="jsf-picker-close" onClick={closeStatusPicker}>
                                <i className="fa-solid fa-xmark" style={{ color: '#64748b', fontSize: '14px' }}></i>
                            </button>
                        </div>

                        <div className="jsf-picker-search-wrap">
                            <div className="jsf-picker-search-field">
                                <i className={`fa-solid ${showAddStatus ? 'fa-plus' : 'fa-magnifying-glass'}`} style={{ color: '#94a3b8', fontSize: '13px' }}></i>
                                <input
                                    className="jsf-picker-search-input"
                                    placeholder={showAddStatus ? 'Enter new status…' : 'Search status…'}
                                    value={showAddStatus ? newStatusInput : statusSearch}
                                    onChange={e => showAddStatus ? setNewStatusInput(e.target.value) : setStatusSearch(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && showAddStatus && handleAddNewStatus()}
                                    autoFocus
                                />
                                {showAddStatus ? (
                                    <button
                                        className="jsf-picker-save-btn"
                                        onClick={handleAddNewStatus}
                                        disabled={!newStatusInput.trim()}
                                    >
                                        <i className="fa-solid fa-check"></i> Save
                                    </button>
                                ) : (
                                    <button
                                        className="jsf-picker-add-btn"
                                        onClick={() => { setShowAddStatus(true); setNewStatusInput(statusSearch); }}
                                        title="Add new status"
                                    >
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="jsf-picker-grid">
                            {statusLoading ? (
                                <p className="jsf-picker-empty">
                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 6 }}></i> Loading…
                                </p>
                            ) : allStatusOptions.length > 0 ? allStatusOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    className={`jsf-picker-chip${updateStatus === opt.label ? ' active' : ''}`}
                                    onClick={() => handleStatusSelect(opt)}
                                >
                                    {opt.label}
                                </button>
                            )) : (
                                <p className="jsf-picker-empty">No options found</p>
                            )}
                        </div>

                        <div className="jsf-picker-actions">
                            <button className="jsf-picker-cancel" onClick={closeStatusPicker}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                            <Field icon="fa-tag" iconColor="#3b82f6" value={brand} onChange={setBrand} placeholder="Brand" />
                            <Field icon="fa-mobile-screen-button" iconColor="#10b981" value={model} onChange={setModel} placeholder="Model" />
                        </div>

                        {/* Color | Status */}
                        <div className="jsf-grid-2">
                            <Field icon="fa-palette" iconColor="#a855f7" value={color} onChange={setColor} placeholder="Color" />
                            <Field icon="fa-circle-info" iconColor="#f97316" value={status} onChange={setStatus} placeholder="Status" />
                        </div>

                        {/* Warranty | Sl.No */}
                        <div className="jsf-grid-2">
                            <Field icon="fa-list-ul" iconColor="#0ea5e9" value={warranty} onChange={setWarranty} placeholder="Warranty" />
                            <Field icon="fa-hashtag" iconColor="#64748b" value={slNo} onChange={setSlNo} placeholder="Sl.No" />
                        </div>

                        {/* Received On | Assigned On */}
                        <div className="jsf-grid-2">
                            <Field icon="fa-calendar-check" iconColor="#10b981" value={receivedOn} onChange={setReceivedOn} placeholder="Received On" small />
                            <Field icon="fa-calendar-days" iconColor="#3b82f6" value={assignedOn} onChange={setAssignedOn} placeholder="Assigned On" small />
                        </div>
                    </div>
                </div>

                {/* ── Status & Remarks Card ── */}
                <h2 style={S.sLabel}>Status &amp; Remarks</h2>
                <div style={S.card}>
                    <div style={S.col}>

                        {/* Date pill + Update Status picker trigger */}
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

                            {/* Update Status — click to open picker */}
                            <div
                                style={{ ...S.row, cursor: 'pointer' }}
                                onClick={openStatusPicker}
                                title="Click to pick a status"
                            >
                                <i className="fa-solid fa-signal" style={{ color: '#10b981', fontSize: '15px', marginRight: '12px', flexShrink: 0 }}></i>
                                <span style={{
                                    flex: 1,
                                    fontSize: '14px',
                                    fontWeight: updateStatus ? '600' : '400',
                                    color: updateStatus ? '#1e293b' : '#94a3b8',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    {updateStatus || 'Update Status'}
                                </span>
                                {updateStatus ? (
                                    <button
                                        onClick={e => { e.stopPropagation(); setUpdateStatus(''); setUpdateStatusId(''); }}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                                    >
                                        <i className="fa-solid fa-xmark" style={{ color: '#94a3b8', fontSize: '13px' }}></i>
                                    </button>
                                ) : (
                                    <i className="fa-solid fa-chevron-right" style={{ color: '#cbd5e1', fontSize: '11px' }}></i>
                                )}
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
                                    <div style={{ fontSize: '15px', fontWeight: '800', color: '#dc2626' }}>₹ {spareAmount.toFixed(2)}</div>
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
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{ width: '100%', padding: '18px', fontSize: '18px', fontWeight: '700', color: 'white', background: isSaving ? '#cbd5e1' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '16px', border: 'none', cursor: isSaving ? 'not-allowed' : 'pointer', boxShadow: isSaving ? 'none' : '0 6px 20px rgba(16,185,129,0.35)', transition: 'transform 0.1s, box-shadow 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                    onMouseEnter={(e) => { if (!isSaving) { e.currentTarget.style.boxShadow = '0 8px 28px rgba(16,185,129,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                    onMouseLeave={(e) => { if (!isSaving) { e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,185,129,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                    onMouseDown={(e) => { if (!isSaving) e.currentTarget.style.transform = 'translateY(2px)'; }}
                    onMouseUp={(e) => { if (!isSaving) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                >
                    {isSaving ? (
                        <>
                            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '20px' }}></i>
                            Saving...
                        </>
                    ) : (
                        <>
                            <i className="fa-solid fa-floppy-disk" style={{ fontSize: '20px' }}></i>
                            Save Updates
                        </>
                    )}
                </button>
            </div>

            {/* Premium Toast Notification */}
            {toast.show && (
                <div style={{
                    position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 1000, background: toast.type === 'success' ? '#059669' : '#dc2626',
                    color: 'white', padding: '14px 24px', borderRadius: '16px', fontWeight: '700',
                    fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)', animation: 'jsf-toast-in 0.3s ease-out'
                }}>
                    <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`} style={{ fontSize: '18px' }}></i>
                    {toast.msg}
                    <style>{`
                        @keyframes jsf-toast-in {
                            from { transform: translate(-50%, 20px); opacity: 0; }
                            to { transform: translate(-50%, 0); opacity: 1; }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default JobStatusForm;
