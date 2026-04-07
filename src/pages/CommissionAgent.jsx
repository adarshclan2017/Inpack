import React, { useState } from 'react';
import '../styles/CommissionAgent.css';

export default function CommissionAgent({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form states mapped directly from screenshot
    const [agentId, setAgentId] = useState('');
    const [name, setName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [state, setState] = useState('');
    const [mobile, setMobile] = useState('');

    return (
        <div className="comm-desktop-wrapper">
            {/* Teal Header matching screenshot */}
            <div className="comm-header-bar">
                <button className="comm-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="comm-title">Commission Agent</h1>
                <div style={{ width: '36px' }}></div>
            </div>

            {/* Rounded square FAB button */}
            <button className="comm-fab-btn" onClick={() => setIsAddModalOpen(true)}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Add Modal overlay */}
            {isAddModalOpen && (
                <div className="comm-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    {/* Block click propagation */}
                    <div className="comm-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="comm-modal-header">
                            <h2 className="comm-modal-title">Add Agent</h2>
                            <button className="comm-modal-close" onClick={() => setIsAddModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="comm-modal-body">
                            {/* Bounding box formatted natively as a 2-column desktop grid for the 6 inputs */}
                            <div className="comm-form-group">
                                
                                {/* 1. Agent ID */}
                                <div className="comm-input-row">
                                    <span className="comm-input-icon comm-sub-text">123</span>
                                    <input type="text" className="comm-input-field" value={agentId} onChange={(e) => setAgentId(e.target.value)} placeholder="Agent ID" />
                                    <div className="comm-input-actions">
                                        <div className="comm-input-divider"></div>
                                        <i className="fa-solid fa-xmark comm-input-clear" onClick={() => setAgentId('')}></i>
                                    </div>
                                </div>

                                {/* 2. Agent Name */}
                                <div className="comm-input-row">
                                    <i className="fa-regular fa-user comm-input-icon"></i>
                                    <input type="text" className="comm-input-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Agent Name" />
                                    <div className="comm-input-actions">
                                        <div className="comm-input-divider"></div>
                                        <i className="fa-solid fa-xmark comm-input-clear" onClick={() => setName('')}></i>
                                    </div>
                                </div>

                                {/* 3. Address 1 */}
                                <div className="comm-input-row">
                                    <i className="fa-solid fa-location-dot comm-input-icon"></i>
                                    <input type="text" className="comm-input-field" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="Address 1" />
                                    <div className="comm-input-actions">
                                        <div className="comm-input-divider"></div>
                                        <i className="fa-solid fa-xmark comm-input-clear" onClick={() => setAddress1('')}></i>
                                    </div>
                                </div>

                                {/* 4. Address 2 */}
                                <div className="comm-input-row">
                                    <i className="fa-solid fa-location-dot comm-input-icon"></i>
                                    <input type="text" className="comm-input-field" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address 2" />
                                    <div className="comm-input-actions">
                                        <div className="comm-input-divider"></div>
                                        <i className="fa-solid fa-xmark comm-input-clear" onClick={() => setAddress2('')}></i>
                                    </div>
                                </div>

                                {/* 5. State */}
                                <div className="comm-input-row">
                                    <i className="fa-solid fa-map comm-input-icon"></i>
                                    <input type="text" className="comm-input-field" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                                    <div className="comm-input-actions">
                                        <div className="comm-input-divider"></div>
                                        <i className="fa-solid fa-xmark comm-input-clear" onClick={() => setState('')}></i>
                                    </div>
                                </div>

                                {/* 6. Mobile */}
                                <div className="comm-input-row">
                                    <i className="fa-solid fa-phone comm-input-icon"></i>
                                    <input type="text" className="comm-input-field" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
                                    <div className="comm-input-actions">
                                        <div className="comm-input-divider"></div>
                                        <i className="fa-solid fa-xmark comm-input-clear" onClick={() => setMobile('')}></i>
                                    </div>
                                </div>
                                
                            </div>
                            
                            {/* Secondary Buttons Row */}
                            <div className="comm-secondary-buttons">
                                <button className="comm-secondary-btn">Financial Details</button>
                                <button className="comm-secondary-btn">More Details</button>
                            </div>
                        </div>

                        {/* Flat, wide, teal Save button */}
                        <button className="comm-modal-add-btn" onClick={() => setIsAddModalOpen(false)}>
                            Save
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
