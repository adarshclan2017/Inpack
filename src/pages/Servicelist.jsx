import React from 'react';
import ServiceList from '../components/ServiceList';

const Servicelist = () => {
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
        <ServiceList 
            title="Service List"
            statusOptions={STATUS_OPTIONS}
            defaultStatusId={0}
        />
    );
};

export default Servicelist;
