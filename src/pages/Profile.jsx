import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import FollowUp from './FollowUp';
import SalesReport from './SalesReport';
import Stockvalue from './Stockvalue';
import Valueandvolume from './Valueandvolume';
import Customerwise from './Customerwise';
import Periodiccollection from './Periodiccollection';
import Servicelist from './Servicelist';
import Menu from './Menu';
import Purchase from './Purchase';
import About from './About';
import Uom from './Uom';
import Hsa from './Hsa';
import Suppliers from './Suppliers';
import Salesman from './Salesman';
import CommissionAgent from './CommissionAgent';
import Location from './Location';
import ServiceEngineer from './ServiceEngineer';
import Customers from './Customers';
import Category from './Category';
import AdddProduct from './AdddProduct';
import {
    Home,
    User,
    BarChart2,
    Package,
    PieChart,
    Users,
    FileText,
    ClipboardList,
    LayoutGrid,
    Info,
    LogOut,
    ChevronRight,
    TrendingUp,
    Bell,
    Search
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('Follow up');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Home', icon: <Home />, id: 'home', route: '/welcome' },
        { name: 'Dashboard', icon: <BarChart2 />, id: 'dashboard', route: '/dashboard' },
        { name: 'Follow up', icon: <User />, id: 'follow-up' },
        { name: 'Sales report', icon: <TrendingUp />, id: 'sales' },
        { name: 'Stock value statement', icon: <Package />, id: 'stock' },
        { name: 'Value and volume Analysis', icon: <PieChart />, id: 'analysis' },
        { name: 'Customer wise sales report', icon: <Users />, id: 'customers' },
        { name: 'Periodic collection statement', icon: <FileText />, id: 'collection' },
        { name: 'Service list report', icon: <ClipboardList />, id: 'service' },
        { name: 'Menu', icon: <LayoutGrid />, id: 'menu' },
        { name: 'Logout', icon: <LogOut />, id: 'logout' },
        { name: 'About', icon: <Info />, id: 'about' }
    ];

    const handleLogout = () => {
        navigate('/');
    };

    const handleMenuNavigation = (item) => {
        if (item.route) {
            navigate(item.route);
            setIsMobileMenuOpen(false);
        } else if (item.name === 'Logout') {
            setIsLogoutModalOpen(true);
            setIsMobileMenuOpen(false);
        } else {
            setActiveMenu(item.name);
            setIsMobileMenuOpen(false);
        }
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'Follow up':
                return <FollowUp />;
            case 'Sales report':
                return <SalesReport />;
            case 'Stock value statement':
                return <Stockvalue />;
            case 'Value and volume Analysis':
                return <Valueandvolume />;
            case 'Customer wise sales report':
                return <Customerwise />;
            case 'Periodic collection statement':
                return <Periodiccollection />;
            case 'Service list report':
                return <Servicelist />;
            case 'Purchase':
                return <Purchase setActiveTab={setActiveMenu} />;
            case 'Menu':
                return <Menu setActiveTab={setActiveMenu} />;
            case 'About':
                return <About setActiveTab={setActiveMenu} />;
            case 'UOM':
                return <Uom setActiveTab={setActiveMenu} />;
            case 'HSN / SAC':
                return <Hsa setActiveTab={setActiveMenu} />;
            case 'Suppliers':
                return <Suppliers setActiveTab={setActiveMenu} />;
            case 'Salesman':
                return <Salesman setActiveTab={setActiveMenu} />;
            case 'Commission Agent':
                return <CommissionAgent setActiveTab={setActiveMenu} />;
            case 'Location':
                return <Location setActiveTab={setActiveMenu} />;
            case 'Service Engineer':
                return <ServiceEngineer setActiveTab={setActiveMenu} />;
            case 'Customers':
                return <Customers setActiveTab={setActiveMenu} />;
            case 'Category':
                return <Category setActiveTab={setActiveMenu} />;
            case 'Add Product':
                return <AdddProduct setActiveTab={setActiveMenu} />;
            default:
                return (
                    <div className="fade-in" style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <p>Content for "{activeMenu}" is currently under development.</p>
                    </div>
                );
        }
    };

    return (
        <div className="profile-dashboard">
            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && <div className="profile-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

            <aside className={`profile-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <button className="sidebar-toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <i className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
                    </button>
                    <div className="profile-avatar">
                        <User size={isCollapsed ? 24 : 36} color="white" />
                    </div>
                    {!isCollapsed && (
                        <div className="profile-info">
                            <div className="profile-name">Inpack App Test</div>
                            <div className="profile-actions">
                                <button className="profile-action-btn" title="Login actions" onClick={() => setIsLogoutModalOpen(true)}>
                                    <LogOut size={16} />
                                </button>
                                <button className="profile-action-btn" title="Company info">
                                    <Info size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <nav className="sidebar-menu-card">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
                            onClick={() => handleMenuNavigation(item)}
                        >
                            <div className="menu-item-icon">
                                {item.icon}
                            </div>
                            {!isCollapsed && <span>{item.name}</span>}
                            {!isCollapsed && <ChevronRight className="chevron-icon" />}
                        </div>
                    ))}
                </nav>
            </aside>

            <main className="profile-main">
                <header className="main-header">
                    <div className="header-left-section">
                        <button className="profile-mobile-toggle" onClick={() => setIsMobileMenuOpen(true)}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        <div className="header-title">{activeMenu}</div>
                    </div>
                    <div className="header-actions">
                        {/* Search and Notifications removed */}
                    </div>
                </header>

                <div className="content-area">
                    {renderContent()}
                </div>
            </main>

            {/* Logout Modal Overlay */}
            {isLogoutModalOpen && (
                <div className="profile-modal-overlay">
                    <div className="profile-logout-modal">
                        <div className="profile-logout-icon-container">
                            <LogOut size={32} strokeWidth={2.5} />
                        </div>
                        <h3 className="profile-logout-title">Logout</h3>
                        <p className="profile-logout-text">Are you want to logout ?</p>
                            
                        <div className="profile-logout-actions">
                            <button className="profile-btn-no" onClick={() => setIsLogoutModalOpen(false)}>No</button>
                            <button className="profile-btn-yes" onClick={handleLogout}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
