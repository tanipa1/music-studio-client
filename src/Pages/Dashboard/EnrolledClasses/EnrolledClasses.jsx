import React from 'react';
import useSelectedClasses from '../../../hooks/useSelectedClasses';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const EnrolledClasses = () => {
    const [selectedClass, refetch] = useSelectedClasses();

    const onlyPaidItem = selectedClass.filter(selected => selected.type === "paid");
    return (
        <div className='w-full px-4 lg:px-16'>
    <h2 className="text-center my-6 font-bold text-xl lg:text-3xl">Total Enrolled Courses: {onlyPaidItem.length}</h2>
    <div className="overflow-x-auto mb-6">
        <table className="w-full table">
            {/* head */}
            <thead className="bg-[#c25934] text-white">
                <tr>
                    <th className="hidden lg:table-cell"></th>
                    <th className="lg:pl-2 lg:pr-4">Course</th>
                    <th className="lg:pl-4 lg:pr-2">Instructor</th>
                    <th className="lg:pl-2 lg:pr-4">Price</th>
                    <th className="hidden lg:table-cell"></th>
                </tr>
            </thead>
            <tbody>
                {onlyPaidItem.map((classes, index) => (
                    <tr key={classes._id} className="border-t lg:border-t-0">
                        <td className="hidden lg:table-cell">{index + 1}</td>
                        <td>
                            <div className="flex items-center space-x-2 lg:space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-8 h-8 lg:w-12 lg:h-12">
                                        <img src={classes.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-sm lg:text-base">{classes.selectClassName}</div>
                                </div>
                            </div>
                        </td>
                        <td className="lg:pl-4 lg:pr-2">{classes.instructorName}</td>
                        <td className="lg:pl-2 lg:pr-4">${classes.price}</td>
                        <td className="hidden lg:table-cell"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    <Link to='/dashboard/history' className='w-2/3 grid justify-center lg:mt-20 mx-auto btn btn-sm text-white bg-[#0c4b65]'>Click to View Payment History</Link>
</div>

    );
};

export default EnrolledClasses;