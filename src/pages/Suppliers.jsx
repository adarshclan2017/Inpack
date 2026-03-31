import React, { useState } from 'react';
import '../styles/Suppliers.css';

export default function Suppliers({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form states
    const [gstIn, setGstIn] = useState('');
    const [name, setName] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    return (
        <div className="sup-desktop-wrapper">
            {/* Teal Header matching screenshot */}
            <div className="sup-header-bar">
                <button className="sup-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="sup-title">Suppliers</h1>
                <div style={{ width: '36px' }}></div>
            </div>

            {/* Rounded square FAB button */}
            <button className="sup-fab-btn" onClick={() => setIsAddModalOpen(true)}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Add Modal overlay */}
            {isAddModalOpen && (
                <div className="sup-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    {/* Block click propagation */}
                    <div className="sup-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="sup-modal-header">
                            <h2 className="sup-modal-title">Add Supplier</h2>
                            <button className="sup-modal-close" onClick={() => setIsAddModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="sup-modal-body">
                            {/* Bounding box for the 7 inputs */}
                            <div className="sup-input-group">
                                
                                {/* 1. GST IN */}
                                <div className="sup-input-row">
                                    <span className="sup-input-icon sub-text">123</span>
                                    <input type="text" className="sup-input-field" value={gstIn} onChange={(e) => setGstIn(e.target.value)} placeholder="GST IN" />
                                    <div className="sup-input-actions">
                                        <div className="sup-input-divider"></div>
                                        <i className="fa-solid fa-xmark sup-input-clear" onClick={() => setGstIn('')}></i>
                                    </div>
                                </div>

                                {/* 2. Supplier Name */}
                                <div className="sup-input-row">
                                    <i className="fa-regular fa-user sup-input-icon"></i>
                                    <input type="text" className="sup-input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Supplier Name" />
                                    <div className="sup-input-actions">
                                        <div className="sup-input-divider"></div>
                                        <i className="fa-solid fa-xmark sup-input-clear" onClick={() => setName('')}></i>
                                    </div>
                                </div>

                                {/* 3. Supplier Id */}
                                <div className="sup-input-row">
                                    <i className="fa-solid fa-address-book sup-input-icon"></i>
                                    <input type="text" className="sup-input-field" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} placeholder="Supplier Id" />
                                    <div className="sup-input-actions">
                                        <div className="sup-input-divider"></div>
                                        <i className="fa-solid fa-xmark sup-input-clear" onClick={() => setSupplierId('')}></i>
                                    </div>
                                </div>

                                {/* 4. Address 1 */}
                                <div className="sup-input-row">
                                    <i className="fa-solid fa-location-dot sup-input-icon"></i>
                                    <input type="text" className="sup-input-field" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address 1" />
                                    <div className="sup-input-actions">
                                        <div className="sup-input-divider"></div>
                                        <i className="fa-solid fa-xmark sup-input-clear" onClick={() => setAddress1('')}></i>
                                    </div>
                                </div>

                                {/* 5. Address 2 */}
                                <div className="sup-input-row">
                                    <i className="fa-solid fa-location-dot sup-input-icon"></i>
                                    <input type="text" className="sup-input-field" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address 2" />
                                    <div className="sup-input-actions">
                                        <div className="sup-input-divider"></div>
                                        <i className="fa-solid fa-xmark sup-input-clear" onClick={() => setAddress2('')}></i>
                                    </div>
                                </div>

                                {/* 6. City */}
                                <div className="sup-input-row">
                                    <i className="fa-regular fa-building sup-input-icon"></i>
                                    <input type="text" className="sup-input-field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                                    <div className="sup-input-actions">
                                        <div className="sup-input-divider"></div>
                                        <i className="fa-solid fa-xmark sup-input-clear" onClick={() => setCity('')}></i>
                                    </div>
                                </div>

                                {/* 7. State */}
                                <div className="sup-input-row sup-col-span-2">
                                    <i className="fa-solid fa-map sup-input-icon"></i>
                                    <input type="text" className="sup-input-field" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                                    <div className="sup-input-actions">
                                        {/* State does not have a vertical divider in the screenshot */}
                                        <i className="fa-solid fa-xmark sup-input-clear padding-left-fix" onClick={() => setState('')}></i>
                                    </div>
                                </div>
                                
                            </div>
                            
                            {/* Secondary Buttons Row */}
                            <div className="sup-secondary-buttons">
                                <button className="sup-secondary-btn">Financial Details</button>
                                <button className="sup-secondary-btn">More Details</button>
                            </div>
                        </div>

                        {/* Flat, wide, teal Add button */}
                        <button className="sup-modal-add-btn" onClick={() => setIsAddModalOpen(false)}>
                            Add
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
