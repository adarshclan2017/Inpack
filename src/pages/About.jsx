import React, { useState } from 'react';
import '../styles/About.css';

const About = ({ setActiveTab }) => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <div className="about-page-wrapper">
            <div className="about-container">
                {/* Header perfectly honoring module uniformity */}
                <div className="about-header">
                    <button className="about-back-btn" onClick={() => setActiveTab && setActiveTab('Menu')}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <h2 className="about-header-title">About</h2>
                </div>

                {/* Main Content Body */}
                <div className="about-content">
                    <button className="about-action-pill">
                        <div className="about-pill-left">
                            <i className="fa-solid fa-clipboard-list about-pill-icon"></i>
                            <span>Terms and Privacy</span>
                        </div>
                        <i className="fa-solid fa-chevron-right about-pill-arrow"></i>
                    </button>

                    <button className="about-action-pill" onClick={() => setIsContactModalOpen(true)}>
                        <div className="about-pill-left">
                            <i className="fa-solid fa-address-card about-pill-icon"></i>
                            <span>Contact</span>
                        </div>
                        <i className="fa-solid fa-chevron-right about-pill-arrow"></i>
                    </button>
                </div>
            </div>

            {/* Contact Modal Overlay */}
            {isContactModalOpen && (
                <div className="about-modal-overlay">
                    <div className="about-contact-modal">
                        <button className="about-modal-close" onClick={() => setIsContactModalOpen(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        
                        <div className="about-modal-icon-container">
                            <i className="fa-solid fa-circle-question"></i>
                        </div>
                        
                        <h3 className="about-modal-title">Need more help?</h3>
                        <p className="about-modal-text">Feel free to contact us, we will get back to you shortly</p>
                        
                        <div className="about-modal-actions">
                            <button className="about-contact-btn about-btn-primary">
                                <i className="fa-solid fa-phone"></i> Phone
                            </button>
                            <button className="about-contact-btn about-btn-secondary">
                                <i className="fa-solid fa-envelope"></i> Email
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
