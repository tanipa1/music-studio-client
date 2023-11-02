import React from 'react';
import useSelectedClasses from '../../../hooks/useSelectedClasses';

const EnrolledClasses = () => {
    const [selectedClass, refetch] = useSelectedClasses();

    const onlyPaidItem = selectedClass.filter(selected => selected.type === "paid");
    return (
        <div>
            
        </div>
    );
};

export default EnrolledClasses;