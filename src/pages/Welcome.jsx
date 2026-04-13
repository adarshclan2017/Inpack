import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { extractJsonFromAsmx } from '../utils/asmx';
import '../styles/welcome.css';

export default function Welcome() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Retrieve required parameters from localStorage
                const branchId = localStorage.getItem("branchId") || "";
                const licenseKey = localStorage.getItem("licenseKey") || "";
                const imei = localStorage.getItem("imei") || "";
                const pin = localStorage.getItem("pin") || "";
                const internalUserId = localStorage.getItem("internalUserId") || "41";

                // Format current date as YYYY-MM-DD
                const today = new Date().toISOString().split('T')[0];

                // URL Construction (port 2025 matches /api2025 proxy)
                // Note: BranchIDs expects single quotes around the ID
                const branchParam = `'${branchId}'`;
                const url = `/api2025/InPackService.asmx/loadDashBoard?BranchIDs=${encodeURIComponent(branchParam)}&FromDate=${today}&ToDate=${today}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&InternalUserID=${internalUserId}`;

                const response = await fetch(url);
                const text = await response.text();
                const data = extractJsonFromAsmx(text);

                if (data?.data) {
                    const payload = data.data;
                    localStorage.setItem("branch_details", JSON.stringify(payload.branch_details || []));
                    localStorage.setItem("settings", JSON.stringify(payload.settings || []));
                    localStorage.setItem("states", JSON.stringify(payload.states || []));
                }
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    const branchName = localStorage.getItem("branchName") || "Demo Branch";
    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    const displayUserName = userObj.userName || localStorage.getItem("userName") || branchName;

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const sidebarVariants = {
        expanded: { width: "260px" },
        collapsed: { width: "80px" }
    };

    const cardContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const cardItemVariants = {
        hidden: { y: 20, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <div className="admin-dashboard">
            {/* Decorative ambient background blur */}
            <motion.div
                className="ambient-glow glow-1"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
                className="ambient-glow glow-2"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2],
                    x: [0, -40, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            {/* Side Menu Overlay for Mobile */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="sidebar-overlay"
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    ></motion.div>
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <motion.aside
                layout
                className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                initial={false}
                animate={isCollapsed ? "collapsed" : "expanded"}
                variants={sidebarVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="sidebar-logo">
                    <motion.div layout className="logo-box">
                        <i className="fa-solid fa-cube"></i>
                    </motion.div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.h2
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                inpack
                            </motion.h2>
                        )}
                    </AnimatePresence>
                    <button className="sidebar-toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <motion.i
                            layout
                            className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}
                        ></motion.i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {!isCollapsed && (
                        <motion.div
                            className="nav-label"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Main Menu
                        </motion.div>
                    )}
                    <ul>
                        <motion.li
                            layout
                            className="active"
                            onClick={() => setIsMobileMenuOpen(false)}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <i className="fa-solid fa-house"></i>
                            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Home</motion.span>}
                            <motion.div layoutId="active-nav" className="active-indicator"></motion.div>
                        </motion.li>
                        <motion.li
                            layout
                            onClick={() => handleNavigation('/dashboard')}
                            style={{ cursor: 'pointer' }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <i className="fa-solid fa-chart-pie"></i>
                            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Dashboard</motion.span>}
                        </motion.li>
                        <motion.li
                            layout
                            onClick={() => handleNavigation('/profile')}
                            style={{ cursor: 'pointer' }}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <i className="fa-solid fa-user"></i>
                            {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Profile</motion.span>}
                        </motion.li>
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <motion.div
                        layout
                        className="user-profile"
                        onClick={() => handleNavigation('/profile')}
                        style={{ cursor: 'pointer' }}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                        <div className="avatar">
                            <i className="fa-solid fa-user"></i>
                        </div>
                        {!isCollapsed && (
                            <motion.div
                                className="user-info"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <span className="user-name">{displayUserName}</span>
                                <span className="user-role">Branch: {branchName}</span>
                            </motion.div>
                        )}
                        <i className="fa-solid fa-chevron-right chevron-icon"></i>
                    </motion.div>
                </div>
            </motion.aside>

            {/* MAIN CONTENT */}
            <main className="admin-main">
                {/* TOP NAVBAR */}
                <header className="admin-topbar">
                    <div className="topbar-left">
                        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(true)}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        <motion.div
                            className="search-bar"
                            whileFocusWithin={{ scale: 1.02, boxShadow: "0 4px 20px -5px rgba(0,0,0,0.1)" }}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Search invoices, customers, jobs..." />
                            <div className="search-shortcut">⌘K</div>
                        </motion.div>
                    </div>
                    <div className="topbar-actions">
                        <div className="header-date desktop-only">
                            <i className="fa-regular fa-calendar-days"></i>
                            <span>Today, Mar 19</span>
                        </div>
                        <div className="separator desktop-only"></div>
                        <motion.button
                            className="icon-btn notif-btn"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <i className="fa-regular fa-bell"></i>
                            <span className="badge">3</span>
                        </motion.button>
                        <motion.div
                            className="topbar-user-chip"
                            onClick={() => handleNavigation('/profile')}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="topbar-avatar">
                                <i className="fa-solid fa-user"></i>
                            </div>
                            <div className="topbar-user-info">
                                <span className="topbar-user-name">{displayUserName}</span>
                                <span className="topbar-user-role">{branchName}</span>
                            </div>
                            <i className="fa-solid fa-chevron-down topbar-caret"></i>
                        </motion.div>
                    </div>
                </header>

                {/* DASHBOARD CONTENT */}
                <div className="dashboard-content">
                    <motion.div
                        className="welcome-banner"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        <div>
                            <motion.h1
                                className="gradient-text"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Welcome back, {displayUserName}! 👋
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Here's what is happening with your business today.
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* QUICK ACCESS GRID */}
                    <section className="dashboard-section">
                        <motion.div
                            className="section-header"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="section-title">Quick Access</h2>
                            <motion.button
                                className="text-btn"
                                onClick={() => setIsWidgetModalOpen(true)}
                                whileHover={{ scale: 1.05, x: 5 }}
                            >
                                Manage Widgets
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="quick-access-grid"
                            initial="hidden"
                            animate="visible"
                            variants={cardContainerVariants}
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
                                    variants={cardItemVariants}
                                    whileHover={{
                                        scale: 1.04,
                                        y: -10,
                                        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)",
                                        borderColor: "var(--primary-color)"
                                    }}
                                    whileTap={{ scale: 0.96 }}
                                >
                                    <motion.div
                                        className={`icon-wrapper ${item.color}`}
                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <i className={`fa-solid ${item.icon}`}></i>
                                    </motion.div>
                                    <div className="action-info">
                                        <h3>{item.title}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                    <motion.i
                                        className="fa-solid fa-arrow-right action-arrow"
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 8 }}
                                    ></motion.i>
                                </motion.div>
                            ))}
                        </motion.div>
                    </section>

                    <div className="dashboard-split">
                        {/* LARGE PROMO BANNER */}
                        <motion.div
                            className="promo-banner-wide"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 80 }}
                            whileHover={{ scale: 1.01 }}
                        >
                            <div className="promo-glass-effect"></div>
                            <div className="promo-info">
                                <motion.span
                                    className="promo-badge"
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Special Offer
                                </motion.span>
                                <h2>Thermal Printers – Save Up to 50%!</h2>
                                <p>Get crisp, reliable prints without the ink hassle. Speed up your checkout process instantly.</p>
                                <motion.button
                                    className="promo-btn"
                                    whileHover={{ scale: 1.05, gap: "12px" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Enquire now <i className="fa-solid fa-arrow-right"></i>
                                </motion.button>
                            </div>
                            <div className="promo-graphics">
                                <motion.i
                                    className="fa-solid fa-print promo-icon-bg"
                                    animate={{
                                        rotate: [0, -8, 8, 0],
                                        y: [0, -10, 10, 0]
                                    }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                ></motion.i>
                                <motion.div
                                    className="floating-receipt"
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [15, 10, 20, 15]
                                    }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                ></motion.div>
                            </div>
                        </motion.div>

                        {/* TOP SALES WIDGET */}
                        <motion.div
                            className="top-sales-card"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <div className="card-header">
                                <h2 className="section-title">Top Sales Metrics</h2>
                                <motion.i
                                    className="fa-solid fa-ellipsis-vertical more-icon"
                                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                                ></motion.i>
                            </div>

                            <motion.div
                                className="sales-list"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.15, delayChildren: 1.1 }
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
                                        whileHover={{ x: 5 }}
                                    >
                                        <div className="sales-header-row">
                                            <motion.div
                                                className={`icon-box ${item.color}`}
                                                whileHover={{ rotate: 15, scale: 1.1 }}
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
                                                transition={{ duration: 1.8, type: "spring", stiffness: 35, damping: 12, delay: 1.3 + (index * 0.2) }}
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
            <AnimatePresence>
                {isWidgetModalOpen && (
                    <motion.div
                        className="widget-modal-overlay"
                        onClick={() => setIsWidgetModalOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="widget-modal-content"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <div className="widget-modal-header">
                                <h3>Manage Widgets</h3>
                                <motion.button
                                    className="widget-modal-close"
                                    onClick={() => setIsWidgetModalOpen(false)}
                                    whileHover={{ rotate: 90, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <i className="fa-solid fa-xmark"></i>
                                </motion.button>
                            </div>
                            <div className="widget-modal-body">
                                <p className="widget-modal-desc">Customize your dashboard by toggling widgets on or off.</p>

                                <motion.div
                                    className="widget-toggle-list"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                                    }}
                                >
                                    {[
                                        { title: "Quick Access Grid", desc: "Frequently used shortcuts", icon: "fa-bolt", class: "primary-light" },
                                        { title: "Promo Banner", desc: "Latest offers & announcements", icon: "fa-bullhorn", class: "success-light" },
                                        { title: "Top Sales Metrics", desc: "Performance data insights", icon: "fa-chart-line", class: "info-light" }
                                    ].map((widget, i) => (
                                        <motion.div
                                            key={i}
                                            className="widget-toggle-item"
                                            variants={{
                                                hidden: { x: -20, opacity: 0 },
                                                visible: { x: 0, opacity: 1 }
                                            }}
                                        >
                                            <div className="widget-toggle-info">
                                                <div className={`widget-icon ${widget.class}`}><i className={`fa-solid ${widget.icon}`}></i></div>
                                                <div>
                                                    <h4>{widget.title}</h4>
                                                    <span>{widget.desc}</span>
                                                </div>
                                            </div>
                                            <label className="widget-switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="widget-slider"></span>
                                            </label>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                            <div className="widget-modal-footer">
                                <button className="widget-btn-cancel" onClick={() => setIsWidgetModalOpen(false)}>Cancel</button>
                                <motion.button
                                    className="widget-btn-save"
                                    onClick={() => setIsWidgetModalOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Save Changes
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
