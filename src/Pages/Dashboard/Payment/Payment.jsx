import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Token);

const Payment = () => {
    const selectedClass = useLoaderData();

    return (
        <div className="w-2/3 mx-auto">
            <h2 className="text-center mb-10 font-bold lg: text-3xl">Payment Here</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm selectedClass={selectedClass} price={10}/>
            </Elements>
        </div>
    );
};

export default Payment;