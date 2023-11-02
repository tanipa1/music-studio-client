import React from 'react';
import useSelectedClasses from '../../../hooks/useSelectedClasses';
import { Link } from 'react-router-dom';

const EnrolledClasses = () => {
    const [selectedClass, refetch] = useSelectedClasses();

    const onlyPaidItem = selectedClass.filter(selected => selected.type === "paid");
    return (
        <div>
            <h2 className="text-center mb-10 font-bold lg: text-3xl">Total Enrolled Courses: {onlyPaidItem.length}</h2>
            <div className="overflow-x-auto mb-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#c25934] text-white">
                        <tr>
                            <th></th>
                            <th>Course</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            onlyPaidItem.map((classes, index) => <tr key={classes._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={classes.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{classes.selectClassName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {classes.instructorName}
                                </td>
                                <td>${classes.price}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                
            </div>
            <Link to='/dashboard/paymentHistory' className='w-2/3 mx-auto grid justify-center items-center btn btn-sm text-white bg-[#0c4b65]'>Click to View Payment History</Link>
        </div>
    );
};

export default EnrolledClasses;