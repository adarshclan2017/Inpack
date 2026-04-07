import React, { useState } from 'react';
import '../styles/Location.css';

export default function Location({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [modalPage, setModalPage] = useState('MAIN'); // 'MAIN' or 'MORE'

    // Form states
    const [locationId, setLocationId] = useState('');
    const [name, setName] = useState('');
    
    // More fields
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [mobile, setMobile] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [email, setEmail] = useState('');
    const [remarks, setRemarks] = useState('');

    const openModal = () => {
        setIsAddModalOpen(true);
        setModalPage('MAIN');
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="loc-desktop-wrapper">
            {/* Teal Header matching screenshot */}
            <div className="loc-header-bar">
                <button className="loc-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="loc-title">Location</h1>
                <div style={{ width: '36px' }}></div>
            </div>

            {/* Rounded square FAB button */}
            <button className="loc-fab-btn" onClick={openModal}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Add Modal overlay */}
            {isAddModalOpen && (
                <div className="loc-modal-overlay" onClick={closeModal}>
                    {/* Block click propagation */}
                    <div className="loc-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="loc-modal-header">
                            <h2 className="loc-modal-title">
                                {modalPage === 'MORE' && (
                                    <button className="loc-modal-back" onClick={() => setModalPage('MAIN')} title="Back to main">
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </button>
                                )}
                                {modalPage === 'MAIN' ? 'Add Location' : 'More'}
                            </h2>
                            <button className="loc-modal-close" onClick={closeModal}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="loc-modal-body">
                            
                            {modalPage === 'MAIN' ? (
                                <>
                                    {/* MAIN PAGE fields */}
                                    <div className="loc-form-group">
                                        <div className="loc-input-row">
                                            <span className="loc-input-icon loc-sub-text">123</span>
                                            <input type="text" className="loc-input-field" value={locationId} onChange={(e) => setLocationId(e.target.value)} placeholder="Location ID" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setLocationId('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-regular fa-user loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Location Name" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setName('')}></i>
                                            </div>
                                        </div>
                                    </div>

                                    {/* More Button */}
                                    <div className="loc-more-row">
                                        <button className="loc-more-btn" onClick={() => setModalPage('MORE')}>
                                            <i className="fa-solid fa-angles-right"></i> More
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* MORE PAGE fields inside their own bounding box */}
                                    <div className="loc-form-group">
                                        
                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-location-dot loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address 1" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setAddress1('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-location-dot loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address 2" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setAddress2('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-regular fa-building loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setCity('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-phone loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setMobile('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-map loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setState('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-globe loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setCountry('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-phone loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={phone1} onChange={(e) => setPhone1(e.target.value)} placeholder="Phone 1" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setPhone1('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-phone loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={phone2} onChange={(e) => setPhone2(e.target.value)} placeholder="Phone 2" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setPhone2('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-regular fa-envelope loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setEmail('')}></i>
                                            </div>
                                        </div>

                                        <div className="loc-input-row">
                                            <i className="fa-solid fa-pencil loc-input-icon"></i>
                                            <input type="text" className="loc-input-field" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" />
                                            <div className="loc-input-actions">
                                                <div className="loc-input-divider"></div>
                                                <i className="fa-solid fa-xmark loc-input-clear" onClick={() => setRemarks('')}></i>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>

                        {/* Flat, wide, teal Save button */}
                        <button className="loc-modal-add-btn" onClick={closeModal}>
                            Save
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
