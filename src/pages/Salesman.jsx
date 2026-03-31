import React, { useState } from 'react';
import '../styles/Salesman.css';

export default function Salesman({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form states mapped directly from screenshot
    const [salesmanId, setSalesmanId] = useState('');
    const [name, setName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');

    return (
        <div className="sales-desktop-wrapper">
            {/* Teal Header matching screenshot */}
            <div className="sales-header-bar">
                <button className="sales-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="sales-title">Salesman</h1>
                <div style={{ width: '36px' }}></div>
            </div>
        
            {/* Rounded square FAB button */}
            <button className="sales-fab-btn" onClick={() => setIsAddModalOpen(true)}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Add Modal overlay */}
            {isAddModalOpen && (
                <div className="sales-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    {/* Block click propagation */}
                    <div className="sales-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="sales-modal-header">
                            <h2 className="sales-modal-title">Add Salesman</h2>
                            <button className="sales-modal-close" onClick={() => setIsAddModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="sales-modal-body">
                            {/* Bounding box formatted natively as a 2-column desktop grid for the 6 inputs */}
                            <div className="sales-input-group">
                                
                                {/* 1. Salesman ID */}
                                <div className="sales-input-row">
                                    <span className="sales-input-icon sales-sub-text">123</span>
                                    <input type="text" className="sales-input-field" value={salesmanId} onChange={(e) => setSalesmanId(e.target.value)} placeholder="Salesman ID" />
                                    <div className="sales-input-actions">
                                        <div className="sales-input-divider"></div>
                                        <i className="fa-solid fa-xmark sales-input-clear" onClick={() => setSalesmanId('')}></i>
                                    </div>
                                </div>

                                {/* 2. Salesman Name */}
                                <div className="sales-input-row">
                                    <i className="fa-regular fa-user sales-input-icon"></i>
                                    <input type="text" className="sales-input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Salesman Name" />
                                    <div className="sales-input-actions">
                                        <div className="sales-input-divider"></div>
                                        <i className="fa-solid fa-xmark sales-input-clear" onClick={() => setName('')}></i>
                                    </div>
                                </div>

                                {/* 3. Address 1 */}
                                <div className="sales-input-row">
                                    <i className="fa-solid fa-location-dot sales-input-icon"></i>
                                    <input type="text" className="sales-input-field" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address 1" />
                                    <div className="sales-input-actions">
                                        <div className="sales-input-divider"></div>
                                        <i className="fa-solid fa-xmark sales-input-clear" onClick={() => setAddress1('')}></i>
                                    </div>
                                </div>

                                {/* 4. Address 2 */}
                                <div className="sales-input-row">
                                    <i className="fa-solid fa-location-dot sales-input-icon"></i>
                                    <input type="text" className="sales-input-field" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address 2" />
                                    <div className="sales-input-actions">
                                        <div className="sales-input-divider"></div>
                                        <i className="fa-solid fa-xmark sales-input-clear" onClick={() => setAddress2('')}></i>
                                    </div>
                                </div>

                                {/* 5. City */}
                                <div className="sales-input-row">
                                    <i className="fa-regular fa-building sales-input-icon"></i>
                                    <input type="text" className="sales-input-field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                                    <div className="sales-input-actions">
                                        <div className="sales-input-divider"></div>
                                        <i className="fa-solid fa-xmark sales-input-clear" onClick={() => setCity('')}></i>
                                    </div>
                                </div>

                                {/* 6. Mobile */}
                                <div className="sales-input-row">
                                    <i className="fa-solid fa-phone sales-input-icon"></i>
                                    <input type="text" className="sales-input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
                                    <div className="sales-input-actions">
                                        <div className="sales-input-divider"></div>
                                        <i className="fa-solid fa-xmark sales-input-clear" onClick={() => setMobile('')}></i>
                                    </div>
                                </div>
                                
                            </div>
                            
                            {/* Secondary Buttons Row */}
                            <div className="sales-secondary-buttons">
                                <button className="sales-secondary-btn">Financial Details</button>
                                <button className="sales-secondary-btn">More Details</button>
                            </div>
                        </div>

                        {/* Flat, wide, teal Save button */}
                        <button className="sales-modal-add-btn" onClick={() => setIsAddModalOpen(false)}>
                            Save
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
