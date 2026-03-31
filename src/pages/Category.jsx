import React, { useState } from 'react';
import '../styles/Category.css';

function Category({ setActiveTab }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Form fields
    const [categoryName, setCategoryName] = useState('');
    const [parentCategory, setParentCategory] = useState('');

    const openModal = () => setIsAddModalOpen(true);
    const closeModal = () => setIsAddModalOpen(false);

    return (
        <div className="cat-desktop-wrapper">

            {/* Custom Category Header with Back Navigation */}
            <div className="cat-page-header">
                <button className="cat-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <h1 className="cat-page-title">Category</h1>
            </div>
            
            {/* Rounded square FAB button */}
            <button className="cat-fab-btn" onClick={openModal}>
                <i className="fa-solid fa-plus"></i>
            </button>

            {/* Main Add Category Modal Overlay */}
            {isAddModalOpen && (
                <div className="cat-modal-overlay" onClick={closeModal}>
                    {/* Prevent closing when clicking inside the card */}
                    <div className="cat-modal-card" onClick={e => e.stopPropagation()}>
                        
                        {/* Modal Header */}
                        <div className="cat-modal-header">
                            <h2 className="cat-modal-title">Add</h2>
                            <button className="cat-modal-close" onClick={closeModal}>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </button>
                        </div>
                        
                        <div className="cat-modal-body">
                            {/* The teal outer bounding box configured as a 2-column grid */}
                            <div className="cat-input-group">
                                
                                {/* 1. Category Name */}
                                <div className="cat-input-row">
                                    <i className="fa-solid fa-shapes cat-input-icon"></i>
                                    <input 
                                        type="text" 
                                        className="cat-input-field" 
                                        value={categoryName} 
                                        onChange={(e) => setCategoryName(e.target.value)} 
                                        placeholder="Category Name" 
                                    />
                                    <div className="cat-input-actions">
                                        <div className="cat-input-divider"></div>
                                        <i className="fa-solid fa-xmark cat-input-clear" onClick={() => setCategoryName('')}></i>
                                    </div>
                                </div>

                                {/* 2. Parent Category (No icon, No divider) */}
                                <div className="cat-input-row">
                                    <input 
                                        type="text" 
                                        className="cat-input-field" 
                                        value={parentCategory} 
                                        onChange={(e) => setParentCategory(e.target.value)} 
                                        placeholder="Parent Category" 
                                    />
                                    <div className="cat-input-actions">
                                        <i className="fa-solid fa-xmark cat-input-clear" onClick={() => setParentCategory('')}></i>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Flat, wide, teal Save button */}
                        <button className="cat-modal-add-btn" onClick={closeModal}>
                            Save
                        </button>
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;
