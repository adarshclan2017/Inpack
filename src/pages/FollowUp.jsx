import React, { useState } from 'react';
import { Search, ScanLine, Tag, Activity } from 'lucide-react';
import '../styles/FollowUp.css';

const FollowUp = () => {
    const [serialNumber, setSerialNumber] = useState('');

    const handleSearch = () => {
        console.log('Searching deep database for:', serialNumber);
    };

    return (
        <div className="followup-page">
            <div className="followup-hero-container fade-in">
                
                <div className="hero-text">
                    <h1>Global Tracking</h1>
                    <p>Enter a tracking identifier or scan a barcode to instantly access the decentralized audit ledger.</p>
                </div>

                <div className="premium-search-box">
                    <ScanLine className="icon-scan" size={40} />
                    <input 
                        type="text" 
                        placeholder="Search SN, Order ID, or Tag..." 
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                    />
                    <button className="massive-btn" onClick={handleSearch}>
                        <Search size={28} /> 
                        <span>Locate</span>
                    </button>
                </div>

                <div className="bottom-hints">
                    <div className="hint-tag" onClick={() => setSerialNumber('TAG-992-DELTA')}>
                        <Tag size={20} /> TAG-992-DELTA
                    </div>
                    <div className="hint-tag" onClick={() => setSerialNumber('SN-1804-VXR')}>
                        <Activity size={20} /> SN-1804-VXR
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FollowUp;
