import React, { useState } from 'react';
import ServiceList from '../components/ServiceList';

const JobDelivery = () => {
    const [isLoading, setIsLoading] = useState(false);

    const STATUS_OPTIONS = [
        { id: 0, label: 'All' },
        { id: 1, label: 'Not Alloted' },
        { id: 2, label: 'Not Completed' },
        { id: 3, label: 'Not Delivered' },
        { id: 4, label: 'Delivered' },
        { id: 5, label: 'Alloted But Not Completed' },
        { id: 6, label: 'Completed But Not Delivered' },
    ];

    return (
        <>
            {isLoading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)',
                    zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '12px'
                }}>
                    <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: '#10b981' }}></i>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>Fetching Details...</span>
                </div>
            )}
            <ServiceList
                title="Job Delivery"
                statusOptions={STATUS_OPTIONS}
                defaultStatusId={3}
            />
        </>
    );
};

export default JobDelivery;
