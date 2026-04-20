import React, { useState } from 'react';
import ServiceList from '../components/ServiceList';
import JobStatusForm from '../components/JobStatusForm';

const JobDone = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    const STATUS_OPTIONS = [
        { id: 0, label: 'All' },
        { id: 1, label: 'Not Alloted' },
        { id: 2, label: 'Not Completed' },
        { id: 3, label: 'Not Delivered' },
        { id: 4, label: 'Delivered' },
        { id: 5, label: 'Alloted But Not Completed' },
        { id: 6, label: 'Completed But Not Delivered' },
    ];

    if (selectedJob) {
        return <JobStatusForm data={selectedJob} onBack={() => setSelectedJob(null)} />;
    }

    return (
        <ServiceList 
            title="Service List"
            statusOptions={STATUS_OPTIONS}
            defaultStatusId={0}
            onItemClick={(service) => setSelectedJob(service)}
        />
    );
};

export default JobDone;
