import React, { useState } from 'react';
import '../styles/Customers.css';

export default function Customers({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form states
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [printingName, setPrintingName] = useState('');
    const [address1, setAddress1] = useState('');
    const [state, setState] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [route, setRoute] = useState('');
    const [remarks, setRemarks] = useState('');

    // GST/Commercial Details Modal states
    const [isGstModalOpen, setIsGstModalOpen] = useState(false);
    const [gst, setGst] = useState('');
    const [legalName, setLegalName] = useState('');
    const [tradeName, setTradeName] = useState('');
    const [tdsApplicable, setTdsApplicable] = useState(false);
    const [tcsApplicable, setTcsApplicable] = useState(false);
    const [tcsAlert, setTcsAlert] = useState(false);

    // Commercial Details specific modal states
    const [isCommercialModalOpen, setIsCommercialModalOpen] = useState(false);
    const [creditPeriod, setCreditPeriod] = useState('');
    const [creditLimit, setCreditLimit] = useState('');
    const [openingBalance, setOpeningBalance] = useState('');
    const [balanceType, setBalanceType] = useState('Cr'); // 'Cr' or 'Dr'
    const [openingTurnover, setOpeningTurnover] = useState('');
    const [openingReceipt, setOpeningReceipt] = useState('');

    // ID & Bank Modal states
    const [isIdModalOpen, setIsIdModalOpen] = useState(false);
    const [aadhaar, setAadhaar] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');

    // More Modal states
    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [moreEmail, setMoreEmail] = useState('');
    const [moreRemarks, setMoreRemarks] = useState('');
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [textField, setTextField] = useState('');

    const openModal = () => setIsAddModalOpen(true);
    const closeModal = () => setIsAddModalOpen(false);

    return (
        <div className="cust-desktop-wrapper">
            {/* Teal Header matching screenshot */}
            <div className="cust-header-bar">
                <button className="cust-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="cust-title">Customer</h1>
                <div style={{ width: '36px' }}></div>
            </div>


            {/* Rounded square FAB button */}
            <button className="cust-fab-btn" onClick={openModal}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Add Modal overlay */}
            {isAddModalOpen && (
                <div className="cust-modal-overlay" onClick={closeModal}>
                    {/* Block click propagation */}
                    <div className="cust-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="cust-modal-header">
                            <h2 className="cust-modal-title">Add Customer</h2>
                            <button className="cust-modal-close" onClick={closeModal}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="cust-modal-body">
                            {/* Bounding box formatting 9 inputs smartly for desktop */}
                            <div className="cust-form-group">
                                
                                <div className="cust-input-row">
                                    <span className="cust-input-icon cust-sub-text">123</span>
                                    <input type="text" className="cust-input-field" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder="Customer Id" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setCustomerId('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-regular fa-user cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setCustomerName('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-location-dot cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={printingName} onChange={(e) => setPrintingName(e.target.value)} placeholder="Printing Name" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setPrintingName('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-location-dot cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address 1" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setAddress1('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-book cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setState('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-phone cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setMobile('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-regular fa-envelope cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setEmail('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-route cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={route} onChange={(e) => setRoute(e.target.value)} placeholder="Route" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setRoute('')}></i>
                                    </div>
                                </div>

                                {/* Spanning 2 columns so it anchors neatly at the bottom of the grid row */}
                                <div className="cust-input-row span-2">
                                    <i className="fa-solid fa-shapes cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remaks" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setRemarks('')}></i>
                                    </div>
                                </div>

                            </div>

                            {/* Secondary Buttons Row (2x2 grid from snapshot) */}
                            <div className="cust-secondary-buttons">
                                <button className="cust-secondary-btn" onClick={() => setIsGstModalOpen(true)}>GST / IT</button>
                                <button className="cust-secondary-btn" onClick={() => setIsCommercialModalOpen(true)}>Commercial Details</button>
                                <button className="cust-secondary-btn" onClick={() => setIsIdModalOpen(true)}>ID & Bank</button>
                                <button className="cust-secondary-btn" onClick={() => setIsMoreModalOpen(true)}>More</button>
                            </div>
                        </div>

                        {/* Flat, wide, teal Save button */}
                        <button className="cust-modal-add-btn" onClick={closeModal}>
                            Save
                        </button>
                        
                    </div>
                </div>
            )}

            {/* Nested GST/Commercial Details Modal overlay */}
            {isGstModalOpen && (
                <div className="cust-nested-modal-overlay" onClick={() => setIsGstModalOpen(false)}>
                    {/* Block click propagation */}
                    <div className="cust-nested-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="cust-modal-header">
                            <h2 className="cust-modal-title">Commercial Details</h2>
                            <button className="cust-modal-close" onClick={() => setIsGstModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="cust-modal-body">
                            <div className="cust-form-group">
                                
                                <div className="cust-input-row">
                                    <span className="cust-input-icon cust-sub-text">123</span>
                                    <input type="text" className="cust-input-field" value={gst} onChange={(e) => setGst(e.target.value)} placeholder="GST" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setGst('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-regular fa-user cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={legalName} onChange={(e) => setLegalName(e.target.value)} placeholder="Legal name" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setLegalName('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row span-2">
                                    <i className="fa-solid fa-briefcase cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={tradeName} onChange={(e) => setTradeName(e.target.value)} placeholder="Trade name" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setTradeName('')}></i>
                                    </div>
                                </div>

                                <div className="cust-radio-group span-2">
                                    <div className="cust-radio-option" onClick={() => setTdsApplicable(!tdsApplicable)}>
                                        <i className={tdsApplicable ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}></i>
                                        <span>TDS Applicable</span>
                                    </div>
                                    <div className="cust-radio-option" onClick={() => setTcsApplicable(!tcsApplicable)}>
                                        <i className={tcsApplicable ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}></i>
                                        <span>TCS Applicable</span>
                                    </div>
                                    <div className="cust-radio-option" onClick={() => setTcsAlert(!tcsAlert)}>
                                        <i className={tcsAlert ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}></i>
                                        <span>TCS Alert</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button className="cust-modal-add-btn" onClick={() => setIsGstModalOpen(false)}>
                            Add
                        </button>
                        
                    </div>
                </div>
            )}

            {/* Nested Commercial Details Modal overlay */}
            {isCommercialModalOpen && (
                <div className="cust-nested-modal-overlay" onClick={() => setIsCommercialModalOpen(false)}>
                    <div className="cust-nested-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="cust-modal-header">
                            <h2 className="cust-modal-title">Commercial Details</h2>
                            <button className="cust-modal-close" onClick={() => setIsCommercialModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="cust-modal-body">
                            <div className="cust-form-group">
                                
                                <div className="cust-input-row">
                                    <i className="fa-regular fa-credit-card cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={creditPeriod} onChange={(e) => setCreditPeriod(e.target.value)} placeholder="Credit Period In Days" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setCreditPeriod('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-regular fa-credit-card cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} placeholder="Credit Limit" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setCreditLimit('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-wallet cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={openingBalance} onChange={(e) => setOpeningBalance(e.target.value)} placeholder="Opening Balance" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setOpeningBalance('')}></i>
                                    </div>
                                </div>

                                <div className="cust-radio-group">
                                    <div className="cust-radio-option" onClick={() => setBalanceType('Cr')}>
                                        <i className={balanceType === 'Cr' ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}></i>
                                        <span>Cr</span>
                                    </div>
                                    <div className="cust-radio-option" onClick={() => setBalanceType('Dr')}>
                                        <i className={balanceType === 'Dr' ? "fa-solid fa-circle-check" : "fa-regular fa-circle"}></i>
                                        <span>Dr</span>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-money-bill-transfer cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={openingTurnover} onChange={(e) => setOpeningTurnover(e.target.value)} placeholder="Opening TurnOver" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setOpeningTurnover('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-receipt cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={openingReceipt} onChange={(e) => setOpeningReceipt(e.target.value)} placeholder="Opening Receipt" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setOpeningReceipt('')}></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button className="cust-modal-add-btn" onClick={() => setIsCommercialModalOpen(false)}>
                            Add
                        </button>
                        
                    </div>
                </div>
            )}

            {/* Nested ID & Bank Modal overlay */}
            {isIdModalOpen && (
                <div className="cust-nested-modal-overlay" onClick={() => setIsIdModalOpen(false)}>
                    <div className="cust-nested-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="cust-modal-header">
                            <h2 className="cust-modal-title">ID & Bank</h2>
                            <button className="cust-modal-close" onClick={() => setIsIdModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="cust-modal-body">
                            <div className="cust-form-group">
                                
                                <div className="cust-input-row">
                                    <i className="fa-regular fa-id-card cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} placeholder="Aadhaar" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setAadhaar('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-regular fa-credit-card cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} placeholder="Pan number" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setPanNumber('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-building-columns cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Bank name" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setBankName('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <span className="cust-input-icon cust-sub-text">123</span>
                                    <input type="text" className="cust-input-field" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account number" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setAccountNumber('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row span-2">
                                    <i className="fa-regular fa-credit-card cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} placeholder="IFSC Code" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setIfscCode('')}></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button className="cust-modal-add-btn" onClick={() => setIsIdModalOpen(false)}>
                            Add
                        </button>
                        
                    </div>
                </div>
            )}

            {/* Nested More Modal overlay */}
            {isMoreModalOpen && (
                <div className="cust-nested-modal-overlay" onClick={() => setIsMoreModalOpen(false)}>
                    <div className="cust-nested-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="cust-modal-header">
                            <h2 className="cust-modal-title">More</h2>
                            <button className="cust-modal-close" onClick={() => setIsMoreModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="cust-modal-body">
                            <div className="cust-form-group">
                                
                                <div className="cust-input-row">
                                    <i className="fa-solid fa-location-dot cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address 2" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setAddress2('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-regular fa-building cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setCity('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-globe cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setCountry('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <span className="cust-input-icon cust-sub-text">123</span>
                                    <input type="text" className="cust-input-field" value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder="Pin Code" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setPinCode('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-phone cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={phone1} onChange={(e) => setPhone1(e.target.value)} placeholder="Phone 1" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setPhone1('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-phone cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={phone2} onChange={(e) => setPhone2(e.target.value)} placeholder="Phone 2" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setPhone2('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-regular fa-envelope cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={moreEmail} onChange={(e) => setMoreEmail(e.target.value)} placeholder="Email" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setMoreEmail('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-pencil cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={moreRemarks} onChange={(e) => setMoreRemarks(e.target.value)} placeholder="Remarks" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setMoreRemarks('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-receipt cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={text1} onChange={(e) => setText1(e.target.value)} placeholder="Text 1" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setText1('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row">
                                    <i className="fa-solid fa-receipt cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={text2} onChange={(e) => setText2(e.target.value)} placeholder="Text 2" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setText2('')}></i>
                                    </div>
                                </div>

                                <div className="cust-input-row span-2">
                                    <i className="fa-solid fa-receipt cust-input-icon"></i>
                                    <input type="text" className="cust-input-field" value={textField} onChange={(e) => setTextField(e.target.value)} placeholder="Text" />
                                    <div className="cust-input-actions">
                                        <div className="cust-input-divider"></div>
                                        <i className="fa-solid fa-xmark cust-input-clear" onClick={() => setTextField('')}></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button className="cust-modal-add-btn" onClick={() => setIsMoreModalOpen(false)}>
                            Add
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
