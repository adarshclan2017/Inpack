import React, { useState } from 'react';
import ServiceList from '../components/ServiceList';
import JobStatusForm from '../components/JobStatusForm';

const JobDone = () => {
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
        const internalId = item.InternalServiceID || item.ServiceID || item.internal_service_id;
        if (!internalId) {
            setSelectedJob(item);
            return;
        }

        setIsLoading(true);
        try {
            const licenseKey = localStorage.getItem('licenseKey') || 'ILT_LIC_9988056';
            const imei = localStorage.getItem('imei') || 'ILTUKAInpackPro1';
            const pin = localStorage.getItem('pin') || '2255';
            const internalUserId = localStorage.getItem('internalUserId') || '41';

            const url = `/api2025/InPackService.asmx/getJobEntryDetails?InternalServiceID=${internalId}&LicenseKey=${licenseKey}&IMEI=${imei}&PIN=${pin}&InternalUserID=${internalUserId}`;

            const res = await fetch(url);
            const text = await res.text();

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            const stringEl = xmlDoc.getElementsByTagName('string')[0];
            let jsonStr = '';
            if (stringEl && stringEl.textContent) {
                jsonStr = stringEl.textContent;
            } else {
                const m = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                if (m) jsonStr = m[0];
            }

            if (jsonStr) {
                const data = JSON.parse(jsonStr);
                const record = (data.service && data.service[0]) ? data.service[0] :
                    (Array.isArray(data) ? data[0] : (data.Table ? data.Table[0] : (data.data ? data.data[0] : data)));
                if (record) {
                    setSelectedJob(record);
                } else {
                    setSelectedJob(item);
                }
            } else {
                setSelectedJob(item);
            }
        } catch (err) {
            console.error('getJobEntryDetails error:', err);
            setSelectedJob(item);
        } finally {
            setIsLoading(false);
        }
    };

    if (selectedJob) {
        return <JobStatusForm data={selectedJob} onBack={() => setSelectedJob(null)} />;
    }

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
                title="Service List"
                statusOptions={STATUS_OPTIONS}
                defaultStatusId={0}
                onItemClick={handleItemClick}
            />
        </>
    );
};

export default JobDone;
