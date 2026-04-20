import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceList from '../components/ServiceList';
import '../styles/JobEntry.css';

/* ─── Sub-component: Service Form ───────────────────────── */
const ServiceForm = ({ onBack, editData = null }) => {
    const [serviceType, setServiceType] = useState('backend');
    const [phone, setPhone] = useState('');
    const [brand, setBrand] = useState('');
    const [brandId, setBrandId] = useState('');
    const [model, setModel] = useState('');
    const [modelId, setModelId] = useState('');
    const [color, setColor] = useState('');
    const [colorId, setColorId] = useState('');
    const [collect, setCollect] = useState('');
    const [collectId, setCollectId] = useState('');
    const [status, setStatus] = useState('');
    const [statusId, setStatusId] = useState('');
    const [warranty, setWarranty] = useState('non');
    const [serial1, setSerial1] = useState('');
    const [serial2, setSerial2] = useState('');
    const [complaint, setComplaint] = useState('');
    const [complaintId, setComplaintId] = useState('');
    const [technician, setTechnician] = useState('');
    const [expectedDate, setExpectedDate] = useState('');
    const [jobReceived, setJobReceived] = useState('');
    const [estimatedAmount, setEstimatedAmount] = useState('');
    const [advanceReceived, setAdvanceReceived] = useState('');
    const [multiMode, setMultiMode] = useState(false);
    const [showSignature, setShowSignature] = useState(false);
    const [technicianId, setTechnicianId] = useState('');
    const [technicianSearchResults, setTechnicianSearchResults] = useState([]);
    const [techLoading, setTechLoading] = useState(false);
    const [techDropdownOpen, setTechDropdownOpen] = useState(false);
    const technicianContainerRef = useRef(null);
    const [openPaymentDropdown, setOpenPaymentDropdown] = useState(null); // key: split.method

    // ── Payment Groups (from loadSalesForm API) ─────────────
    const [paymentGroups, setPaymentGroups] = useState({
        cash_group: [],
        upi_group: [],
        card_group: [],
        financier_group: [],
        wallet_group: []
    });

    const [paymentSelections, setPaymentSelections] = useState({
        Cash: { name: 'Cash', id: '' },
        'Federal Bank Swiping': { name: 'Federal Bank Swiping', id: '' },
        'Google Pay': { name: 'Google Pay', id: '' },
        'Bajaj FinServ': { name: 'Bajaj FinServ', id: '' },
        'Margin Free': { name: 'Margin Free', id: '' }
    });

    // ── Generic Field Picker ──────────────────────────────────
    const [PICKER_OPTIONS, setPickerOptions] = useState({
        brand: [],
        model: [],
        color: [],
        collect: [],
        status: [],
        complaint: [],
    });
    const [lookupLoading, setLookupLoading] = useState(true);

    // -- Saving State --
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'

    // ── Helper: Format Date for <input type="date"> ────────
    const formatForDateInput = (dateStr) => {
        if (!dateStr) return '';
        
        try {
            // Case 1: DD-MM-YYYY (e.g. 17-04-2026)
            if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
                const [d, m, y] = dateStr.split('-');
                return `${y}-${m}-${d}`;
            }

            // Case 2: MMM D YYYY or MMM DD YYYY (e.g. "Apr 17 2026" or "Apr  7 2026")
            const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
            const cleanStr = dateStr.replace(/\s+/g, ' ').trim();
            const parts = cleanStr.split(' ');
            
            if (parts.length >= 3) {
                const mIdx = months.indexOf(parts[0].substring(0, 3).toLowerCase());
                const day = parseInt(parts[1], 10);
                const year = parseInt(parts[2], 10);
                
                if (mIdx !== -1 && !isNaN(day) && !isNaN(year)) {
                    const d = new Date(year, mIdx, day);
                    if (!isNaN(d.getTime())) {
                        // Use local YYYY-MM-DD to avoid timezone shifts
                        const yyyy = d.getFullYear();
                        const mm = String(d.getMonth() + 1).padStart(2, '0');
                        const dd = String(d.getDate()).padStart(2, '0');
                        return `${yyyy}-${mm}-${dd}`;
                    }
                }
            }

            // Case 3: Fallback for standard ISO or other formats
            const d = new Date(dateStr);
            if (!isNaN(d.getTime())) {
                return d.toISOString().split('T')[0];
            }
        } catch (e) {
            console.warn('Date formatting error:', e);
        }
        return '';
    };

    // -- Payment Split Amounts --
    const [paymentAmounts, setPaymentAmounts] = useState({
        Cash: '',
        'Federal Bank Swiping': '',
        'Google Pay': '',
        'Bajaj FinServ': '',
        'Margin Free': '',
        Credit: ''
    });

    // Fetch lookup data from API on mount
    useEffect(() => {
        const fetchLookup = async () => {
            try {
                const url = '/api2025/InPackService.asmx/loadLookup?InternalUserID=41&LicenseKey=ILT_LIC_9988056&IMEI=ILTUKAInpackPro1&PIN=2255';
                const res = await fetch(url);
                const text = await res.text();

                // Parse XML wrapper → extract inner JSON string
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
                    const data = JSON.parse(jsonStr);
                    const extract = (key) =>
                        (data[key] || [])
                            .map(item => ({
                                id: String(item.internal_lookup_id || ''),
                                label: String(item.lookup_data || '')
                            }))
                            .filter(i => i.label);

                    setPickerOptions({
                        brand: extract('PhoneDetails'),   // PhoneDetails → Brand
                        model: extract('Model'),
                        color: extract('Colour'),
                        collect: extract('Accessories'),    // Accessories → Collect
                        status: extract('DeviceState'),    // DeviceState → Status
                        complaint: extract('Complaint'),
                    });
                }
            } catch (err) {
                console.error('loadLookup error:', err);
            } finally {
                setLookupLoading(false);
            }
        };
        fetchLookup();
    }, []);

    // Fetch sales form payment groups
    useEffect(() => {
        const fetchSalesForm = async () => {
            try {
                const branchName = localStorage.getItem("branchId") || "";
                const branchDetails = JSON.parse(localStorage.getItem("branch_details") || "[]");
                const branchObj = branchDetails.find(b => b.branch_id === branchName);
                const branchId = branchObj ? branchObj.internal_branch_id : "2";

                const licenseKey = localStorage.getItem("licenseKey") || "ILT_LIC_9988056";
                const imei = localStorage.getItem("imei") || "ILTUKAInpackPro1";
                const pin = localStorage.getItem("pin") || "2255";
                const internalUserId = localStorage.getItem("internalUserId") || "41";

                const url = `/api2025/InPackService.asmx/loadSalesForm?LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&InternalUserID=${internalUserId}&InternalBranchID=${branchId}`;
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
                    const data = JSON.parse(jsonStr);
                    setPaymentGroups({
                        cash_group: data.cash_group || [],
                        upi_group: data.upi_group || [],
                        card_group: data.card_group || [],
                        financier_group: data.financier_group || [],
                        wallet_group: data.wallet_group || []
                    });

                    // Set initial selections if groups are not empty
                    setPaymentSelections(prev => ({
                        ...prev,
                        Cash: {
                            name: data.cash_group?.[0]?.AccountsName || 'Cash',
                            id: data.cash_group?.[0]?.InternalAccountsID || ''
                        },
                        'Federal Bank Swiping': {
                            name: data.card_group?.[0]?.AccountsName || 'Federal Bank Swiping',
                            id: data.card_group?.[0]?.InternalAccountsID || ''
                        },
                        'Google Pay': {
                            name: data.upi_group?.[0]?.AccountsName || 'Google Pay',
                            id: data.upi_group?.[0]?.InternalAccountsID || ''
                        },
                        'Bajaj FinServ': {
                            name: data.financier_group?.[0]?.AccountsName || 'Bajaj FinServ',
                            id: data.financier_group?.[0]?.InternalAccountsID || ''
                        },
                        'Margin Free': {
                            name: data.wallet_group?.[0]?.AccountsName || 'Margin Free',
                            id: data.wallet_group?.[0]?.InternalAccountsID || ''
                        }
                    }));
                }
            } catch (err) {
                console.error('loadSalesForm error:', err);
            }
        };
        fetchSalesForm();
    }, []);

    // ── Pre-populate form if editData is provided ──────────
    useEffect(() => {
        if (!editData) return;

        console.log('Populating form with editData:', editData);

        // Basic Info
        setPhone(editData.PhoneNo || '');
        setCustName(editData.Name || '');
        setCustAddress(editData.Address1 || '');
        setCustPhone(editData.PhoneNo || '');

        // Product Info
        setBrand(editData.LookUpPhoneDetails || editData.PhoneDetails || '');
        setBrandId(String(editData.InternalPhoneDetailsID || '0'));
        setModel(editData.LookUPModel || editData.Model || '');
        setModelId(String(editData.InternalModelID || '0'));
        setColor(editData.LookUPColour || editData.Colour || '');
        setColorId(String(editData.InternalColourID || '0'));
        setCollect(editData.Accessory || '');
        
        // Status & Complaint
        setStatus(editData.Status || 'New Job');
        setStatusId(String(editData.InternalStatusID || '0')); 
        setComplaint(editData.LookUPComplaint || editData.Complaint || '');
        setComplaintId(String(editData.InternalComplaintID || '0'));
        
        // Technician
        setTechnician(editData.ServiceEngineerName || '');
        setTechnicianId(String(editData.InternalEngineerID || '0'));

        // Serial Numbers
        setSerial1(editData.IMEI || '');
        setSerial2(editData.InnerIMEI || '');

        // Terms
        setExpectedDate(formatForDateInput(editData.DueDate || editData.ReturnedDate));
        setJobReceived(formatForDateInput(editData.BillDate));
        setEstimatedAmount(editData.EstimateAmount || editData.EstimatedAmount || '');
        setAdvanceReceived(editData.AdvanceAmount || editData.AdvanceReceived || '');

        // Mappings
        const serviceTypeReverseMap = { '1': 'quick', '2': 'backend', '3': 'field' };
        setServiceType(serviceTypeReverseMap[String(editData.QuickService)] || 'backend');

        const warrantyReverseMap = { '1': 'warranty', '2': 'out', '3': 'non' };
        setWarranty(warrantyReverseMap[String(editData.Warranty)] || 'non');

        // Multi-mode & Splits (Simplified for now)
        if (editData.AdvanceCashAmount > 0 || editData.AdvanceCardAmount > 0 || editData.AdvanceUPIAmount > 0 || editData.AdvanceFinancierAmount > 0 || editData.AdvanceWalletAmount > 0) {
            setMultiMode(true);
            setPaymentAmounts({
                Cash: editData.AdvanceCashAmount || '',
                'Federal Bank Swiping': editData.AdvanceCardAmount || '',
                'Google Pay': editData.AdvanceUPIAmount || '',
                'Bajaj FinServ': editData.AdvanceFinancierAmount || '',
                'Margin Free': editData.AdvanceWalletAmount || '',
                Credit: ''
            });
        }

    }, [editData]);

    const [activePicker, setActivePicker] = useState(null); // 'brand' | 'model' | 'color' | 'collect' | 'status' | 'complaint'
    const [pickerSearch, setPickerSearch] = useState('');
    const [showAddItem, setShowAddItem] = useState(false);
    const [newItemInput, setNewItemInput] = useState('');
    const [extraOptions, setExtraOptions] = useState({ brand: [], model: [], color: [], collect: [], status: [], complaint: [] });

    const FIELD_SETTERS = { brand: setBrand, model: setModel, color: setColor, collect: setCollect, status: setStatus, complaint: setComplaint };
    const FIELD_ID_SETTERS = { brand: setBrandId, model: setModelId, color: setColorId, collect: setCollectId, status: setStatusId, complaint: setComplaintId };
    const FIELD_VALUES = { brand, model, color, collect, status, complaint };
    const FIELD_LABELS = { brand: 'Brand', model: 'Model', color: 'Color', collect: 'Collect', status: 'Status', complaint: 'Complaint' };

    const openPicker = (field) => { setActivePicker(field); setPickerSearch(''); setShowAddItem(false); setNewItemInput(''); };
    const closePicker = () => { setActivePicker(null); setPickerSearch(''); setShowAddItem(false); setNewItemInput(''); };

    const handlePickerSelect = (opt) => {
        if (!activePicker) return;

        if (activePicker === 'collect') {
            const currentLabels = collect ? collect.split(', ') : [];
            const currentIds = collectId ? collectId.split(', ') : [];

            if (currentLabels.includes(opt.label)) {
                const newLabels = currentLabels.filter(l => l !== opt.label);
                const newIds = currentIds.filter(id => id !== opt.id);
                setCollect(newLabels.join(', '));
                setCollectId(newIds.join(', '));
            } else {
                const newLabels = [...currentLabels, opt.label];
                const newIds = [...currentIds, opt.id];
                setCollect(newLabels.join(', '));
                setCollectId(newIds.join(', '));
            }
        } else {
            FIELD_SETTERS[activePicker](opt.label);
            FIELD_ID_SETTERS[activePicker](opt.id);
            closePicker();
        }
    };

    const handlePickerAddNew = async () => {
        const v = newItemInput.trim();
        if (!v || !activePicker) return;

        // Map activePicker to LookupFrom
        const lookupMap = {
            brand: 'PhoneDetails',
            model: 'Model',
            color: 'Colour',
            collect: 'Accessories',
            status: 'DeviceState',
            complaint: 'Complaint'
        };

        const lookupFrom = lookupMap[activePicker];
        if (!lookupFrom) return;

        try {
            // InternalLookupID=0 as requested for new items
            const url = `/api2025/InPackService.asmx/saveLookupDetails?InternalLookupID=0&LookupFrom=${lookupFrom}&LookupData=${encodeURIComponent(v)}&InternalUserID=41&LicenseKey=ILT_LIC_9988056&IMEI=ILTUKAInpackPro1&PIN=2255`;

            const res = await fetch(url);
            const text = await res.text();

            // API returns XML → extract string → parse JSON if present
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let newId = '0';

            if (stringEl && stringEl.textContent) {
                try {
                    // Try parsing as JSON first
                    const data = JSON.parse(stringEl.textContent);
                    // Match the key from loadLookup if available
                    newId = String(data.internal_lookup_id || '0');
                } catch (e) {
                    // If not JSON, maybe it's just the ID string?
                    const possibleId = stringEl.textContent.trim();
                    if (!isNaN(possibleId)) newId = possibleId;
                }
            }

            const newObj = { id: newId, label: v };
            setExtraOptions(prev => ({ ...prev, [activePicker]: [...(prev[activePicker] || []), newObj] }));

            if (activePicker === 'collect') {
                const currentLabels = collect ? collect.split(', ') : [];
                const currentIds = collectId ? collectId.split(', ') : [];
                setCollect([...currentLabels, v].join(', '));
                setCollectId([...currentIds, newId].join(', '));
                setNewItemInput('');
                setShowAddItem(false);
            } else {
                FIELD_SETTERS[activePicker](v);
                FIELD_ID_SETTERS[activePicker](newId);
                closePicker();
            }
        } catch (err) {
            console.error('saveLookupDetails error:', err);
            const newObj = { id: '0', label: v };
            setExtraOptions(prev => ({ ...prev, [activePicker]: [...(prev[activePicker] || []), newObj] }));

            if (activePicker === 'collect') {
                const currentLabels = collect ? collect.split(', ') : [];
                const currentIds = collectId ? collectId.split(', ') : [];
                setCollect([...currentLabels, v].join(', '));
                setCollectId([...currentIds, '0'].join(', '));
                setNewItemInput('');
                setShowAddItem(false);
            } else {
                FIELD_SETTERS[activePicker](v);
                FIELD_ID_SETTERS[activePicker]('0');
                closePicker();
            }
        }
    };

    const activeOptions = activePicker
        ? [...(PICKER_OPTIONS[activePicker] || []), ...(extraOptions[activePicker] || [])].filter(
            o => o.label.toLowerCase().includes(pickerSearch.toLowerCase())
        )
        : [];

    // ── Signature pad ───────────────────────────────────────
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef(null);
    const ctxRef = useRef(null);

    // Return position in CSS-space coords relative to canvas
    const getCSSPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const src = e.touches ? e.touches[0] : e;
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
            const w = canvas.offsetWidth;
            const h = canvas.offsetHeight;

            canvas.width = w * dpr;
            canvas.height = h * dpr;

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);           // coordinate space = CSS pixels
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctxRef.current = ctx;
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
            lastPos.current = null;
        };

        // { passive: false } lets us call preventDefault() to stop the page scrolling
        canvas.addEventListener('touchstart', onTouchStart, { passive: false });
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas.addEventListener('touchend', onTouchEnd, { passive: false });

        return () => {
            canvas.removeEventListener('touchstart', onTouchStart);
            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchend', onTouchEnd);
        };
    }, [showSignature]);

    // Mouse handlers (desktop)
    const startDraw = useCallback((e) => {
        if (e.type !== 'mousedown') return;
        isDrawing.current = true;
        lastPos.current = getCSSPos(e);
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
        lastPos.current = null;
    }, []);

    const clearSignature = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }, []);
    // Customer Details modal
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [custName, setCustName] = useState('');
    const [custPhone, setCustPhone] = useState('');
    const [custAddress, setCustAddress] = useState('');
    const [custGst, setCustGst] = useState('');
    const [custRoute, setCustRoute] = useState('');
    const [custRouteId, setCustRouteId] = useState('');
    const [custClass, setCustClass] = useState('');
    const [custClassId, setCustClassId] = useState('');
    const [custState, setCustState] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [phoneSearchResults, setPhoneSearchResults] = useState([]);
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
    const [stateSearch, setStateSearch] = useState('');
    const stateDropdownRef = useRef(null);

    // Route autocomplete state
    const [routesList, setRoutesList] = useState([]);
    const [routeDropdownOpen, setRouteDropdownOpen] = useState(false);

    // Class autocomplete state
    const [classList, setClassList] = useState([]);
    const [classDropdownOpen, setClassDropdownOpen] = useState(false);

    // States for dropdown — stored by Welcome.jsx from dashboard API (data.data.states)
    const statesList = JSON.parse(localStorage.getItem("states") || "[]").map(s => s.state_name).filter(Boolean);

    // Fetch routes from API on mount
    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const licenseKey = localStorage.getItem('license_key') || 'ILT_LIC_9988056';
                const pin = localStorage.getItem('pin') || '2255';
                const url = `/api2025/InPackService.asmx/loadRoute?LicenseKey=${licenseKey}&IMEI=ILTUKAInpackPro1&PIN=${pin}`;
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
                    const data = JSON.parse(jsonStr);
                    const routes = (data.routes || []).map(r => ({
                        id: String(r.internal_route_id || ''),
                        name: String(r.route || '')
                    })).filter(r => r.name);
                    setRoutesList(routes);
                }
            } catch (err) {
                console.error('loadRoute error:', err);
            }
        };

        const fetchClasses = async () => {
            try {
                const licenseKey = localStorage.getItem('license_key') || 'ILT_LIC_9988056';
                const pin = localStorage.getItem('pin') || '2255';
                const url = `/api2025/InPackService.asmx/loadClass?LicenseKey=${licenseKey}&IMEI=ILTUKAInpackPro1&PIN=${pin}`;
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
                    const data = JSON.parse(jsonStr);
                    const classes = (data.class || []).map(c => ({
                        id: String(c.internal_class_id || ''),
                        name: String(c.class || '')
                    })).filter(c => c.name);
                    setClassList(classes);
                }
            } catch (err) {
                console.error('loadClass error:', err);
            }
        };

        fetchRoutes();
        fetchClasses();
    }, []);

    const phoneContainerRef = useRef(null);
    const modalPhoneContainerRef = useRef(null);

    // Close phone dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            const insideMain = phoneContainerRef.current && phoneContainerRef.current.contains(event.target);
            const insideModal = modalPhoneContainerRef.current && modalPhoneContainerRef.current.contains(event.target);
            const insideTech = technicianContainerRef.current && technicianContainerRef.current.contains(event.target);
            const insidePaymentDropdown = event.target.closest('.je-split-custom-select');

            if (!insideMain && !insideModal) {
                setPhoneSearchResults([]);
            }
            if (!insideTech) {
                setTechDropdownOpen(false);
            }
            if (!insidePaymentDropdown) {
                setOpenPaymentDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCustomerSearch = async (query) => {
        setCustName(query);
        setFetchError('');

        // Reset phone and other details whenever the name is changed
        setCustPhone('');
        setCustAddress('');
        setCustGst('');
        setCustRoute('');
        setCustRouteId('');
        setCustClass('');
        setCustClassId('');
        setCustState('');

        if (!query) {
            setSearchResults([]);
            return;
        }
        try {
            // Use relative path; Vite (dev) or Vercel (prod) will handle the proxy
            const apiUrl = `/api2025/InPackService.asmx/loadOldCustomerDetails?CustomerName=${encodeURIComponent(query)}&PageNo=1&LicenseKey=ILT_LIC_9988056&IMEI=ILTUKAInpackPro1&PIN=2255`;

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

    const handlePhoneSearch = async (query, valueSetter) => {
        if (valueSetter) valueSetter(query);
        else setPhone(query);

        setPhoneError(''); // Clear error on new search

        if (!query || query.length < 3) {
            setPhoneSearchResults([]);
            return;
        }

        setPhoneLoading(true);
        try {
            const apiUrl = `/api2025/InPackService.asmx/loadContactNo?ContactNo=${encodeURIComponent(query)}&PageNo=1&LicenseKey=ILT_LIC_9988056&IMEI=ILTUKAInpackPro1&PIN=2255`;
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
                // Correct key is 'contactno'
                const results = data.contactno || data.customers || data.Table || (Array.isArray(data) ? data : []);
                setPhoneSearchResults(results);

                if (results.length === 0 && query.length > 2) {
                    setPhoneError('No matches found.');
                }
            } else {
                setPhoneSearchResults([]);
                setPhoneError('Failed to parse response.');
            }
        } catch (error) {
            console.error("Error fetching phone numbers:", error);
            setPhoneError('Connection error.');
        } finally {
            setPhoneLoading(false);
        }
    };

    const selectCustomerByPhone = async (contact_no) => {
        setPhone(contact_no);
        setPhoneSearchResults([]);
        setPhoneError(''); // Clear error when selecting a result

        // After selecting phone, try to find full details
        try {
            // We'll search by phone number using the same loadOldCustomerDetails API
            // assuming it can match phone numbers in the CustomerName search or similar
            const apiUrl = `/api2025/InPackService.asmx/loadOldCustomerDetails?CustomerName=${encodeURIComponent(contact_no)}&PageNo=1&LicenseKey=ILT_LIC_9988056&IMEI=ILTUKAInpackPro1&PIN=2255`;

            const response = await fetch(apiUrl);
            const text = await response.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            const stringElement = xmlDoc.getElementsByTagName("string")[0];

            let jsonStr = "";
            if (stringElement && stringElement.textContent) {
                jsonStr = stringElement.textContent;
            }

            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                const customers = data.customers || [];
                if (customers.length > 0) {
                    const cust = customers[0];
                    setCustName(cust.customername || '');
                    setCustPhone(cust.mobile || '');
                    setCustAddress(cust.address || '');
                    setCustGst(cust.gstin || '');
                    setCustRoute(cust.route || '');
                    setCustClass(cust.class || '');
                    setCustState(cust.state || '');
                    // Since we found full details, let's open the modal to show them
                    setShowCustomerModal(true);
                }
            }
        } catch (error) {
            console.error("Error fetching full details by phone:", error);
        }
    };

    const handleTechnicianSearch = async (query) => {
        setTechnician(query);
        setTechnicianId('');

        // Always open dropdown if there's any text or on focused empty search
        setTechDropdownOpen(true);

        if (!query.trim()) {
            setTechnicianSearchResults([]);
            // Optionally: could load all technicians here if API supports it
            // For now, just clear results
            setTechDropdownOpen(false);
            return;
        }

        setTechLoading(true);
        try {
            const licenseKey = localStorage.getItem("licenseKey") || "ILT_LIC_9988056";
            const imei = localStorage.getItem("imei") || "ILTUKAInpackPro1";
            const pin = localStorage.getItem("pin") || "2255";
            const internalUserId = localStorage.getItem("internalUserId") || "41";

            const branchName = localStorage.getItem("branchId") || "";
            const branchDetails = JSON.parse(localStorage.getItem("branch_details") || "[]");
            const branchObj = branchDetails.find(b => b.branch_id === branchName);
            const branchId = branchObj ? branchObj.internal_branch_id : "2";

            const url = `/api2025/InPackService.asmx/loadAutoFill?SearchFrom=serviceengineers&SearchField=ServiceEngineerName&InternalBranchID=${branchId}&InternalUserID=${internalUserId}&PageNo=1&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&ServiceEngineerName=${encodeURIComponent(query)}&Query=${encodeURIComponent(query)}`;

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
                    if (data.success || data.ServiceEngineerName) {
                        const allResults = data.ServiceEngineerName || [];

                        // Robust mapping: check for 'value' OR 'ServiceEngineerName' OR 'Name'
                        const mapped = allResults.map(tech => ({
                            name: tech.value || tech.ServiceEngineerName || tech.Name || 'Unknown',
                            id: tech.InternalID || tech.internal_service_engineer_id || tech.ID || ''
                        }));

                        // Client-side filter to be absolutely sure
                        const filtered = mapped.filter(tech =>
                            tech.name.toLowerCase().includes(query.toLowerCase())
                        );

                        setTechnicianSearchResults(filtered);
                        setTechDropdownOpen(filtered.length > 0);
                    } else {
                        setTechnicianSearchResults([]);
                        setTechDropdownOpen(false);
                    }
                } catch (e) {
                    console.error('JSON parse error:', e);
                    setTechnicianSearchResults([]);
                }
            }
        } catch (err) {
            console.error('Technician search error:', err);
        } finally {
            setTechLoading(false);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage({ text: 'Saving job entry...', type: '' });

        try {
            const licenseKey = localStorage.getItem("licenseKey") || "ILT_LIC_9988056";
            const imei = localStorage.getItem("imei") || "ILTUKAInpackPro1";
            const pin = localStorage.getItem("pin") || "2255";
            const internalUserId = localStorage.getItem("internalUserId") || "41";

            const branchName = localStorage.getItem("branchId") || "";
            const branchDetails = JSON.parse(localStorage.getItem("branch_details") || "[]");
            const branchObj = branchDetails.find(b => b.branch_id === branchName);
            const internalBranchId = branchObj ? branchObj.internal_branch_id : "2";

            const serviceTypeMap = { quick: 1, backend: 2, field: 3 };
            const warrantyMap = { warranty: 1, out: 2, non: 3 };

            const details = {
                Status: status || "New Job",
                InternalServiceID: "0",
                ServiceID: "",
                InternalLocationID: String(internalBranchId),
                BillDate: jobReceived || new Date().toISOString().slice(0, 10),
                Warranty: String(warrantyMap[warranty] || 1),
                QuickService: String(serviceTypeMap[serviceType] || 2),
                DueDate: expectedDate || new Date().toISOString().slice(0, 10),
                Name: custName || "Walk-in Customer",
                Address1: custAddress || "",
                PhoneNo: phone || "",
                ProductType: "0",
                InternalPhoneDetailsID: brandId || "0",
                InternalColourID: colorId || "0",
                InternalModelID: modelId || "0",
                InternalComplaintID: complaintId || "0",
                Accessory: collect || "",
                IMEI: serial1 || "",
                InnerIMEI: serial2 || "",
                InternalAccessoryID: "0",
                AccessorySerialNo: "",
                ModificationDate: new Date().toISOString().slice(0, 10),
                InternalTechnicianID: technicianId || "0",
                AdvanceAmount: advanceReceived || "0",
                EstimatedAmount: estimatedAmount || "0",
                InternalAccountsID: "0",
                InternalAdvanceCashAccountID: paymentSelections['Cash']?.id || "0",
                InternalAdvanceCardAccountID: paymentSelections['Federal Bank Swiping']?.id || "0",
                InternalAdvanceUPIAccountID: paymentSelections['Google Pay']?.id || "0",
                InternalAdvanceFinancierAccountID: paymentSelections['Bajaj FinServ']?.id || "0",
                InternalAdvanceWalletAccountID: paymentSelections['Margin Free']?.id || "0",
                AdvanceCashAmount: paymentAmounts['Cash'] || "0",
                AdvanceCardAmount: paymentAmounts['Federal Bank Swiping'] || "0",
                AdvanceUPIAmount: paymentAmounts['Google Pay'] || "0",
                AdvanceFinancierAmount: paymentAmounts['Bajaj FinServ'] || "0",
                AdvanceWalletAmount: paymentAmounts['Margin Free'] || "0",
                InternalUserID: internalUserId,
                RecMod: "N",
                RecFlag: "0",
                InternalSeriesID: "0",
                GenerateNo: "TRUE",
                Pattern: "",
                Password: "",
                InternalImageID: "",
                PinNumber: ""
            };

            console.log('Saving Job Entry Details:', details);

            const url = `/api2025/InPackService.asmx/saveJobEntryDetails?JobEntryDetails=${encodeURIComponent(JSON.stringify(details))}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}`;

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
                const data = JSON.parse(jsonStr);
                if (data.success) {
                    setSaveMessage({ text: `Job entry saved successfully! (ID: ${data.internal_service_id})`, type: 'success' });
                    setTimeout(() => {
                        onBack();
                    }, 2000);
                } else {
                    setSaveMessage({ text: data.message || 'Failed to save job entry.', type: 'error' });
                }
            } else {
                setSaveMessage({ text: 'Internal Server Error or Invalid Response.', type: 'error' });
            }
        } catch (err) {
            console.error('saveJobEntryDetails error:', err);
            setSaveMessage({ text: 'Network error. Please try again.', type: 'error' });
        } finally {
            setIsSaving(false);
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
                        <div className="je-card" style={{ overflow: 'visible' }}>
                            <div className="je-input-row" style={{ position: 'relative' }} ref={phoneContainerRef}>
                                <i className="fa-solid fa-phone je-field-icon"></i>
                                <input
                                    type="tel"
                                    className="je-input"
                                    placeholder="Customer Phone number"
                                    value={phone || ''}
                                    onChange={e => handlePhoneSearch(e.target.value)}
                                    autoComplete="off"
                                />
                                {phone && (
                                    <button
                                        type="button"
                                        className="je-phone-reset-btn"
                                        onClick={() => {
                                            setPhone('');
                                            setPhoneSearchResults([]);
                                            setPhoneError('');
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                                {phoneSearchResults.length > 0 && !showCustomerModal && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        background: '#fff',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        zIndex: 1000,
                                        maxHeight: '200px',
                                        overflowY: 'auto',
                                        marginTop: '4px',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {phoneSearchResults.map((res, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    padding: '12px 16px',
                                                    borderBottom: '1px solid #f1f5f9',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                                onMouseDown={() => selectCustomerByPhone(res.contact_no || res.Mobile || res)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <span style={{ fontWeight: '600', color: '#1e293b' }}>{res.contact_no || res.Mobile || res}</span>
                                                <i className="fa-solid fa-chevron-right" style={{ fontSize: '10px', color: '#94a3b8' }}></i>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {phoneError && !showCustomerModal && (
                                    <div className="je-phone-error-msg">
                                        <i className="fa-solid fa-circle-exclamation" style={{ marginRight: '6px' }}></i>
                                        {phoneError}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="je-modal-plus-btn"
                                    onClick={() => setShowCustomerModal(true)}
                                    title="Add/Search Customer"
                                >
                                    <i className="fa-solid fa-user-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Product Details ───────────────────────────── */}
                    <div className="je-section">
                        <h2 className="je-section-title">Product Details</h2>
                        <div className="je-card je-product-card" style={{ overflow: 'visible' }}>
                            <div className="je-unified-grid-container">
                                {/* Row 1: Brand + Model */}
                                <div className="je-input-row je-grid-left-item">
                                    <i className="fa-solid fa-tag je-field-icon"></i>
                                    <input
                                        className="je-input"
                                        placeholder="Brand"
                                        value={brand || ''}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={() => openPicker('brand')}
                                        title="Double-click to pick a brand"
                                    />
                                    {brand ? (
                                        <button className="je-modal-x" onClick={() => setBrand('')}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right je-field-icon-right"></i>
                                    )}
                                </div>
                                <div className="je-v-line"></div>
                                <div className="je-input-row je-grid-right-item">
                                    <i className="fa-solid fa-mobile-screen-button je-field-icon"></i>
                                    <input
                                        className="je-input"
                                        placeholder="Model"
                                        value={model || ''}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={() => openPicker('model')}
                                        title="Double-click to pick a model"
                                    />
                                    {model ? (
                                        <button className="je-modal-x" onClick={() => setModel('')}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right je-field-icon-right"></i>
                                    )}
                                </div>

                                {/* Row 2: Color + Collect */}
                                <div className="je-input-row je-grid-left-item je-border-top">
                                    <i className="fa-solid fa-palette je-field-icon"></i>
                                    <input
                                        className="je-input"
                                        placeholder="Color"
                                        value={color || ''}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={() => openPicker('color')}
                                        title="Double-click to pick a color"
                                    />
                                    {color ? (
                                        <button className="je-modal-x" onClick={() => setColor('')}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right je-field-icon-right"></i>
                                    )}
                                </div>
                                <div className="je-v-line je-border-top"></div>
                                <div className="je-input-row je-grid-right-item je-border-top">
                                    <i className="fa-solid fa-box je-field-icon"></i>
                                    <input
                                        className="je-input"
                                        placeholder="Collect"
                                        value={collect || ''}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={() => openPicker('collect')}
                                        title="Double-click to pick collect type"
                                    />
                                    {collect ? (
                                        <button className="je-modal-x" onClick={() => setCollect('')}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right je-field-icon-right"></i>
                                    )}
                                </div>

                                {/* Row 3: Status + Complaint */}
                                <div className="je-input-row je-grid-left-item je-border-top">
                                    <i className="fa-solid fa-circle-info je-field-icon"></i>
                                    <input
                                        className="je-input"
                                        placeholder="Status"
                                        value={status || ''}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={() => openPicker('status')}
                                        title="Double-click to pick a status"
                                    />
                                    {status ? (
                                        <button className="je-modal-x" onClick={() => setStatus('')}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right je-field-icon-right"></i>
                                    )}
                                </div>
                                <div className="je-v-line je-border-top"></div>
                                <div className="je-input-row je-grid-right-item je-border-top">
                                    <i className="fa-solid fa-triangle-exclamation je-field-icon"></i>
                                    <input
                                        className="je-input"
                                        placeholder="Complaint"
                                        value={complaint || ''}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={() => openPicker('complaint')}
                                        title="Double-click to pick a complaint"
                                    />
                                    {complaint ? (
                                        <button className="je-modal-x" onClick={() => setComplaint('')}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    ) : (
                                        <i className="fa-solid fa-chevron-right je-field-icon-right"></i>
                                    )}
                                </div>

                                {/* Row 4: Warranty (Full Width spanning 3 cols) */}
                                <div className="je-grid-full-width je-radio-group je-warranty-pills je-border-top">
                                    {[
                                        { val: 'warranty', label: 'Warranty' },
                                        { val: 'out', label: 'Out of warranty' },
                                        { val: 'non', label: 'Non warranty' },
                                    ].map(w => (
                                        <label key={w.val} className={`je-radio-pill ${warranty === w.val ? 'active' : ''}`}>
                                            <input type="radio" name="warranty" value={w.val} checked={warranty === w.val} onChange={() => setWarranty(w.val)} />
                                            <span className="je-radio-dot"></span>
                                            <span>{w.label}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Row 5: Serials */}
                                <div className="je-input-row je-grid-left-item je-border-top">
                                    <i className="fa-solid fa-table-cells-large je-field-icon"></i>
                                    <input className="je-input" placeholder="Serial number" value={serial1} onChange={e => setSerial1(e.target.value)} />
                                    <i className="fa-solid fa-qrcode je-field-icon-right"></i>
                                </div>
                                <div className="je-v-line je-border-top"></div>
                                <div className="je-input-row je-grid-right-item je-border-top">
                                    <i className="fa-solid fa-table-cells-large je-field-icon"></i>
                                    <input className="je-input" placeholder="Serial number" value={serial2} onChange={e => setSerial2(e.target.value)} />
                                    <i className="fa-solid fa-qrcode je-field-icon-right"></i>
                                </div>

                                {/* Row 6: Technician (Full Width) */}
                                <div className="je-grid-full-width je-input-row je-border-top" style={{ position: 'relative' }} ref={technicianContainerRef}>
                                    <i className="fa-solid fa-user-gear je-field-icon"></i>
                                    <input
                                        className="je-input"
                                        placeholder="Technician"
                                        value={technician}
                                        onChange={e => handleTechnicianSearch(e.target.value)}
                                        onFocus={() => { if (technician) handleTechnicianSearch(technician); }}
                                        autoComplete="off"
                                    />
                                    {techLoading ? (
                                        <i className="fa-solid fa-spinner fa-spin je-field-icon-right"></i>
                                    ) : technician && (
                                        <button className="je-modal-x" onClick={() => { setTechnician(''); setTechnicianId(''); setTechnicianSearchResults([]); }}>
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    )}

                                    {techDropdownOpen && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            background: '#fff',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                            zIndex: 100,
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            marginTop: '4px',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            {technicianSearchResults.length > 0 ? (
                                                technicianSearchResults.map((tech, idx) => (
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
                                                            setTechnician(tech.name || '');
                                                            setTechnicianId(tech.id || '');
                                                            setTechnicianSearchResults([]);
                                                            setTechDropdownOpen(false);
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <span style={{ fontWeight: '600', color: '#1e293b' }}>{tech.name}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '13px', textAlign: 'center' }}>
                                                    No technicians found
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Row 7: Attachments (Full Width) */}
                                <div className="je-grid-full-width je-attach-row je-border-top">
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
                    </div>

                    {/* ── Terms ─────────────────────────────────────── */}
                    <div className="je-section">
                        <h2 className="je-section-title">Terms</h2>
                        <div className="je-card je-terms-card" style={{ padding: 0, overflow: 'visible' }}>
                            <div className="je-unified-grid-container">
                                {/* Row 1: Expected date + Job received */}
                                <div className="je-terms-field je-grid-left-item" style={{ padding: '12px 14px' }}>
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
                                <div className="je-v-line"></div>
                                <div className="je-terms-field je-grid-right-item" style={{ padding: '12px 14px' }}>
                                    <label className="je-terms-label">Job Received</label>
                                    <div className="je-terms-input-wrap">
                                        <i className="fa-regular fa-calendar je-terms-fi"></i>
                                        <input
                                            type="date"
                                            className="je-terms-native-input"
                                            value={jobReceived || new Date().toISOString().slice(0, 10)}
                                            onChange={e => setJobReceived(e.target.value)}
                                            onClick={(e) => e.target.showPicker?.()}
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Estimated + Advance */}
                                <div className="je-terms-field je-grid-left-item je-border-top" style={{ padding: '12px 14px' }}>
                                    <label className="je-terms-label">Estimated Amount</label>
                                    <div className="je-terms-input-wrap">
                                        <span className="je-terms-rupee">₹</span>
                                        <input
                                            className="je-terms-native-input"
                                            placeholder="0.00"
                                            type="number"
                                            value={estimatedAmount || ''}
                                            onChange={e => setEstimatedAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="je-v-line je-border-top"></div>
                                <div className="je-terms-field je-grid-right-item je-border-top" style={{ padding: '12px 14px' }}>
                                    <label className="je-terms-label">Advance Received</label>
                                    <div className="je-terms-input-wrap">
                                        <span className="je-terms-rupee">₹</span>
                                        <input
                                            className="je-terms-native-input"
                                            placeholder="0.00"
                                            type="number"
                                            value={advanceReceived || ''}
                                            onChange={e => setAdvanceReceived(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Multi mode toggle & Splits (Outside grid container to keep standard padding) */}
                            <div style={{ padding: '20px 24px' }}>
                                <div className="je-terms-toggle-bar">
                                    <span className="je-terms-toggle-label">Multi mode payment splits</span>
                                    <label className="je-toggle-switch">
                                        <input type="checkbox" checked={multiMode} onChange={e => setMultiMode(e.target.checked)} />
                                        <span className="je-toggle-track"><span className="je-toggle-thumb"></span></span>
                                    </label>
                                </div>
                            </div>

                            {/* Payment Split Rows */}
                            <div className="je-splits-list">
                                {[
                                    { id: '1', method: 'Cash', icon: 'fa-regular fa-money-bill-1', hasDropdown: true, groupKey: 'cash_group' },
                                    { id: '2', method: 'Federal Bank Swiping', icon: 'fa-regular fa-credit-card', hasDropdown: true, groupKey: 'card_group' },
                                    { id: '3', method: 'Google Pay', icon: 'fa-brands fa-google-pay', hasDropdown: true, groupKey: 'upi_group' },
                                    { id: '4', method: 'Bajaj FinServ', icon: 'fa-regular fa-credit-card', hasDropdown: true, groupKey: 'financier_group' },
                                    { id: '5', method: 'Margin Free', icon: 'fa-solid fa-gift', hasDropdown: true, groupKey: 'wallet_group' },
                                    { id: '6', method: 'Credit', icon: 'fa-regular fa-credit-card', hasDropdown: false, groupKey: '' }
                                ].filter(s => multiMode ? true : s.id === '1').map(split => (
                                    <div key={split.id} className="je-split-row-wrap">
                                        <div className="je-split-row">

                                            {/* LEFT: icon + method name/select */}
                                            <div className="je-split-pill je-split-pill--method">
                                                <span className="je-split-pill-icon"><i className={split.icon}></i></span>
                                                {split.hasDropdown ? (
                                                    <div
                                                        className="je-split-custom-select"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setOpenPaymentDropdown(prev => prev === split.method ? null : split.method);
                                                        }}
                                                    >
                                                        <span className="je-split-custom-value">
                                                            {paymentSelections[split.method]?.name || split.method}
                                                        </span>
                                                        <i className="fa-solid fa-chevron-down je-split-custom-chevron"></i>
                                                        {openPaymentDropdown === split.method && (
                                                            <div className="je-split-custom-options" onClick={e => e.stopPropagation()}>
                                                                {(paymentGroups[split.groupKey] || []).length > 0 ? (
                                                                    paymentGroups[split.groupKey].map((item) => (
                                                                        <div
                                                                            key={item.InternalAccountsID}
                                                                            className={`je-split-custom-option ${paymentSelections[split.method]?.id === item.InternalAccountsID ? 'active' : ''}`}
                                                                            onClick={() => {
                                                                                setPaymentSelections(prev => ({
                                                                                    ...prev,
                                                                                    [split.method]: { name: item.AccountsName, id: item.InternalAccountsID }
                                                                                }));
                                                                                setOpenPaymentDropdown(null);
                                                                            }}
                                                                        >
                                                                            {item.AccountsName}
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <div className="je-split-custom-option">{split.method}</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
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
                                                    value={paymentAmounts[split.method] || ''}
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setPaymentAmounts(prev => ({ ...prev, [split.method]: val }));
                                                    }}
                                                />
                                                <button
                                                    className="je-split-x-btn"
                                                    onClick={() => setPaymentAmounts(prev => ({ ...prev, [split.method]: '' }))}
                                                >
                                                    <i className="fa-solid fa-xmark"></i>
                                                </button>
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
                                                        let v = e.target.value.replace(/\D/g, '');
                                                        v = v.replace(/(.{4})/g, '$1 ').trim();
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

                    {/* Feedback Message */}
                    {saveMessage.text && (
                        <div className={`je-save-feedback ${saveMessage.type}`}>
                            {saveMessage.type === 'success' ? <i className="fa-solid fa-circle-check"></i> :
                                saveMessage.type === 'error' ? <i className="fa-solid fa-circle-xmark"></i> :
                                    <i className="fa-solid fa-spinner fa-spin"></i>}
                            <span>{saveMessage.text}</span>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="je-full-save-button-container">
                        <button
                            className={`je-full-save-btn ${isSaving ? 'saving' : ''}`}
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 8 }}></i>
                                    Saving...
                                </>
                            ) : 'Save'}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Generic Field Picker Modal ───────────────────── */}
            {activePicker && (
                <div className="je-modal-overlay je-brand-overlay" onClick={closePicker}>
                    <div className="je-brand-picker" onClick={e => e.stopPropagation()}>

                        {/* Title */}
                        <div className="je-picker-title-row">
                            <span className="je-picker-title">{FIELD_LABELS[activePicker]}</span>
                        </div>

                        {/* Streamlined single-layer search/add input */}
                        <div className="je-picker-search-container">
                            <div className="je-picker-search-field">
                                <i className={`fa-solid ${showAddItem ? 'fa-plus' : 'fa-magnifying-glass'} je-picker-search-icon`}></i>
                                <input
                                    className="je-picker-search-input"
                                    placeholder={showAddItem ? `Enter new ${FIELD_LABELS[activePicker]?.toLowerCase()}...` : `Search ${FIELD_LABELS[activePicker]?.toLowerCase()}...`}
                                    value={showAddItem ? newItemInput : pickerSearch}
                                    onChange={e => showAddItem ? setNewItemInput(e.target.value) : setPickerSearch(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && showAddItem && handlePickerAddNew()}
                                />
                                {showAddItem ? (
                                    <button
                                        className="je-picker-save-btn"
                                        onClick={handlePickerAddNew}
                                        disabled={!newItemInput.trim()}
                                        title="Save New"
                                    >
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                ) : (
                                    <button
                                        className="je-picker-add-toggle-btn"
                                        onClick={() => { setShowAddItem(true); setNewItemInput(pickerSearch); }}
                                        title="Add New"
                                    >
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Options Grid */}
                        <div className="je-brand-grid">
                            {lookupLoading ? (
                                <p className="je-brand-empty" style={{ gridColumn: '1/-1' }}>
                                    <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 6 }}></i>
                                    Loading…
                                </p>
                            ) : activeOptions.length > 0 ? activeOptions.map((opt, i) => (
                                <button
                                    key={i}
                                    className={`je-brand-chip ${activePicker === 'collect'
                                        ? (collect.split(', ').includes(opt.label) ? 'active' : '')
                                        : (FIELD_VALUES[activePicker] === opt.label ? 'active' : '')
                                        }`}
                                    onClick={() => handlePickerSelect(opt)}
                                >
                                    {opt.label}
                                </button>
                            )) : (
                                <p className="je-brand-empty">No options found</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="je-picker-actions">
                            <button
                                className={`je-brand-cancel-btn ${activePicker === 'collect' ? 'je-brand-done-btn' : ''}`}
                                onClick={closePicker}
                            >
                                {activePicker === 'collect' ? 'Done' : 'Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Customer Details Modal ──────────────────────── */}
            {showCustomerModal && (
                <div className="je-modal-overlay je-bottom" onClick={() => setShowCustomerModal(false)}>
                    <div className="je-filter-modal" onClick={e => e.stopPropagation()}>
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
                                    value={custName || ''}
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
                            <div className="je-modal-field je-border-top" style={{ position: 'relative' }} ref={modalPhoneContainerRef}>
                                <i className="fa-solid fa-phone je-field-icon"></i>
                                <input
                                    type="tel"
                                    className="je-input"
                                    placeholder="Customer Phone number"
                                    value={custPhone}
                                    onChange={e => handlePhoneSearch(e.target.value, setCustPhone)}
                                    autoComplete="off"
                                />
                                {custPhone && (
                                    <button className="je-modal-x" onClick={() => { setCustPhone(''); setPhoneSearchResults([]); }}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}
                                {phoneSearchResults.length > 0 && showCustomerModal && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        background: '#fff',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '8px',
                                        zIndex: 2000,
                                        maxHeight: '180px',
                                        overflowY: 'auto',
                                        marginTop: '4px',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        {phoneSearchResults.map((res, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    padding: '12px 16px',
                                                    borderBottom: '1px solid #f1f5f9',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}
                                                onMouseDown={() => {
                                                    const p = res.contact_no || res.Mobile || res;
                                                    setCustPhone(p);
                                                    setPhoneSearchResults([]);
                                                    setPhoneError('');
                                                    // Trigger full record fetch
                                                    selectCustomerByPhone(p);
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <span style={{ fontWeight: '600', color: '#1e293b' }}>{res.contact_no || res.Mobile || res}</span>
                                                <i className="fa-solid fa-chevron-right" style={{ fontSize: '10px', color: '#94a3b8' }}></i>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {phoneError && (
                                    <div style={{ position: 'absolute', top: '100%', left: 0, padding: '8px', background: '#fee2e2', color: '#ef4444', fontSize: '12px', border: '1px solid #f87171', borderRadius: '4px', zIndex: 2100, marginTop: '4px' }}>
                                        {phoneError}
                                    </div>
                                )}
                            </div>
                            <div className="je-modal-field je-border-top">
                                <i className="fa-solid fa-location-dot je-field-icon"></i>
                                <input className="je-input" placeholder="Address" value={custAddress || ''} onChange={e => setCustAddress(e.target.value)} />
                             </div>
                            {/* Route — searchable autocomplete */}
                            <div className="je-modal-field je-border-top" style={{ position: 'relative', zIndex: routeDropdownOpen ? 100 : 1 }}>
                                <i className="fa-solid fa-route je-field-icon"></i>
                                <input
                                    className="je-input"
                                    placeholder="Select Route"
                                    value={custRoute}
                                    autoComplete="off"
                                    onChange={e => {
                                        setCustRoute(e.target.value);
                                        setCustRouteId('');
                                        setRouteDropdownOpen(true);
                                    }}
                                    onFocus={() => setRouteDropdownOpen(true)}
                                    onBlur={() => setTimeout(() => setRouteDropdownOpen(false), 150)}
                                />
                                {custRoute && (
                                    <button className="je-modal-x" onMouseDown={e => { e.preventDefault(); setCustRoute(''); setCustRouteId(''); setRouteDropdownOpen(false); }}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}

                                {routeDropdownOpen && custRoute.trim().length > 0 && routesList.filter(r => r.name.toLowerCase().includes(custRoute.toLowerCase())).length > 0 && (
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
                                        {routesList
                                            .filter(r => r.name.toLowerCase().includes(custRoute.toLowerCase()))
                                            .map((r, idx) => (
                                                <div
                                                    key={idx}
                                                    onMouseDown={e => {
                                                        e.preventDefault();
                                                        setCustRoute(r.name);
                                                        setCustRouteId(r.id);
                                                        setRouteDropdownOpen(false);
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    style={{
                                                        padding: '12px 16px',
                                                        borderBottom: '1px solid #f1f5f9',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ fontWeight: '600', color: '#1e293b' }}>{r.name}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                            {/* Class — searchable autocomplete */}
                            <div className="je-modal-field je-border-top" style={{ position: 'relative', zIndex: classDropdownOpen ? 100 : 1 }}>
                                <i className="fa-solid fa-layer-group je-field-icon"></i>
                                <input
                                    className="je-input"
                                    placeholder="Select Class"
                                    value={custClass}
                                    autoComplete="off"
                                    onChange={e => {
                                        setCustClass(e.target.value);
                                        setCustClassId('');
                                        setClassDropdownOpen(true);
                                    }}
                                    onFocus={() => setClassDropdownOpen(true)}
                                    onBlur={() => setTimeout(() => setClassDropdownOpen(false), 150)}
                                />
                                {custClass && (
                                    <button className="je-modal-x" onMouseDown={e => { e.preventDefault(); setCustClass(''); setCustClassId(''); setClassDropdownOpen(false); }}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}

                                {classDropdownOpen && custClass.trim().length > 0 && classList.filter(c => c.name.toLowerCase().includes(custClass.toLowerCase())).length > 0 && (
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
                                        {classList
                                            .filter(c => c.name.toLowerCase().includes(custClass.toLowerCase()))
                                            .map((c, idx) => (
                                                <div
                                                    key={idx}
                                                    onMouseDown={e => {
                                                        e.preventDefault();
                                                        setCustClass(c.name);
                                                        setCustClassId(c.id);
                                                        setClassDropdownOpen(false);
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    style={{
                                                        padding: '12px 16px',
                                                        borderBottom: '1px solid #f1f5f9',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ fontWeight: '600', color: '#1e293b' }}>{c.name}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                            {/* State — same style as Customer Name */}
                            <div className="je-modal-field je-border-top" style={{ position: 'relative', zIndex: stateDropdownOpen ? 100 : 1 }}>
                                <i className="fa-solid fa-map je-field-icon"></i>
                                <input
                                    className="je-input"
                                    placeholder="Select state"
                                    value={custState}
                                    autoComplete="off"
                                    onChange={e => {
                                        setCustState(e.target.value);
                                        setStateDropdownOpen(true);
                                    }}
                                    onFocus={() => setStateDropdownOpen(true)}
                                    onBlur={() => setTimeout(() => setStateDropdownOpen(false), 150)}
                                />
                                {custState && (
                                    <button className="je-modal-x" onMouseDown={e => { e.preventDefault(); setCustState(''); setStateDropdownOpen(false); }}>
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                )}

                                {stateDropdownOpen && custState.trim().length > 0 && statesList.filter(s => s.toLowerCase().includes(custState.toLowerCase())).length > 0 && (
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
                                        {statesList
                                            .filter(s => s.toLowerCase().includes(custState.toLowerCase()))
                                            .map((s, idx) => (
                                                <div
                                                    key={idx}
                                                    onMouseDown={e => {
                                                        e.preventDefault();
                                                        setCustState(s);
                                                        setStateDropdownOpen(false);
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f8fafc'}
                                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    style={{
                                                        padding: '12px 16px',
                                                        borderBottom: '1px solid #f1f5f9',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ fontWeight: '600', color: '#1e293b' }}>{s}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                            {/* GST */}
                            <div className="je-modal-field je-border-top">
                                <i className="fa-regular fa-id-card je-field-icon"></i>
                                <input className="je-input" placeholder="Enter GST" value={custGst} onChange={e => setCustGst(e.target.value)} />
                                <span className="je-modal-divider"></span>
                                <button className="je-modal-download"><i className="fa-solid fa-download"></i></button>
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
    const [view, setView] = useState('list');
    const [editData, setEditData] = useState(null);

    const handleItemClick = async (item) => {
        const internalId = item.InternalServiceID || item.ServiceID;
        if (!internalId) return;

        try {
            const licenseKey = localStorage.getItem("licenseKey") || "ILT_LIC_9988056";
            const imei = localStorage.getItem("imei") || "ILTUKAInpackPro1";
            const pin = localStorage.getItem("pin") || "2255";
            const internalUserId = localStorage.getItem("internalUserId") || "41";

            const url = `/api2025/InPackService.asmx/getJobEntryDetails?InternalServiceID=${internalId}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&InternalUserID=${internalUserId}`;
            
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
                // The API structure from getJobEntryDetails is data.service[0]
                const record = (data.service && data.service[0]) ? data.service[0] : 
                               (Array.isArray(data) ? data[0] : (data.Table ? data.Table[0] : (data.data ? data.data[0] : data)));
                if (record) {
                    setEditData(record);
                    setView('form');
                }
            }
        } catch (err) {
            console.error('getJobEntryDetails error:', err);
        }
    };

    const STATUS_OPTIONS = [
        { id: 0, label: 'All' },
        { id: 1, label: 'Not Alloted' },
        { id: 2, label: 'Not Completed' },
        { id: 3, label: 'Not Delivered' },
        { id: 4, label: 'Delivered' },
        { id: 5, label: 'Alloted But Not Completed' },
        { id: 6, label: 'Completed But Not Delivered' },
    ];

    if (view === 'form') {
        return <ServiceForm 
            editData={editData} 
            onBack={() => {
                setView('list');
                setEditData(null);
            }} 
        />;
    }

    return (
        <ServiceList 
            title="Service List"
            statusOptions={STATUS_OPTIONS}
            onAddNew={() => {
                setEditData(null);
                setView('form');
            }}
            onItemClick={handleItemClick}
        />
    );
};

export default JobEntry;
