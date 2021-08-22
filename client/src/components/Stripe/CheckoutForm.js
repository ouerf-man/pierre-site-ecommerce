import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import * as api from "../../services/api.account.service"
import { connect } from "react-redux"
const CheckoutFormCard = ({ images, ammount, user, coeffs }) => {
    
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessingTo(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const res = await api.charge({ amount: ammount, id, images, account: user.id })

                if (res.success) {
                    alert(res.message)
                }
            } catch (error) {
                alert(error.response.message)
            }
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
    const [formData, setFormData] = useState({})
    const [precessing, setProcessingTo] = useState(false)
    /* const [errors, setErrors] = useState({
        nom: false,
        email: false,
        ville: false,
        adresse: false,
        gouvernorat: false,
        zip: false,
    }) */
    const handleInputChange = (e) => {
        const aux = { ...formData }
        const name = e.target.name
        const value = e.target.value

        aux[name] = value

        setFormData(aux)
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto">
            <div className="d-flex justify-content-center">
                <div className="row justify-content-center">
                    <input type="text" id="nom" name="nom" value={`${user.last_name} ${user.first_name}`} required placeholder="Nom et prenom" onChange={handleInputChange} />
                    <input type="email" id="email" name="email" value={user.email} required placeholder="Email" onChange={handleInputChange} />
                    <input type="text" id="ville" name="ville" required placeholder="Ville" onChange={handleInputChange} />
                    <input type="text" id="adresse" name="adresse" value={user.adress} required placeholder="Adresse" onChange={handleInputChange} />
                    <input type="text" id="gouvernorat" name="gouvernorat" required placeholder="Gouvernorat" onChange={handleInputChange} />
                    <input type="text" id="zip" name="zip" required value={user.zip} placeholder="Code postal" onChange={handleInputChange} />
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
    marginTop: "40px"
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user
});

export const CheckoutForm = connect(mapStateToProps)(CheckoutFormCard)