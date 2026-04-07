import React, { useState } from 'react';
import '../styles/AdddProduct.css';

function AdddProduct({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [shortName, setShortName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [hsn, setHsn] = useState('');
    const [batchType, setBatchType] = useState('none'); /* none | single | multiple */
    const [activeTool, setActiveTool] = useState(null);

    // Tax Info Modal States
    const [isTaxInfoModalOpen, setIsTaxInfoModalOpen] = useState(false);
    const [unit, setUnit] = useState('');
    const [inclusiveTax, setInclusiveTax] = useState(false);
    const [inwardGst, setInwardGst] = useState('');
    const [outwardGst, setOutwardGst] = useState('');
    const [cess, setCess] = useState('');
    const [addCess, setAddCess] = useState('');

    // Levels Modal States
    const [isLevelsModalOpen, setIsLevelsModalOpen] = useState(false);
    const [levelCategoryName, setLevelCategoryName] = useState('');
    const [levelParentCategory, setLevelParentCategory] = useState('');

    // Settings (More Info / Gear) Modal States
    const [isMoreInfoModalOpen, setIsMoreInfoModalOpen] = useState(false);
    const [bypassMinPrice, setBypassMinPrice] = useState(true);
    const [bypassMaxStock, setBypassMaxStock] = useState(false);
    const [activate, setActivate] = useState(true);
    const [productType, setProductType] = useState('rawMaterial');
    const [printRemarks, setPrintRemarks] = useState('');
    const [remarks, setRemarks] = useState('');

    // More Info Detail (Tag icon) Modal States
    const [isMoreInfoDetailOpen, setIsMoreInfoDetailOpen] = useState(false);
    const [plu, setPlu] = useState('');
    const [weighable, setWeighable] = useState(false);
    const [warranty, setWarranty] = useState('');
    const [rack, setRack] = useState('');

    const openModal = () => setIsAddModalOpen(true);
    const closeModal = () => setIsAddModalOpen(false);

    return (
        <div className="prod-desktop-wrapper">

            {/* ── Page Header ── */}
            <div className="prod-page-header">
                <button className="prod-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="prod-page-header-text">
                    <h1 className="prod-page-title">Add Product</h1>
                    <p className="prod-page-subtitle">Manage and create your product catalogue</p>
                </div>
            </div>

            {/* FAB explicitly requested by the user */}
            <button className="prod-fab-btn" onClick={openModal}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {isAddModalOpen && (
                <div className="prod-modal-overlay" onClick={closeModal}>
                    <div className="prod-modal-card" onClick={e => e.stopPropagation()}>
                        
                        {/* Standard Modal Header converts mobile logic to robust desktop popup */}
                        <div className="prod-modal-header">
                            <h2 className="prod-modal-title">Add Product</h2>
                            <button className="prod-modal-close" onClick={closeModal}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        <div className="prod-modal-body">
                            
                            {/* The main input form bounding box aligned into 2 desktop columns */}
                            <div className="prod-form-group">
                        
                        {/* 1. Product Id */}
                        <div className="prod-input-row">
                            <span className="prod-input-icon prod-sub-text">123</span>
                            <input 
                                type="text" 
                                className="prod-input-field" 
                                value={productId} 
                                onChange={(e) => setProductId(e.target.value)} 
                                placeholder="Product Id" 
                            />
                        </div>

                        {/* 2. Product Name */}
                        <div className="prod-input-row">
                            <div className="prod-input-icon" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                                T<span style={{ fontSize: '11px', marginLeft: '1px', marginBottom: '2px' }}>T</span>
                            </div>
                            <input 
                                type="text" 
                                className="prod-input-field" 
                                value={productName} 
                                onChange={(e) => setProductName(e.target.value)} 
                                placeholder="Product Name" 
                            />
                        </div>

                        {/* 3. Short Name */}
                        <div className="prod-input-row">
                            <div className="prod-input-icon" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                                T<span style={{ fontSize: '11px', marginLeft: '1px', marginBottom: '2px' }}>T</span>
                            </div>
                            <input 
                                type="text" 
                                className="prod-input-field" 
                                value={shortName} 
                                onChange={(e) => setShortName(e.target.value)} 
                                placeholder="Short Name" 
                            />
                        </div>

                        {/* 4. Category */}
                        <div className="prod-input-row">
                            <i className="fa-solid fa-shapes prod-input-icon"></i>
                            <input 
                                type="text" 
                                className="prod-input-field" 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)} 
                                placeholder="Category" 
                            />
                            <div className="prod-input-actions">
                                <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setCategory('')}></i>
                                <div className="prod-input-divider"></div>
                                <i className="fa-solid fa-plus prod-input-action-icon"></i>
                            </div>
                        </div>

                        {/* 5. Brand */}
                        <div className="prod-input-row">
                            <i className="fa-solid fa-box prod-input-icon"></i>
                            <input 
                                type="text" 
                                className="prod-input-field" 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)} 
                                placeholder="Brand" 
                            />
                        </div>

                        {/* 6. HSN */}
                        <div className="prod-input-row">
                            <span className="prod-input-icon prod-sub-text" style={{ fontSize: '16px' }}>H</span>
                            <input 
                                type="text" 
                                className="prod-input-field" 
                                value={hsn} 
                                onChange={(e) => setHsn(e.target.value)} 
                                placeholder="HSN" 
                            />
                            <div className="prod-input-actions">
                                <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setHsn('')}></i>
                                <div className="prod-input-divider"></div>
                                <i className="fa-solid fa-plus prod-input-action-icon"></i>
                            </div>
                        </div>

                    </div>

                    {/* Batch Selection Radio Buttons grouped horizontally */}
                    <div className="prod-batch-container">
                        <div className={`prod-batch-card ${batchType === 'none' ? 'active' : ''}`} onClick={() => setBatchType('none')}>
                            <i className={batchType === 'none' ? "fa-solid fa-circle-check prod-batch-indicator" : "fa-regular fa-circle prod-batch-indicator"}></i>
                            <i className="fa-solid fa-xmark prod-batch-icon" style={{ border: '2px solid', borderRadius: '4px', padding: '2px 4px', fontSize: '16px' }}></i>
                            <span className="prod-batch-text">No batch</span>
                        </div>
                        <div className={`prod-batch-card ${batchType === 'single' ? 'active' : ''}`} onClick={() => setBatchType('single')}>
                            <i className={batchType === 'single' ? "fa-solid fa-circle-check prod-batch-indicator" : "fa-regular fa-circle prod-batch-indicator"}></i>
                            <i className="fa-solid fa-1 prod-batch-icon" style={{ border: '2px solid', borderRadius: '4px', padding: '2px 6px', fontSize: '16px' }}></i>
                            <span className="prod-batch-text">Single Batch</span>
                        </div>
                        <div className={`prod-batch-card ${batchType === 'multiple' ? 'active' : ''}`} onClick={() => setBatchType('multiple')}>
                            <i className={batchType === 'multiple' ? "fa-solid fa-circle-check prod-batch-indicator" : "fa-regular fa-circle prod-batch-indicator"}></i>
                            <i className="fa-solid fa-plus prod-batch-icon" style={{ border: '2px solid', borderRadius: '4px', padding: '2px 4px', fontSize: '16px' }}></i>
                            <span className="prod-batch-text">Multiple Batch</span>
                        </div>
                    </div>

                    {/* Highly stylized Bottom Navigation Action Bar */}
                    <div className="prod-action-bar">
                        <div className="prod-action-item" onClick={() => setActiveTool('cancel')}>
                            <i className="fa-solid fa-xmark" style={{ fontSize: '24px', marginRight: '6px' }}></i>
                        </div>
                        <div className={`prod-action-item ${activeTool === 'tax1' ? 'active' : ''}`} onClick={() => { setActiveTool('tax1'); setIsTaxInfoModalOpen(true); }}>
                            <span>Tax Info</span>
                            <i className="fa-solid fa-receipt"></i>
                        </div>
                        <div className={`prod-action-item ${activeTool === 'levels' ? 'active' : ''}`} onClick={() => { setActiveTool('levels'); setIsLevelsModalOpen(true); }}>
                            <span>Levels</span>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                        <div className={`prod-action-item ${activeTool === 'Taxinfo' ? 'active' : ''}`} onClick={() => { setActiveTool('Taxinfo'); setIsMoreInfoDetailOpen(true); }}>
                            <span>More Info</span>
                            <i className="fa-solid fa-tag"></i>
                        </div>
                        <div className={`prod-action-item ${activeTool === 'Moreinfo' ? 'active' : ''}`} onClick={() => { setActiveTool('Moreinfo'); setIsMoreInfoModalOpen(true); }}>
                            <span>Settings</span>
                            <i className="fa-solid fa-gear"></i>
                        </div>
                    </div>

                    {/* Final Primary Action */}
                    <button className="prod-save-btn" onClick={closeModal}>
                        Save
                    </button>

                        </div>
                    </div>
                </div>
            )}

            {/* Nested Tax Info Modal Overlay mapped identically to SaaS 2-col requirements */}
            {isTaxInfoModalOpen && (
                <div className="prod-modal-overlay" style={{ zIndex: 1100 }} onClick={() => setIsTaxInfoModalOpen(false)}>
                    <div className="prod-nested-modal-card" onClick={e => e.stopPropagation()}>
                        
                        <div className="prod-modal-header">
                            <h2 className="prod-modal-title">Tax Info</h2>
                            <button className="prod-modal-close" onClick={() => setIsTaxInfoModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        <div className="prod-modal-body">
                            <div className="prod-form-group">
                                
                                {/* 1. Unit */}
                                <div className="prod-input-row">
                                    <i className="fa-solid fa-weight-scale prod-input-icon"></i>
                                    <input type="text" className="prod-input-field" value={unit} onChange={e => setUnit(e.target.value)} placeholder="Unit" />
                                    <div className="prod-input-actions">
                                        <div className="prod-input-divider"></div>
                                        <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setUnit('')}></i>
                                    </div>
                                </div>

                                {/* 2. Inclusive Tax (Radio Toggle aligned sequentially inside the grid flow) */}
                                <div className={`prod-radio-group ${inclusiveTax ? 'active' : ''}`} onClick={() => setInclusiveTax(!inclusiveTax)}>
                                    <div className="prod-radio-circle">
                                        <div className="prod-radio-inner"></div>
                                    </div>
                                    <span className="prod-radio-label">Inclusive Tax</span>
                                </div>

                                {/* 3. Inward GST */}
                                <div className="prod-input-row">
                                    <i className="fa-solid fa-compress-arrows-alt prod-input-icon"></i>
                                    <input type="text" className="prod-input-field" value={inwardGst} onChange={e => setInwardGst(e.target.value)} placeholder="Inward GST" />
                                    <div className="prod-input-actions">
                                        <div className="prod-input-divider"></div>
                                        <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setInwardGst('')}></i>
                                    </div>
                                </div>

                                {/* 4. Outward GST */}
                                <div className="prod-input-row">
                                    <i className="fa-solid fa-expand-arrows-alt prod-input-icon"></i>
                                    <input type="text" className="prod-input-field" value={outwardGst} onChange={e => setOutwardGst(e.target.value)} placeholder="Outward GST" />
                                    <div className="prod-input-actions">
                                        <div className="prod-input-divider"></div>
                                        <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setOutwardGst('')}></i>
                                    </div>
                                </div>

                                {/* 5. Cess */}
                                <div className="prod-input-row">
                                    <i className="fa-solid fa-database prod-input-icon"></i>
                                    <input type="text" className="prod-input-field" value={cess} onChange={e => setCess(e.target.value)} placeholder="Cess" />
                                    <div className="prod-input-actions">
                                        <div className="prod-input-divider"></div>
                                        <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setCess('')}></i>
                                    </div>
                                </div>

                                {/* 6. Add Cess */}
                                <div className="prod-input-row">
                                    <i className="fa-solid fa-database prod-input-icon"></i>
                                    <input type="text" className="prod-input-field" value={addCess} onChange={e => setAddCess(e.target.value)} placeholder="Add Cess" />
                                    <div className="prod-input-actions">
                                        <div className="prod-input-divider"></div>
                                        <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setAddCess('')}></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button className="prod-save-btn" onClick={() => setIsTaxInfoModalOpen(false)}>
                            Save
                        </button>

                    </div>
                </div>
            )}

            {/* Nested Levels Modal Overlay replicating the Category UI exactly */}
            {isLevelsModalOpen && (
                <div className="prod-modal-overlay" style={{ zIndex: 1100 }} onClick={() => setIsLevelsModalOpen(false)}>
                    <div className="prod-nested-modal-card" style={{ maxWidth: '500px' }} onClick={e => e.stopPropagation()}>
                        
                        <div className="prod-modal-header">
                            <h2 className="prod-modal-title">Add</h2>
                            <button className="prod-modal-close" onClick={() => setIsLevelsModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        <div className="prod-modal-body">
                            <div className="prod-form-group" style={{ gridTemplateColumns: '1fr' }}>
                                
                                {/* 1. Category Name */}
                                <div className="prod-input-row" style={{ paddingRight: '48px' }}>
                                    <i className="fa-solid fa-shapes prod-input-icon"></i>
                                    <input 
                                        type="text" 
                                        className="prod-input-field" 
                                        value={levelCategoryName} 
                                        onChange={(e) => setLevelCategoryName(e.target.value)} 
                                        placeholder="Category Name" 
                                    />
                                    <div className="prod-input-actions">
                                        <div className="prod-input-divider"></div>
                                        <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setLevelCategoryName('')}></i>
                                    </div>
                                </div>

                                {/* 2. Parent Category */}
                                <div className="prod-input-row" style={{ paddingRight: '48px' }}>
                                    <input 
                                        type="text" 
                                        className="prod-input-field" 
                                        value={levelParentCategory} 
                                        onChange={(e) => setLevelParentCategory(e.target.value)} 
                                        placeholder="Parent Category" 
                                    />
                                    <div className="prod-input-actions">
                                        <i className="fa-solid fa-xmark prod-input-action-icon" onClick={() => setLevelParentCategory('')}></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <button className="prod-save-btn" onClick={() => setIsLevelsModalOpen(false)}>
                            Save
                        </button>

                    </div>
                </div>
            )}

            {/* Settings Modal — Desktop optimised */}
            {isMoreInfoModalOpen && (
                <div className="prod-modal-overlay" style={{ zIndex: 1100 }} onClick={() => setIsMoreInfoModalOpen(false)}>
                    <div className="prod-nested-modal-card settings-desktop-card" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="prod-modal-header">
                            <div className="settings-header-left">
                                <div className="settings-header-icon">
                                    <i className="fa-solid fa-gear"></i>
                                </div>
                                <div>
                                    <h2 className="prod-modal-title" style={{ marginBottom: '2px' }}>Settings</h2>
                                    <p className="settings-header-sub">Configure product behaviour &amp; type</p>
                                </div>
                            </div>
                            <button className="prod-modal-close" onClick={() => setIsMoreInfoModalOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        <div className="prod-modal-body">

                            {/* ── 2-column section grid ── */}
                            <div className="settings-section-grid">

                                {/* Left column: Options */}
                                <div className="settings-section-card">
                                    <p className="settings-section-label">
                                        <i className="fa-solid fa-sliders"></i> Options
                                    </p>
                                    <div className="settings-pill-row">
                                        <span className="settings-pill-text">Bypass Minimum Price</span>
                                        <div
                                            className={`settings-pill-switch ${bypassMinPrice ? 'on' : 'off'}`}
                                            onClick={() => setBypassMinPrice(!bypassMinPrice)}
                                        >
                                            <div className="settings-pill-thumb"></div>
                                        </div>
                                    </div>
                                    <div className="settings-pill-row">
                                        <span className="settings-pill-text">Bypass Maximum Stock</span>
                                        <div
                                            className={`settings-pill-switch ${bypassMaxStock ? 'on' : 'off'}`}
                                            onClick={() => setBypassMaxStock(!bypassMaxStock)}
                                        >
                                            <div className="settings-pill-thumb"></div>
                                        </div>
                                    </div>
                                    <div className="settings-pill-row" style={{ borderBottom: 'none' }}>
                                        <span className="settings-pill-text">Activate</span>
                                        <div
                                            className={`settings-pill-switch ${activate ? 'on' : 'off'}`}
                                            onClick={() => setActivate(!activate)}
                                        >
                                            <div className="settings-pill-thumb"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right column: Product Type */}
                                <div className="settings-section-card">
                                    <p className="settings-section-label">
                                        <i className="fa-solid fa-tag"></i> Product Type
                                    </p>
                                    {[
                                        { value: 'product',     label: 'Product',      icon: 'fa-box' },
                                        { value: 'rawMaterial', label: 'Raw Material', icon: 'fa-layer-group' },
                                        { value: 'service',     label: 'Service',      icon: 'fa-wrench' },
                                    ].map(({ value, label, icon }) => (
                                        <div
                                            key={value}
                                            className={`settings-type-row ${productType === value ? 'active' : ''}`}
                                            onClick={() => setProductType(value)}
                                        >
                                            <div className={`settings-type-dot ${productType === value ? 'on' : 'off'}`}></div>
                                            <i className={`fa-solid ${icon} settings-type-icon`}></i>
                                            <span className="settings-pill-text">{label}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* ── Remarks row (full-width) ── */}
                            <div className="settings-remarks-grid">
                                <div className="prod-input-row">
                                    <i className="fa-solid fa-pen prod-input-icon"></i>
                                    <input
                                        type="text"
                                        className="prod-input-field"
                                        value={printRemarks}
                                        onChange={(e) => setPrintRemarks(e.target.value)}
                                        placeholder="Print Remarks"
                                    />
                                </div>
                                <div className="prod-input-row">
                                    <i className="fa-solid fa-pen prod-input-icon"></i>
                                    <input
                                        type="text"
                                        className="prod-input-field"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        placeholder="Remarks"
                                    />
                                </div>
                            </div>

                        </div>

                        <button className="prod-save-btn" onClick={() => setIsMoreInfoModalOpen(false)}>
                            Save
                        </button>

                    </div>
                </div>
            )}

            {/* More Info Detail Modal — PLU, Weighable, Warranty, Rack */}
            {isMoreInfoDetailOpen && (
                <div className="prod-modal-overlay" style={{ zIndex: 1100 }} onClick={() => setIsMoreInfoDetailOpen(false)}>
                    <div className="prod-nested-modal-card" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>

                        <div className="prod-modal-header">
                            <h2 className="prod-modal-title">More Info</h2>
                            <button className="prod-modal-close" onClick={() => setIsMoreInfoDetailOpen(false)}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>

                        <div className="prod-modal-body">

                            {/* Single bordered card grouping all 4 items */}
                            <div className="settings-toggle-group">

                                {/* PLU input row */}
                                <div className="settings-info-input-row">
                                    <i className="fa-solid fa-pen settings-info-icon"></i>
                                    <input
                                        type="text"
                                        className="settings-info-input"
                                        value={plu}
                                        onChange={(e) => setPlu(e.target.value)}
                                        placeholder="PLU"
                                    />
                                </div>

                                {/* Weighable toggle row */}
                                <div className="settings-toggle-row" onClick={() => setWeighable(!weighable)}>
                                    <div className={`settings-toggle-dot ${weighable ? 'on' : 'off'}`}></div>
                                    <span className="settings-toggle-label">Weighable</span>
                                </div>

                                {/* Warranty input row */}
                                <div className="settings-info-input-row">
                                    <i className="fa-regular fa-circle-check settings-info-icon"></i>
                                    <input
                                        type="text"
                                        className="settings-info-input"
                                        value={warranty}
                                        onChange={(e) => setWarranty(e.target.value)}
                                        placeholder="Warranty"
                                    />
                                </div>

                                {/* Rack input row */}
                                <div className="settings-info-input-row" style={{ borderBottom: 'none' }}>
                                    <i className="fa-solid fa-server settings-info-icon"></i>
                                    <input
                                        type="text"
                                        className="settings-info-input"
                                        value={rack}
                                        onChange={(e) => setRack(e.target.value)}
                                        placeholder="Rack"
                                    />
                                </div>

                            </div>

                        </div>

                        <button className="prod-save-btn" onClick={() => setIsMoreInfoDetailOpen(false)}>
                            Save
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default AdddProduct;
