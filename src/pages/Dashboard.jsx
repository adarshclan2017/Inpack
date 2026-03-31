import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css';
import '../styles/Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                        <button className="icon-btn">
                            <i className="fa-regular fa-bell"></i>
                            <span className="badge">3</span>
                        </button>
                        <div className="separator"></div>
                        <div className="header-date">
                            <i className="fa-regular fa-calendar"></i>
                            <span>Today, Mar 20</span>
                        </div>
                    </div>
                </header>

                {/* DASHBOARD CONTENT */}
                <div className="dashboard-content dashboard-page">

                    {/* Header Row (Title & Filters) */}
                    <div className="dash-header-row">
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
                    </div>

                    {/* Main Split View for Desktop (Left 70% / Right 30%) */}
                    <div className="dashboard-main-split">

                        {/* LEFT COLUMN: Core Metrics & Big Charts */}
                        <div className="dash-left-col">
                            {/* Financial Overview */}
                            <section className="dash-section">
                                <h2 className="dash-section-title">Financial Overview</h2>
                                <div className="financial-grid">
                                    <div className="dash-card fin-card">
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-file-invoice teal-text"></i>
                                                <span>Invoice</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>

                                    <div className="dash-card fin-card">
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-cart-shopping teal-text"></i>
                                                <span>Purchase</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>

                                    <div className="dash-card fin-card">
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-receipt teal-text"></i>
                                                <span>Receipt</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>

                                    <div className="dash-card fin-card">
                                        <div className="card-top">
                                            <div className="card-icon-title">
                                                <i className="fa-solid fa-money-check-dollar teal-text"></i>
                                                <span>Payment done</span>
                                            </div>
                                            <div className="card-badge">0</div>
                                        </div>
                                        <div className="card-bottom">
                                            <div className="amount">₹ 0.00</div>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Charts Row */}
                            <div className="charts-row">
                                <section className="dash-section">
                                    <h2 className="dash-section-title">Periodic Profit Analysis</h2>
                                    <div className="dash-card chart-placeholder">
                                        <span>Profit Chart Space</span>
                                    </div>
                                </section>
                                <section className="dash-section">
                                    <h2 className="dash-section-title">Branch Wise Sales</h2>
                                    <div className="dash-card chart-placeholder">
                                        <span>Sales Chart Space</span>
                                    </div>
                                </section>
                            </div>

                            {/* Purchase Overview (Stretches to fill remaining left column height) */}
                            <section className="dash-section">
                                <h2 className="dash-section-title">Purchase Overview</h2>
                                <div className="dash-card chart-placeholder">
                                    <span>Overview Chart Space</span>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT COLUMN: Secondary Metrics & Summary Boards */}
                        <div className="dash-right-col">
                            {/* Purchases */}
                            <section className="dash-section">
                                <h2 className="dash-section-title">Purchases</h2>
                                <div className="dash-card purchase-card align-center">
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
                                </div>
                            </section>

                            {/* Services */}
                            <section className="dash-section">
                                <h2 className="dash-section-title">Services</h2>
                                <div className="services-grid-3">
                                    <div className="dash-card small-stat">
                                        <div className="stat-label blue-text"><i className="fa-solid fa-arrow-down"></i> Received</div>
                                        <div className="stat-val-row">
                                            <span className="val">0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                    <div className="dash-card small-stat">
                                        <div className="stat-label blue-text"><i className="fa-solid fa-arrow-down"></i> Completed</div>
                                        <div className="stat-val-row">
                                            <span className="val">0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                    <div className="dash-card small-stat">
                                        <div className="stat-label blue-text"><i className="fa-solid fa-arrow-down"></i> Delivered</div>
                                        <div className="stat-val-row">
                                            <span className="val">0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Accounts (Flexes to fill remaining right column) */}
                            <section className="dash-section">
                                <h2 className="dash-section-title">Accounts</h2>
                                <div className="accounts-grid-2x2">
                                    <div className="dash-card small-stat">
                                        <div className="stat-label teal-text"><i className="fa-solid fa-arrow-down"></i> Receivables</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                    <div className="dash-card small-stat">
                                        <div className="stat-label teal-text"><i className="fa-solid fa-circle-check"></i> Payables</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                    <div className="dash-card small-stat">
                                        <div className="stat-label teal-text"><i className="fa-solid fa-money-bill"></i> Cash</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                    <div className="dash-card small-stat">
                                        <div className="stat-label teal-text"><i className="fa-solid fa-building-columns"></i> Bank</div>
                                        <div className="stat-val-row">
                                            <span className="val">₹ 0</span>
                                            <div className="trend-circle positive"><i className="fa-solid fa-arrow-up-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
