import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
                    <div className="welcome-banner">
                        <div>
                            <h1 className="gradient-text">Welcome back, DEMO TVM! 👋</h1>
                            <p>Here's what is happening with your business today.</p>
                        </div>
                    </div>

                    {/* QUICK ACCESS GRID */}
                    <section className="dashboard-section">
                        <div className="section-header">
                            <h2 className="section-title">Quick Access</h2>
                            <button className="text-btn" onClick={() => setIsWidgetModalOpen(true)}>Manage Widgets</button>
                        </div>

                        <div className="quick-access-grid">
                            <div className="action-card" onClick={() => navigate('/invoice')} style={{ cursor: 'pointer' }}>
                                <div className="icon-wrapper blue">
                                    <i className="fa-solid fa-file-invoice"></i>
                                </div>
                                <div className="action-info">
                                    <h3>Invoice</h3>
                                    <p>Create & manage</p>
                                </div>
                                <i className="fa-solid fa-arrow-right action-arrow"></i>
                            </div>

                            <div className="action-card" onClick={() => navigate('/cash')} style={{ cursor: 'pointer' }}>
                                <div className="icon-wrapper green">
                                    <i className="fa-solid fa-money-bill-wave"></i>
                                </div>
                                <div className="action-info">
                                    <h3>Cash</h3>
                                    <p>Transactions</p>
                                </div>
                                <i className="fa-solid fa-arrow-right action-arrow"></i>
                            </div>

                            <div className="action-card" onClick={() => navigate('/bank')} style={{ cursor: 'pointer' }}>
                                <div className="icon-wrapper purple">
                                    <i className="fa-solid fa-building-columns"></i>
                                </div>
                                <div className="action-info">
                                    <h3>Bank</h3>
                                    <p>Transfers & deposits</p>
                                </div>
                                <i className="fa-solid fa-arrow-right action-arrow"></i>
                            </div>

                            <div className="action-card" onClick={() => navigate('/job-entry')} style={{ cursor: 'pointer' }}>
                                <div className="icon-wrapper orange">
                                    <i className="fa-solid fa-briefcase"></i>
                                </div>
                                <div className="action-info">
                                    <h3>Job Entry</h3>
                                    <p>Create new job</p>
                                </div>
                                <i className="fa-solid fa-arrow-right action-arrow"></i>
                            </div>

                            <div className="action-card" onClick={() => navigate('/job-done')} style={{ cursor: 'pointer' }}>
                                <div className="icon-wrapper teal">
                                    <i className="fa-solid fa-circle-check"></i>
                                </div>
                                <div className="action-info">
                                    <h3>Job done</h3>
                                    <p>Completed jobs</p>
                                </div>
                                <i className="fa-solid fa-arrow-right action-arrow"></i>
                            </div>

                            <div className="action-card" onClick={() => navigate('/job-delivery')} style={{ cursor: 'pointer' }}>
                                <div className="icon-wrapper indigo">
                                    <i className="fa-solid fa-truck-fast"></i>
                                </div>
                                <div className="action-info">
                                    <h3>Job Delivery</h3>
                                    <p>Dispatch details</p>
                                </div>
                                <i className="fa-solid fa-arrow-right action-arrow"></i>
                            </div>
                        </div>
                    </section>

                    <div className="dashboard-split">
                        {/* LARGE PROMO BANNER */}
                        <div className="promo-banner-wide">
                            <div className="promo-glass-effect"></div>
                            <div className="promo-info">
                                <span className="promo-badge">Special Offer</span>
                                <h2>Thermal Printers – Save Up to 50%!</h2>
                                <p>Get crisp, reliable prints without the ink hassle. Speed up your checkout process instantly.</p>
                                <button className="promo-btn">Enquire now <i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                            <div className="promo-graphics">
                                <i className="fa-solid fa-print promo-icon-bg"></i>
                                <div className="floating-receipt"></div>
                            </div>
                        </div>

                        {/* TOP SALES WIDGET */}
                        <div className="top-sales-card">
                            <div className="card-header">
                                <h2 className="section-title">Top Sales Metrics</h2>
                                <i className="fa-solid fa-ellipsis-vertical more-icon"></i>
                            </div>

                            <div className="sales-list">
                                {/* Sale Item 1 */}
                                <div className="sales-item">
                                    <div className="sales-header-row">
                                        <div className="icon-box light-blue">
                                            <i className="fa-solid fa-chart-line"></i>
                                        </div>
                                        <div className="sales-details">
                                            <h4>Top Value</h4>
                                            <p>Highest revenue</p>
                                        </div>
                                        <div className="sales-stat">
                                            <span className="amount">$12,450</span>
                                            <div className="sales-trend positive">
                                                <i className="fa-solid fa-arrow-trend-up"></i> +12%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-bg"><div className="progress-fill blue-fill" style={{ width: '85%' }}></div></div>
                                </div>

                                {/* Sale Item 2 */}
                                <div className="sales-item">
                                    <div className="sales-header-row">
                                        <div className="icon-box light-green">
                                            <i className="fa-solid fa-cubes"></i>
                                        </div>
                                        <div className="sales-details">
                                            <h4>Top Volume</h4>
                                            <p>Most items sold</p>
                                        </div>
                                        <div className="sales-stat">
                                            <span className="amount">1,240 pkgs</span>
                                            <div className="sales-trend positive">
                                                <i className="fa-solid fa-arrow-trend-up"></i> +8%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-bg"><div className="progress-fill green-fill" style={{ width: '65%' }}></div></div>
                                </div>

                                {/* Sale Item 3 */}
                                <div className="sales-item">
                                    <div className="sales-header-row">
                                        <div className="icon-box light-orange">
                                            <i className="fa-solid fa-print"></i>
                                        </div>
                                        <div className="sales-details">
                                            <h4>Print</h4>
                                            <p>Direct sales</p>
                                        </div>
                                        <div className="sales-stat">
                                            <span className="amount">342 units</span>
                                            <div className="sales-trend negative">
                                                <i className="fa-solid fa-arrow-trend-down"></i> -2%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress-bg"><div className="progress-fill orange-fill" style={{ width: '40%' }}></div></div>
                                </div>
                            </div>
                        </div>
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
