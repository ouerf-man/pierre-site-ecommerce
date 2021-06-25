import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            console.log("Stripe 23 | token generated!", paymentMethod);
            //send token to backend here
        } else {
            console.log(error.message);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: "#0d0d0d",
                "::placeholder": {
                    color: '#cccccc'
                }
            },
            invalid: {
                color: "#ed1c24"
            },
            complete: {

            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto">
            <div className="d-flex justify-content-center">
                <div className="row justify-content-center">
                    <input type="text" id="nom" name="nom" placeholder="Nom et prenom" />
                    <input type="text" id="email" name="email" placeholder="Email" />
                    <input type="text" id="ville" name="ville" placeholder="Ville" />
                    <input type="text" id="adresse" name="adresse" placeholder="Adresse" />
                    <input type="text" id="gouvernorat" name="gouvernorat" placeholder="Gouvernorat" />
                    <input type="text" id="zip" name="zip" placeholder="Code postal" />
                    <div style={CardContainerStyle}>
                        <CardElement options={cardElementOptions} className={"stipe-form"} />
                    </div>
                    <input type="submit" value="payer" />
                </div>
            </div>
        </form>
    );
};

const CardContainerStyle = {
    padding: "12px 29px",
    backgroundColor: "#f6f6f6",
    border: "2px solid #f6f6f6",
    borderRadius: "5px 5px 5px 5px",
    width: '85%',
    margin: "5px",
    marginTop:"40px"
}