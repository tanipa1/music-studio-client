import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import './CheckoutForm.css';

const CheckoutForm = ({ selectedClass }) => {
    const { price, _id, selectClassName, image, 
        selectClassId } = selectedClass;

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('http://localhost:5000/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ price }),
                });
                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.log('Error fetching client secret:', error);
            }
        };

        fetchClientSecret();
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        const cardElement = elements.getElement(CardElement);
        if (cardElement == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: user?.displayName || 'Anonymous',
                email: user?.email || 'unknown',
            },
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
            setProcessing(false);
        } 

        try {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: paymentMethod.id,
                }
            );

            if (confirmError) {
                console.log('Error confirming card payment:', confirmError);
                setError(confirmError.message);
            }
            else if (paymentIntent) {
                console.log(paymentIntent);
                const response = await fetch(`http://localhost:5000/selectedclasses/${_id}`, {
                    method: 'PATCH',
                });
                //reducing available seats by 1
                const res = await fetch(`http://localhost:5000/classes/update/${selectClassId}`, {
                    method: 'PATCH',
                });
                const data = await res.json();

                const newPayment = {
                    email: user?.email,
                    price,
                    selectClassName,
                    image,
                    studentName: user?.displayName,
                    transaction: paymentIntent.id
                }

                //post a payment for show history
                fetch('http://localhost:5000/payments', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(newPayment)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            setError("")
                            Swal.fire('Payment Successful. Thank You!')
                            // navigate("/studentdashboard/history")
                        }
                    })

            }
        } catch (error) {
            console.log('Error processing payment:', error);
            setError('Error processing payment. Please try again.');
        }

        setProcessing(false);
    };

    
    return (
        <>
            <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <div>
                        <div className="h-full flex flex-col items-center text-center">
                            <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={image} />
                            <div className="w-full">
                                <h2 className="title-font font-medium text-lg text-gray-900">{selectClassName}</h2>
                                <h3 className="text-xl font-semibold mb-3 text-[#EA4C24]">Price: ${price}</h3>
                                <p className="mb-4"><span className="font-semibold">Fill out the payment details in the form below.</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {error && <p className="pt-5 text-red-500">{error}</p>}
            </div>
                <div className='grid justify-center items-center'>
                    <button className="btn btn-sm mt-8 bg-[#c25934] text-white" type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
            </form>
            {error && <p className='text-red-600 mt-5 grid justify-center items-center'>{error}</p>}
        </>
    );
};

export default CheckoutForm;