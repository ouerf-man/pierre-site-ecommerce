import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51Ivkd8HduTYKpPVz7N319469jPMjOHSFAWgfCPCxzPW5ScYH60MoZohHLjJQLus91Ebe1Yti98SPZrO5uPcoxToS00i5T5VE6x";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
const Stripe = ({ammount,images,coeffs}) => {
  return (
    <Elements stripe={stripeTestPromise} options={{locale:"fr"}}>
      <CheckoutForm coeffs={coeffs} images={images} ammount={ammount} />
    </Elements>
  );
};

export default Stripe;