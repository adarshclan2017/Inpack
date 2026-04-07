import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(window.innerWidth <= 768);

    const menuVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -15, scale: 0.98 },
        show: { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 25 }
        }
    };

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
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="profile-sidebar-overlay"
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <motion.aside 
                layout
                className={`profile-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
                <div className="sidebar-header">
                    <motion.button
                        layout
                        className="sidebar-toggle-btn"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <motion.i 
                            layout
                            className={`fa-solid ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}
                        ></motion.i>
                    </motion.button>
                    <motion.div
                        layout
                        className="profile-avatar"
                        whileHover={{ scale: 1.05, rotate: 5, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                    >
                        <User size={isCollapsed ? 24 : 36} color="white" />
                    </motion.div>
                    <AnimatePresence mode="popLayout">
                        {!isCollapsed && (
                            <motion.div
                                className="profile-info"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="profile-name">Inpack App Test</div>
                                <div className="profile-actions">
                                    <motion.button
                                        className="profile-action-btn"
                                        title="Login actions"
                                        onClick={() => setIsLogoutModalOpen(true)}
                                        whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <LogOut size={16} />
                                    </motion.button>
                                    <motion.button
                                        className="profile-action-btn"
                                        title="Company info"
                                        whileHover={{ scale: 1.15, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Info size={16} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.nav
                    layout
                    className="sidebar-menu-card"
                    variants={menuVariants}
                    initial="hidden"
                    animate="show"
                >
                    {menuItems.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            variants={itemVariants}
                            className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
                            onClick={() => handleMenuNavigation(item)}
                            whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div layout className="menu-item-icon">
                                {item.icon}
                            </motion.div>
                            <AnimatePresence mode="popLayout">
                                {!isCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -5 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {!isCollapsed && <ChevronRight className="chevron-icon" />}
                            {activeMenu === item.name && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className="menu-active-pill"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.div>
                    ))}
                </motion.nav>
            </motion.aside>

            <main className="profile-main">
                <header className="main-header">
                    <div className="header-left-section">
                        <motion.button 
                            className="profile-mobile-toggle" 
                            onClick={() => setIsMobileMenuOpen(true)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <i className="fa-solid fa-bars"></i>
                        </motion.button>
                        <motion.div 
                            key={activeMenu}
                            className="header-title"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        >
                            {activeMenu}
                        </motion.div>
                    </div>
                    <div className="header-actions">
                        {/* Search and Notifications removed */}
                    </div>
                </header>

                <div className="content-area">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMenu}
                            initial={{ opacity: 0, y: 15, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -15, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{ height: '100%', width: '100%' }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Logout Modal Overlay */}
            <AnimatePresence>
                {isLogoutModalOpen && (
                    <motion.div
                        className="profile-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="profile-logout-modal"
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        >
                            <motion.div
                                className="profile-logout-icon-container"
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <LogOut size={32} strokeWidth={2.5} />
                            </motion.div>
                            <motion.h3 
                                className="profile-logout-title"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 }}
                            >
                                Logout
                            </motion.h3>
                            <motion.p 
                                className="profile-logout-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 }}
                            >
                                Are you want to logout ?
                            </motion.p>

                            <motion.div 
                                className="profile-logout-actions"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                            >
                                <motion.button
                                    className="profile-btn-no"
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
                                    whileTap={{ scale: 0.95 }}
                                >No</motion.button>
                                <motion.button
                                    className="profile-btn-yes"
                                    onClick={handleLogout}
                                    whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                                    whileTap={{ scale: 0.95 }}
                                >Yes</motion.button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Profile;
