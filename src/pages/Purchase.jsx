import React, { useState } from 'react';
import '../styles/Purchase.css';

const Purchase = ({ setActiveTab }) => {
    // Top-level state
    const [orderNo, setOrderNo] = useState('');
    const [mode, setMode] = useState('');
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Accordion Internal State (Replicating exact duplicate fields from mock)
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceDate1, setInvoiceDate1] = useState('');
    const [supplier1, setSupplier1] = useState('');
    const [name1, setName1] = useState('');
    const [address1, setAddress1] = useState('');
    const [phone1, setPhone1] = useState('');
    
    // The mock explicitly repeats these 4 inputs a second time (Shipping vs Billing layout)
    const [invoiceDate2, setInvoiceDate2] = useState('');
    const [supplier2, setSupplier2] = useState('');
    const [name2, setName2] = useState('');
    const [address2, setAddress2] = useState('');
    const [phone2, setPhone2] = useState('');

    const [gstin, setGstin] = useState('');
    const [stateVal, setStateVal] = useState('');
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
    const [isOthersModalOpen, setIsOthersModalOpen] = useState(false);

    return (
        <div className="purchase-page-wrapper">
            <div className="purchase-container">
                {/* Header built precisely to spec */}
                <div className="purchase-header">
                    <button className="purchase-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <h2 className="purchase-header-title">Purchase Form</h2>
                </div>

                {/* Primary Panel */}
                <div className="purchase-card">
                    {/* Desktop Matrix */}
                    <div className="purchase-top-grid">
                        <div className="purchase-bill-info">
                            <div className="purchase-bill-col">
                                <span className="purchase-bill-label">Bill No</span>
                                <span className="purchase-bill-value">PBOOGD-27</span>
                            </div>
                            <div className="purchase-bill-col right">
                                <span className="purchase-bill-label">Bill Date</span>
                                <span className="purchase-bill-value">01-25-2025</span>
                            </div>
                        </div>

                        <div className="purchase-top-subgrid">
                            <fieldset className="purchase-input-box purchase-fieldset">
                                <legend>Order No</legend>
                                <div className="purchase-input-icon">
                                    <span style={{fontSize: '11px', fontWeight: 'bold'}}>123</span>
                                </div>
                                <input type="text" className="purchase-input-field" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
                                <div className="purchase-input-actions">
                                    <i className="fa-solid fa-caret-down"></i>
                                    <div className="purchase-divider"></div>
                                    <div className="purchase-clear-btn" onClick={() => setOrderNo('')}><i className="fa-solid fa-xmark"></i></div>
                                </div>
                            </fieldset>

                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-table-list"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Mode" value={mode} onChange={(e) => setMode(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-clear-btn" onClick={() => setMode('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>
                        </div>
                    </div>

                    <div className="purchase-options-row">
                        <button className="purchase-option-btn"><div className="purchase-option-icon"><i className="fa-solid fa-pen-nib"></i></div>Type</button>
                        <button className="purchase-option-btn"><div className="purchase-option-icon"><i className="fa-solid fa-location-dot"></i></div>Shop</button>
                    </div>

                    <div className="purchase-accordion-toggle" onClick={() => setIsDetailsOpen(!isDetailsOpen)}>
                        Invoice & Supplier Details
                        <div className="purchase-dashed-line"></div>
                        <i className={`fa-solid fa-caret-${isDetailsOpen ? 'up' : 'down'}`}></i>
                    </div>

                    {isDetailsOpen && (
                        <div className="purchase-desktop-grid">
                            {/* ROW 1 */}
                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-file-invoice"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Invoice No" value={invoiceNo} onChange={e=>setInvoiceNo(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setInvoiceNo('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>

                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><span style={{fontSize: '11px', fontWeight: 'bold'}}>123</span></div>
                                <input type="text" className="purchase-input-field" placeholder="GSTIN" value={gstin} onChange={e=>setGstin(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setGstin('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>

                            {/* ROW 2 */}
                            <div className="purchase-row">
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-calendar"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Invoice D..." value={invoiceDate1} onChange={e=>setInvoiceDate1(e.target.value)} />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setInvoiceDate1('')}><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-store"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Supplier" value={supplier1} onChange={e=>setSupplier1(e.target.value)} />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setSupplier1('')}><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                            </div>

                            <div className="purchase-row">
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-calendar"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Invoice D..." value={invoiceDate2} onChange={e=>setInvoiceDate2(e.target.value)} />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setInvoiceDate2('')}><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-store"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Supplier" value={supplier2} onChange={e=>setSupplier2(e.target.value)} />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setSupplier2('')}><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                            </div>

                            {/* ROW 3 */}
                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-user"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Name" value={name1} onChange={e=>setName1(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setName1('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>
                            
                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-user"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Name" value={name2} onChange={e=>setName2(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setName2('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>

                            {/* ROW 4 */}
                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-location-dot"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Address" value={address1} onChange={e=>setAddress1(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setAddress1('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>

                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-location-dot"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Address" value={address2} onChange={e=>setAddress2(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setAddress2('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>

                            {/* ROW 5 */}
                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-phone"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Phone" value={phone1} onChange={e=>setPhone1(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setPhone1('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>

                            <div className="purchase-input-box">
                                <div className="purchase-input-icon"><i className="fa-solid fa-phone"></i></div>
                                <input type="text" className="purchase-input-field" placeholder="Phone" value={phone2} onChange={e=>setPhone2(e.target.value)} />
                                <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn" onClick={()=>setPhone2('')}><i className="fa-solid fa-xmark"></i></div></div>
                            </div>

                            {/* ROW 6: State spans both cols locking the bottom beautifully */}
                            <div className="purchase-input-box col-span-2">
                                <div className="purchase-input-icon"><i className="fa-solid fa-map"></i></div>
                                <select className="purchase-input-field" value={stateVal} onChange={e=>setStateVal(e.target.value)}>
                                    <option value="" disabled hidden>State</option>
                                    <option value="state1">Kerala</option>
                                    <option value="state2">Tamil Nadu</option>
                                    <option value="state3">Karnataka</option>
                                </select>
                                <div className="purchase-input-actions">
                                    <i className="fa-solid fa-caret-down"></i>
                                    <div className="purchase-divider"></div>
                                    <div className="purchase-clear-btn" onClick={()=>setStateVal('')}><i className="fa-solid fa-xmark"></i></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="purchase-footer-actions">
                    <div className="purchase-fast-actions-inline">
                        <button className="purchase-fast-btn" onClick={() => setIsItemModalOpen(true)}><div className="purchase-fast-icon"><i className="fa-solid fa-list-check"></i></div><div>Items</div></button>
                        <button className="purchase-fast-btn" onClick={() => setIsMoreModalOpen(true)}><div className="purchase-fast-icon"><i className="fa-solid fa-angles-right"></i></div><div>More</div></button>
                        <button className="purchase-fast-btn" onClick={() => setIsOthersModalOpen(true)}><div className="purchase-fast-icon"><i className="fa-solid fa-bars"></i></div><div>Others</div></button>
                    </div>
                    
                    <button className="purchase-save-btn">Save Purchase</button>
                </div>
            </div>

            {/* Modal Overlay Component */}
            {isItemModalOpen && (
                <div className="purchase-modal-overlay">
                    <div className="purchase-item-modal">
                        <div className="purchase-modal-header">
                            <h3>Product / Item Entry</h3>
                            <button className="purchase-modal-close" onClick={() => setIsItemModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="purchase-modal-body">
                            {/* Product Base Data */}
                            <div className="purchase-modal-top-section">
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><span style={{fontSize: '11px', fontWeight: 'bold'}}>123</span></div>
                                    <input type="text" className="purchase-input-field" placeholder="Product Id" />
                                    <div className="purchase-input-actions"><i className="fa-solid fa-caret-down"></i><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-font"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Product Name" />
                                    <div className="purchase-input-actions"><i className="fa-solid fa-caret-down"></i><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                            </div>

                            <div className="purchase-modal-info-row">
                                <div className="purchase-stock-info">Current Stock : <span style={{color: '#0ea5e9'}}>0</span></div>
                                <div className="purchase-modal-used-pill">
                                    <i className="fa-solid fa-circle-check"></i> Used Item
                                </div>
                            </div>

                            {/* Detailed Math Matrix */}
                            <div className="purchase-modal-grid">
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-calculator"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Quantity" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-weight-scale"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Unit" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>

                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-indian-rupee-sign"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Ex Rate" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><span style={{fontSize: '11px', fontWeight: 'bold'}}>123</span></div>
                                    <input type="text" className="purchase-input-field" placeholder="Tax" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>

                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-percent"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Discount %" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-dollar-sign"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Discount $" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>

                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><span style={{fontSize: '11px', fontWeight: 'bold'}}>123</span></div>
                                    <input type="text" className="purchase-input-field" placeholder="GST" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-coins"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Cess" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>

                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-coins"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Additional Cess" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                            </div>

                            <div className="purchase-modal-total">
                                <span>Total</span>
                                <span>40000</span>
                            </div>
                        </div>

                        <div className="purchase-modal-footer">
                            <button className="purchase-modal-save-btn">Save Item</button>
                        </div>
                    </div>
                </div>
            )}

            {/* More Details Modal */}
            {isMoreModalOpen && (
                <div className="purchase-modal-overlay">
                    <div className="purchase-item-modal" style={{maxWidth: '700px'}}>
                        <div className="purchase-modal-header">
                            <h3>Additional Charges & Taxes</h3>
                            <button className="purchase-modal-close" onClick={() => setIsMoreModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="purchase-modal-body">
                            <div className="purchase-modal-grid-2">
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-building-columns"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="TCS" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-percent"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="TCS %" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>

                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-wallet"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="TDS" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-percent"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="TDS %" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>

                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-tag"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Special Discount" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-file-invoice-dollar"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Other Charges" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>

                                <div className="purchase-input-box col-span-2">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-arrows-rotate"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Round Off" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                            </div>
                        </div>

                        <div className="purchase-modal-footer">
                            <button className="purchase-modal-save-btn">Save Details</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Others / Remarks Modal */}
            {isOthersModalOpen && (
                <div className="purchase-modal-overlay">
                    <div className="purchase-item-modal" style={{maxWidth: '500px'}}>
                        <div className="purchase-modal-header">
                            <h3>Other References</h3>
                            <button className="purchase-modal-close" onClick={() => setIsOthersModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="purchase-modal-body">
                            <div style={{border: '1px solid #cbd5e1', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-briefcase"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Job Reference" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                                <div className="purchase-input-box">
                                    <div className="purchase-input-icon"><i className="fa-solid fa-pen"></i></div>
                                    <input type="text" className="purchase-input-field" placeholder="Remarks" />
                                    <div className="purchase-input-actions"><div className="purchase-divider"></div><div className="purchase-clear-btn"><i className="fa-solid fa-xmark"></i></div></div>
                                </div>
                            </div>
                        </div>

                        <div className="purchase-modal-footer">
                            <button className="purchase-modal-save-btn">Save Details</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Purchase;
