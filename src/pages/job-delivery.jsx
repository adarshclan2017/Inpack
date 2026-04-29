import React, { useState } from 'react';
import ServiceList from '../components/ServiceList';
import JobDeliveryForm from '../components/JobDeliveryForm';

const JobDelivery = () => {
    const [selectedJob, setSelectedJob] = useState(null);
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

    const handleItemClick = async (item) => {
        // ServiceID = human-readable job number e.g. "JOB400/24-25"
        const serviceId = item.ServiceID || item.service_id || item.job_no || '';

        setIsLoading(true);
        try {
            const licenseKey = localStorage.getItem('licenseKey') || 'ILT_LIC_9988056';
            const imei      = localStorage.getItem('imei')       || 'ILTUKAInpackPro1';
            const pin       = localStorage.getItem('pin')        || '2255';
            const internalUserId = localStorage.getItem('internalUserId') || '41';

            const branchName    = localStorage.getItem('branchId') || '';
            const branchDetails = JSON.parse(localStorage.getItem('branch_details') || '[]');
            const branchObj     = branchDetails.find(b => b.branch_id === branchName);
            const branchId      = branchObj ? branchObj.internal_branch_id : '2';

            const url = `/api2025/InPackService.asmx/fillServiceJobDelivery?ServiceID=${encodeURIComponent(serviceId)}&InternalBranchID=${branchId}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&InternalUserID=${internalUserId}`;

            const res  = await fetch(url);
            const text = await res.text();

            // Response is XML-wrapped JSON: <string>{ ... }</string>
            const parser  = new DOMParser();
            const xmlDoc  = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let jsonStr   = stringEl?.textContent || '';

            if (!jsonStr) {
                const m = text.match(/\{[\s\S]*\}/);
                if (m) jsonStr = m[0];
            }

            if (jsonStr) {
                const data    = JSON.parse(jsonStr);
                // API returns: { responseMessage, jobdelivery: [...], Spare_Details: [...] }
                const record  = data.jobdelivery?.[0] || item;
                const spares  = data.Spare_Details   || [];
                setSelectedJob({ ...record, _spareDetails: spares });
            } else {
                setSelectedJob(item);
            }
        } catch (err) {
            console.error('fillServiceJobDelivery error:', err);
            setSelectedJob(item);
        } finally {
            setIsLoading(false);
        }
    };

    // ── Full-page form view ───────────────────────────────────
    if (selectedJob) {
        return (
            <JobDeliveryForm
                data={selectedJob}
                onBack={() => setSelectedJob(null)}
                onSaveSuccess={() => setSelectedJob(null)}
            />
        );
    }

    // ── List view ─────────────────────────────────────────────
    return (
        <>
            {isLoading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(5px)',
                    zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: '12px'
                }}>
                    <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: '#16a34a' }}></i>
                    <span style={{ fontWeight: '600', color: '#1e293b', fontFamily: 'Inter, sans-serif' }}>
                        Fetching Details...
                    </span>
                </div>
            )}
            <ServiceList
                title="Job Delivery"
                statusOptions={STATUS_OPTIONS}
                defaultStatusId={3}
                onItemClick={handleItemClick}
            />
        </>
    );
};

export default JobDelivery;
