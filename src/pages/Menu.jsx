import React from 'react';
import '../styles/Menu.css';

const Menu = ({ setActiveTab }) => {
    // Rich descriptions added to take advantage of the expanded Desktop card layout
    const menuItems = [
        { name: 'UOM', icon: 'fa-solid fa-ruler-combined', desc: 'Manage standard units of measure and conversions.' },
        { name: 'HSN / SAC', icon: 'fa-solid fa-tags', desc: 'Configure universal tax accounting codes.' },
        { name: 'Suppliers', icon: 'fa-solid fa-truck-field', desc: 'Centralized directory for vendor accounts.' },
        { name: 'Salesman', icon: 'fa-solid fa-user-tie', desc: 'Sales team performance and personnel profiles.' },
        { name: 'Commission Agent', icon: 'fa-solid fa-handshake', desc: 'Broker ledgers and tier management.' },
        { name: 'Location', icon: 'fa-solid fa-location-dot', desc: 'Branch and warehouse geospatial tracking.' },
        { name: 'Service Engineer', icon: 'fa-solid fa-user-gear', desc: 'Assign and track technical personnel.' },
        { name: 'Customers', icon: 'fa-solid fa-users', desc: 'Master client database and CRM features.' },
        { name: 'Category', icon: 'fa-solid fa-layer-group', desc: 'Product classification and structuring.' },
        { name: 'Add Product', icon: 'fa-solid fa-box-open', desc: 'Inventory induction and item editing.' },
        { name: 'Purchase', icon: 'fa-solid fa-bag-shopping', desc: 'Inbound orders and supply chain.' },
        { name: 'Report Screen', icon: 'fa-solid fa-chart-pie', desc: 'Comprehensive analytics and data exports.' }
    ];

    return (
        <div className="menu-desktop-container">
            <div className="menu-header">
                <h1>Master Configuration</h1>
                <p>Manage your core system entities, configurations, and organizational parameters.</p>
            </div>

            <div className="menu-desktop-grid">
                {menuItems.map((item, index) => (
                    <div key={index} className="menu-item-card" onClick={() => setActiveTab && setActiveTab(item.name)}>
                        <div className="menu-icon-wrapper">
                            <i className={item.icon}></i>
                        </div>
                        <div className="menu-item-info">
                            <h3 className="menu-item-title">{item.name}</h3>
                            <p className="menu-item-desc">{item.desc}</p>
                        </div>
                        <div className="menu-action-arrow">
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
