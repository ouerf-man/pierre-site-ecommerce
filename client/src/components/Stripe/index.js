import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const Stripe = ({ammount,images,coeffs}) => {
  return (
    <Elements stripe={stripeTestPromise} options={{locale:"fr"}}>
      <CheckoutForm coeffs={coeffs} images={images} ammount={ammount} />
    </Elements>
  );
};

export default Stripe;