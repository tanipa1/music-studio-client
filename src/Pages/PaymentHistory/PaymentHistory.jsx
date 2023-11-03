import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const {user} = useAuth();

    const { data: history = [], refetch } = useQuery(['history'], async () => {
        const res = await fetch(`http://localhost:5000/payments/${user?.email}`)
        return res.json();
    })

    console.log(history);

    return (
        <div>
            <h1 className='text-center mb-10 font-bold lg: text-3xl'>Your Transaction History</h1>
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                        {
                            history.map(singleHistory =>
                                <div key={singleHistory._id} className="p-2 w-full">
                                    <div className="bg-gray-100 rounded justify-between flex p-4 h-full items-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} className="text-[#0c4b65] w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                            <path d="M22 4L12 14.01l-3-3" />
                                        </svg>
                                        <span className="title-font font-medium">{singleHistory.selectClassName}</span>
                                        <span className='font-semibold'>${singleHistory.price}</span>
                                        <span className='font-semibold'>Transaction Id: <span className='text-[#c25934]'>{singleHistory.transaction}</span></span>
                                        <img className='w-12 rounded-md h-9' src={singleHistory.image} alt="" />
                                    </div>
                                </div>
                            )
                        }
                        {
                            history.length === 0 &&
                            <p className='w-full text-center py-5 text-2xl font-semibold text-[#EA4C24]'>You have no payment history!</p>
                        }
                    </div>
        </div>
    );
};

export default PaymentHistory;