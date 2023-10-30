import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ selectedClass }) => {
    const { price, _id, selectClassName, image } = selectedClass;

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {

            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            setError('')
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <div className='grid justify-center items-center'>
                    <button className="btn btn-sm mt-8 bg-[#c25934] text-white" type="submit" disabled={!stripe}>
                        Pay
                    </button>
                </div>
            </form>
            {error && <p className='text-red-600 mt-5 grid justify-center items-center'>{error}</p>}
        </>
    );
};

export default CheckoutForm;