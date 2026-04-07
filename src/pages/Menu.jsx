import React from 'react';
import { motion } from 'framer-motion';
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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        },
        hover: {
            scale: 1.02,
            y: -4,
            boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    const iconVariants = {
        hover: { scale: 1.05 }
    };

    const arrowVariants = {
        hover: { x: 5 }
    };

    return (
        <motion.div
            className="menu-desktop-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="menu-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <h1>Master Configuration</h1>
                <p>Manage your core system entities, configurations, and organizational parameters.</p>
            </motion.div>

            <motion.div
                className="menu-desktop-grid"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {menuItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="menu-item-card"
                        onClick={() => setActiveTab && setActiveTab(item.name)}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="menu-icon-wrapper"
                            variants={iconVariants}
                        >
                            <i className={item.icon}></i>
                        </motion.div>
                        <div className="menu-item-info">
                            <h3 className="menu-item-title">{item.name}</h3>
                            <p className="menu-item-desc">{item.desc}</p>
                        </div>
                        <motion.div
                            className="menu-action-arrow"
                            variants={arrowVariants}
                        >
                            <i className="fa-solid fa-arrow-right"></i>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Menu;
