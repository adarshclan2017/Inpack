import React, { useState } from 'react';
import '../styles/Hsa.css';

export default function Hsa({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="hsa-desktop-wrapper">
            {/* Teal Header matching screenshot */}
            <div className="hsa-header-bar">
                <button className="hsa-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="hsa-title">HSN/SAC</h1>
                <div style={{ width: '36px' }}></div>
            </div>

            {/* Rounded square FAB button */}
            <button className="hsa-fab-btn" onClick={() => setIsAddModalOpen(true)}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Add Modal overlay corresponding to exactly what was shown in the screenshot! */}
            {isAddModalOpen && (
                <div className="hsa-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    {/* Stop propagation so clicking the card itself doesn't close the modal */}
                    <div className="hsa-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="hsa-modal-header">
                            <h2 className="hsa-modal-title">Add</h2>
                            <button className="hsa-modal-close" onClick={() => setIsAddModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="hsa-modal-body">
                            {/* Grouped Input matching the screenshot with a middle divider line */}
                            <div className="hsa-input-group">
                                {/* Top Row - Code */}
                                <div className="hsa-input-row">
                                    <span className="hsa-input-icon">H</span>
                                    <input 
                                        type="text" 
                                        className="hsa-input-field" 
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="HSN/SAC Code"
                                    />
                                    <div className="hsa-input-actions">
                                        <div className="hsa-input-divider"></div>
                                        <i className="fa-solid fa-xmark hsa-input-clear" onClick={() => setCode('')}></i>
                                    </div>
                                </div>
                                
                                {/* Bottom Row - Description */}
                                <div className="hsa-input-row">
                                    {/* Using empty span to keep vertical alignment visually perfect */}
                                    <span className="hsa-input-icon"></span>
                                    <input 
                                        type="text" 
                                        className="hsa-input-field" 
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Description"
                                    />
                                    <div className="hsa-input-actions">
                                        <div className="hsa-input-divider"></div>
                                        <i className="fa-solid fa-xmark hsa-input-clear" onClick={() => setDescription('')}></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flat, wide, teal Save button below the input block */}
                        <button className="hsa-modal-save-btn" onClick={() => setIsAddModalOpen(false)}>
                            Save
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
