import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/welcome.css';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Today');

    const containerVariants = {
        hidden: { opacity: 0, filter: "blur(12px)", scale: 1.05 },
        visible: { 
            opacity: 1, 
            filter: "blur(0px)",
            scale: 1,
            transition: { 
                staggerChildren: 0.1, 
                delayChildren: 0.2,
                duration: 0.8,
                ease: "easeOut"
            } 
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.8, filter: "blur(8px)" },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 260, damping: 20 } 
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Decorative ambient background blur */}
            <motion.div 
                className="ambient-glow glow-1"
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <motion.div 
                className="ambient-glow glow-2"
                animate={{ 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                    x: [0, -60, 0],
                    y: [0, -40, 0]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            ></motion.div>

            {/* Side Menu Overlay for Mobile */}
            {isMobileMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

            {/* SIDEBAR */}
            <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-logo">
                    <motion.div 
                        className="logo-box"
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <i className="fa-solid fa-cube"></i>
                    </motion.div>
                    {!isCollapsed && (
                        <motion.h2
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >inpack</motion.h2>
                    )}
                    <button className="sidebar-toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <i className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {!isCollapsed && <div className="nav-label">Main Menu</div>}
                    <ul>
                        <li onClick={() => { navigate('/welcome'); setIsMobileMenuOpen(false); }}>
                            <i className="fa-solid fa-house"></i>
                            {!isCollapsed && <span>Home</span>}
                        </li>
                        <li className="active" onClick={() => setIsMobileMenuOpen(false)}>
                            <i className="fa-solid fa-chart-pie"></i>
                            {!isCollapsed && <span>Dashboard</span>}
                            <div className="active-indicator"></div>
                        </li>
                        <li onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                            <i className="fa-solid fa-user"></i>
                            {!isCollapsed && <span>Profile</span>}
                        </li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile" onClick={() => navigate('/profile')}>
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
                            <span>Today, Mar 20</span>
                        </div>
                        <div className="separator desktop-only"></div>
                        <button className="icon-btn notif-btn">
                            <i className="fa-regular fa-bell"></i>
                            <span className="badge">3</span>
                        </button>
                        <div className="topbar-user-chip" onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
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
                <motion.div 
                    className="dashboard-content dashboard-page"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >

                    {/* Header Row (Title & Filters) */}
                    <motion.div className="dash-header-row" variants={cardVariants}>
                        <h1 className="dash-title">Dashboard</h1>
                        <div className="dash-controls-wrapper">
                            <div className="dash-filters">
                                {['Today', 'This month', 'Year', 'Custom'].map(f => (
                                    <button
                                        key={f}
                                        className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(f)}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <div className="dash-toggles">
                                <button className="toggle-btn"><i className="fa-solid fa-chart-line"></i></button>
                                <button className="toggle-btn"><i className="fa-solid fa-chart-area"></i></button>
                                <button className="toggle-btn active"><i className="fa-solid fa-chart-bar"></i></button>
                                <button className="toggle-btn"><i className="fa-solid fa-chart-pie"></i></button>
                                <button className="toggle-btn"><i className="fa-solid fa-arrow-trend-up"></i></button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Split View for Desktop (Left 70% / Right 30%) */}
                    <div className="dashboard-main-split">

                        {/* LEFT COLUMN: Core Metrics & Big Charts */}
                        <div className="dash-left-col">
                            {/* Financial Overview */}
                            <section className="dash-section">
                                <motion.h2 className="dash-section-title" variants={cardVariants}>Financial Overview</motion.h2>
                                <div className="financial-grid">
                                    <motion.div 
                                        className="dash-card fin-card" 
                                        variants={cardVariants} 
                                        whileHover={{ 
                                            scale: 1.08, 
                                            y: -10, 
                                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                            rotate: 1
                                        }} 
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-file-invoice teal-text"></i>
                                                <span>Invoice</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <motion.div 
                                                className="trend-circle positive"
                                                whileHover={{ rotate: 45 }}
                                            ><i className="fa-solid fa-arrow-up-right"></i></motion.div>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="dash-card fin-card" 
                                        variants={cardVariants} 
                                        whileHover={{ 
                                            scale: 1.08, 
                                            y: -10, 
                                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                            rotate: -1
                                        }} 
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-cart-shopping teal-text"></i>
                                                <span>Purchase</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <motion.div 
                                                className="trend-circle positive"
                                                whileHover={{ rotate: 45 }}
                                            ><i className="fa-solid fa-arrow-up-right"></i></motion.div>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="dash-card fin-card" 
                                        variants={cardVariants} 
                                        whileHover={{ 
                                            scale: 1.08, 
                                            y: -10, 
                                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                            rotate: 1
                                        }} 
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-receipt teal-text"></i>
                                                <span>Receipt</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <motion.div 
                                                className="trend-circle positive"
                                                whileHover={{ rotate: 45 }}
                                            ><i className="fa-solid fa-arrow-up-right"></i></motion.div>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="dash-card fin-card" 
                                        variants={cardVariants} 
                                        whileHover={{ 
                                            scale: 1.08, 
                                            y: -10, 
                                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                                            rotate: -1
                                        }} 
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-money-check-dollar teal-text"></i>
                                                <span>Payment done</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <motion.div 
                                                className="trend-circle positive"
                                                whileHover={{ rotate: 45 }}
                                            ><i className="fa-solid fa-arrow-up-right"></i></motion.div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* Charts Row */}
                            <div className="charts-row">
                                <section className="dash-section">
                                    <motion.h2 className="dash-section-title" variants={cardVariants}>Periodic Profit Analysis</motion.h2>
                                    <motion.div className="dash-card chart-placeholder" variants={cardVariants}>
                                        <span>Profit Chart Space</span>
                                    </motion.div>
                                </section>
                                <section className="dash-section">
                                    <motion.h2 className="dash-section-title" variants={cardVariants}>Branch Wise Sales</motion.h2>
                                    <motion.div className="dash-card chart-placeholder" variants={cardVariants}>
                                        <span>Sales Chart Space</span>
                                    </motion.div>
                                </section>
                            </div>

                            {/* Purchase Overview (Stretches to fill remaining left column height) */}
                            <section className="dash-section">
                                <motion.h2 className="dash-section-title" variants={cardVariants}>Purchase Overview</motion.h2>
                                <motion.div className="dash-card chart-placeholder" variants={cardVariants}>
                                    <span>Overview Chart Space</span>
                                </motion.div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN: Secondary Metrics & Summary Boards */}
                        <div className="dash-right-col">
                            {/* Purchases */}
                            <section className="dash-section">
                                <motion.h2 className="dash-section-title" variants={cardVariants}>Purchases</motion.h2>
                                <motion.div className="dash-card purchase-card align-center" variants={cardVariants} whileHover={{ scale: 1.03, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.1)" }}>
                                    <div className="total-amount">₹ 0.00</div>
                                    <div className="purchase-split">
                                        <div className="split-item">
                                            <div className="split-label green-text">
                                                <i className="fa-solid fa-money-bill"></i> Cash
                                            </div>
                                            <div className="split-val green-text">₹ 0.00</div>
                                        </div>
                                        <div className="split-item">
                                            <div className="split-label purple-text">
                                                <i className="fa-solid fa-credit-card"></i> Credit
                                            </div>
                                            <div className="split-val purple-text">₹ 0.00</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </section>

                            {/* Services */}
                            <section className="dash-section">
                                <motion.h2 className="dash-section-title" variants={cardVariants}>Services</motion.h2>
                                <div className="services-grid-3">
                                    <motion.div className="dash-card small-stat" variants={cardVariants} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}>
                                        <div className="stat-label blue-text"><i className="fa-solid fa-arrow-down"></i> Received</div>
                                        <div className="stat-val-row">
                                            <span className="val">0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="dash-card small-stat" variants={cardVariants} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}>
                                        <div className="stat-label blue-text"><i className="fa-solid fa-arrow-down"></i> Completed</div>
                                        <div className="stat-val-row">
                                            <span className="val">0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="dash-card small-stat" variants={cardVariants} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}>
                                        <div className="stat-label blue-text"><i className="fa-solid fa-arrow-down"></i> Delivered</div>
                                        <div className="stat-val-row">
                                            <span className="val">0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>

                            {/* Accounts (Flexes to fill remaining right column) */}
                            <section className="dash-section">
                                <motion.h2 className="dash-section-title" variants={cardVariants}>Accounts</motion.h2>
                                <div className="accounts-grid-2x2">
                                    <motion.div className="dash-card small-stat" variants={cardVariants} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}>
                                        <div className="stat-label teal-text"><i className="fa-solid fa-arrow-down"></i> Receivables</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="dash-card small-stat" variants={cardVariants} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}>
                                        <div className="stat-label teal-text"><i className="fa-solid fa-circle-check"></i> Payables</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="dash-card small-stat" variants={cardVariants} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}>
                                        <div className="stat-label teal-text"><i className="fa-solid fa-money-bill"></i> Cash</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </motion.div>
                                    <motion.div className="dash-card small-stat" variants={cardVariants} whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}>
                                        <div className="stat-label teal-text"><i className="fa-solid fa-building-columns"></i> Bank</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </motion.div>
                                </div>
                            </section>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
