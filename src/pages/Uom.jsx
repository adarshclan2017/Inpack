import React, { useState } from 'react';
import '../styles/Uom.css';

export default function Uom({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [unitValue, setUnitValue] = useState('units');

    return (
        <div className="uom-desktop-wrapper">
            {/* Teal Header matching screenshot */}
            <div className="uom-header-bar">
                <button className="uom-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="uom-title">Unit</h1>
                <div style={{ width: '36px' }}></div>
            </div>


            {/* Rounded square FAB button */}
            <button className="uom-fab-btn" onClick={() => setIsAddModalOpen(true)}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Add Modal overlay corresponding to exactly what was shown in the new screenshot! */}
            {isAddModalOpen && (
                <div className="uom-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    {/* Stop propagation so clicking the card itself doesn't close the modal */}
                    <div className="uom-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="uom-modal-header">
                            <h2 className="uom-modal-title">Add</h2>
                            <button className="uom-modal-close" onClick={() => setIsAddModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="uom-modal-body">
                            {/* Input container exactly matching Pill format, icon, divider, close 'X' */}
                            <div className="uom-input-wrapper">
                                <i className="fa-solid fa-ruler-combined uom-input-icon"></i>
                                <input 
                                    type="text" 
                                    className="uom-input-field" 
                                    value={unitValue}
                                    onChange={(e) => setUnitValue(e.target.value)}
                                    placeholder="units"
                                />
                                <div className="uom-input-actions">
                                    <div className="uom-input-divider"></div>
                                    <i className="fa-solid fa-xmark uom-input-clear" onClick={() => setUnitValue('')}></i>
                                </div>
                            </div>
                        </div>

                        {/* Flat, wide, teal Save button below the input block */}
                        <button className="uom-modal-save-btn" onClick={() => setIsAddModalOpen(false)}>
                            Save
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}
