import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/welcome.css';

export default function Welcome() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="admin-dashboard">
            {/* Decorative ambient background blur */}
            <div className="ambient-glow glow-1"></div>
            <div className="ambient-glow glow-2"></div>

            {/* Side Menu Overlay for Mobile */}
            {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

            {/* SIDEBAR */}
            <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-logo">
                    <div className="logo-box">
                        <i className="fa-solid fa-cube"></i>
                    </div>
                    {!isCollapsed && <h2>inpack</h2>}
                    <button className="sidebar-toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <i className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {!isCollapsed && <div className="nav-label">Main Menu</div>}
                    <ul>
                        <li className="active" onClick={() => setIsMobileMenuOpen(false)}>
                            <i className="fa-solid fa-house"></i>
                            {!isCollapsed && <span>Home</span>}
                            <div className="active-indicator"></div>
                        </li>
                        <li onClick={() => handleNavigation('/dashboard')} style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-chart-pie"></i>
                            {!isCollapsed && <span>Dashboard</span>}
                        </li>
                        <li onClick={() => handleNavigation('/profile')} style={{ cursor: 'pointer' }}>
                            <i className="fa-solid fa-user"></i>
                            {!isCollapsed && <span>Profile</span>}
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile" onClick={() => handleNavigation('/profile')} style={{ cursor: 'pointer' }}>
                        <div className="avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>

                        <i className="fa-solid fa-chevron-right chevron-icon"></i>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="admin-main">
                {/* TOP NAVBAR */}
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        <div className="search-bar">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Search invoices, customers, jobs..." />
                            <div className="search-shortcut">⌘K</div>
                        </div>
                    </div>
                    <div className="topbar-actions">
                        <div className="header-date desktop-only">
                            <i className="fa-regular fa-calendar-days"></i>
                            <span>Today, Mar 19</span>
                        </div>
                        <div className="separator desktop-only"></div>
                        <button className="icon-btn notif-btn">
                            <i className="fa-regular fa-bell"></i>
                            <span className="badge">3</span>
                        </button>
                        <div className="topbar-user-chip" onClick={() => handleNavigation('/profile')}>
                            <div className="topbar-avatar">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="topbar-user-info">
                                <span className="topbar-user-name">DEMO TVM</span>
                                <span className="topbar-user-role">Admin</span>
                            </div>
                            <i className="fa-solid fa-chevron-down topbar-caret"></i>
                        </div>
                    </div>
                </header>

                {/* DASHBOARD CONTENT */}
                <div className="dashboard-content">
                    <motion.div 
                        className="welcome-banner"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            <h1 className="gradient-text">Welcome back, DEMO TVM! 👋</h1>
                            <p>Here's what is happening with your business today.</p>
                        </div>
                    </motion.div>

                    {/* QUICK ACCESS GRID */}
                    <section className="dashboard-section">
                        <motion.div 
                            className="section-header"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="section-title">Quick Access</h2>
                            <button className="text-btn" onClick={() => setIsWidgetModalOpen(true)}>Manage Widgets</button>
                        </motion.div>

                        <motion.div 
                            className="quick-access-grid"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { 
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            {[ 
                                { path: '/invoice', icon: 'fa-file-invoice', color: 'blue', title: 'Invoice', desc: 'Create & manage' },
                                { path: '/cash', icon: 'fa-money-bill-wave', color: 'green', title: 'Cash', desc: 'Transactions' },
                                { path: '/bank', icon: 'fa-building-columns', color: 'purple', title: 'Bank', desc: 'Transfers & deposits' },
                                { path: '/job-entry', icon: 'fa-briefcase', color: 'orange', title: 'Job Entry', desc: 'Create new job' },
                                { path: '/job-done', icon: 'fa-circle-check', color: 'teal', title: 'Job done', desc: 'Completed jobs' },
                                { path: '/job-delivery', icon: 'fa-truck-fast', color: 'indigo', title: 'Job Delivery', desc: 'Dispatch details' }
                            ].map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className="action-card" 
                                    onClick={() => navigate(item.path)} 
                                    style={{ cursor: 'pointer' }}
                                    variants={{
                                        hidden: { y: 30, opacity: 0, scale: 0.9 },
                                        visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
                                    }}
                                    whileHover={{ scale: 1.05, y: -8, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.15)" }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <motion.div 
                                        className={`icon-wrapper ${item.color}`}
                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <i className={`fa-solid ${item.icon}`}></i>
                                    </motion.div>
                                    <div className="action-info">
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                    <motion.i 
                                        className="fa-solid fa-arrow-right action-arrow"
                                        whileHover={{ x: 5 }}
                                    ></motion.i>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>

                    <div className="dashboard-split">
                        {/* LARGE PROMO BANNER */}
                        <motion.div 
                            className="promo-banner-wide"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="promo-glass-effect"></div>
                            <div className="promo-info">
                                <span className="promo-badge">Special Offer</span>
                                <h2>Thermal Printers – Save Up to 50%!</h2>
                                <p>Get crisp, reliable prints without the ink hassle. Speed up your checkout process instantly.</p>
                                <button className="promo-btn">Enquire now <i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                            <div className="promo-graphics">
                                <motion.i 
                                    className="fa-solid fa-print promo-icon-bg"
                                    animate={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                ></motion.i>
                                <motion.div 
                                    className="floating-receipt"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                ></motion.div>
                            </div>
                        </motion.div>

                        {/* TOP SALES WIDGET */}
                        <motion.div 
                            className="top-sales-card"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <div className="card-header">
                                <h2 className="section-title">Top Sales Metrics</h2>
                                <i className="fa-solid fa-ellipsis-vertical more-icon"></i>
                            </div>

                            <motion.div 
                                className="sales-list"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.15, delayChildren: 0.6 }
                                    }
                                }}
                            >
                                {[
                                    { color: "light-blue", icon: "fa-chart-line", title: "Top Value", desc: "Highest revenue", amount: "$12,450", trend: "+12%", trendClass: "positive", trendIcon: "fa-arrow-trend-up", percent: "85%", fillClass: "blue-fill" },
                                    { color: "light-green", icon: "fa-cubes", title: "Top Volume", desc: "Most items sold", amount: "1,240 pkgs", trend: "+8%", trendClass: "positive", trendIcon: "fa-arrow-trend-up", percent: "65%", fillClass: "green-fill" },
                                    { color: "light-orange", icon: "fa-print", title: "Print", desc: "Direct sales", amount: "342 units", trend: "-2%", trendClass: "negative", trendIcon: "fa-arrow-trend-down", percent: "40%", fillClass: "orange-fill" }
                                ].map((item, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="sales-item"
                                        variants={{
                                            hidden: { x: 20, opacity: 0 },
                                            visible: { x: 0, opacity: 1 }
                                        }}
                                    >
                                        <div className="sales-header-row">
                                            <motion.div 
                                                className={`icon-box ${item.color}`}
                                                whileHover={{ rotate: 10, scale: 1.15 }}
                                            >
                                                <i className={`fa-solid ${item.icon}`}></i>
                                            </motion.div>
                                            <div className="sales-details">
                                                <h4>{item.title}</h4>
                                                <p>{item.desc}</p>
                                            </div>
                                            <div className="sales-stat">
                                                <span className="amount">{item.amount}</span>
                                                <div className={`sales-trend ${item.trendClass}`}>
                                                    <i className={`fa-solid ${item.trendIcon}`}></i> {item.trend}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="progress-bg">
                                            <motion.div 
                                                className={`progress-fill ${item.fillClass}`} 
                                                initial={{ width: 0 }}
                                                animate={{ width: item.percent }}
                                                transition={{ duration: 1.5, type: "spring", stiffness: 40, damping: 10, delay: 0.8 + (index * 0.2) }}
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* MANAGE WIDGETS MODAL */}
            {isWidgetModalOpen && (
                <div className="widget-modal-overlay" onClick={() => setIsWidgetModalOpen(false)}>
                    <div className="widget-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="widget-modal-header">
                            <h3>Manage Widgets</h3>
                            <button className="widget-modal-close" onClick={() => setIsWidgetModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="widget-modal-body">
                            <p className="widget-modal-desc">Customize your dashboard by toggling widgets on or off.</p>
                            
                            <div className="widget-toggle-list">
                                <div className="widget-toggle-item">
                                    <div className="widget-toggle-info">
                                        <div className="widget-icon primary-light"><i className="fa-solid fa-bolt"></i></div>
                                        <div>
                                            <h4>Quick Access Grid</h4>
                                            <span>Frequently used shortcuts</span>
                                        </div>
                                    </div>
                                    <label className="widget-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="widget-slider"></span>
                                    </label>
                                </div>
                                <div className="widget-toggle-item">
                                    <div className="widget-toggle-info">
                                        <div className="widget-icon success-light"><i className="fa-solid fa-bullhorn"></i></div>
                                        <div>
                                            <h4>Promo Banner</h4>
                                            <span>Latest offers & announcements</span>
                                        </div>
                                    </div>
                                    <label className="widget-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="widget-slider"></span>
                                    </label>
                                </div>
                                <div className="widget-toggle-item">
                                    <div className="widget-toggle-info">
                                        <div className="widget-icon info-light"><i className="fa-solid fa-chart-line"></i></div>
                                        <div>
                                            <h4>Top Sales Metrics</h4>
                                            <span>Performance data insights</span>
                                        </div>
                                    </div>
                                    <label className="widget-switch">
                                        <input type="checkbox" defaultChecked />
                                        <span className="widget-slider"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="widget-modal-footer">
                            <button className="widget-btn-cancel" onClick={() => setIsWidgetModalOpen(false)}>Cancel</button>
                            <button className="widget-btn-save" onClick={() => setIsWidgetModalOpen(false)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
