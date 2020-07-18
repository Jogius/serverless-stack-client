import { LinkContainer } from 'react-router-bootstrap';
import LoaderButton from "../components/LoaderButton";
import React from "react";

export default function Settings() {
    return (
        <div className="Settings">
            <LinkContainer to="/settings/email">
                <LoaderButton block bsSize="large">
                    Change Email
                </LoaderButton>
            </LinkContainer>
            <LinkContainer to="/settings/password">
                <LoaderButton block bsSize="large">
                    Change Password
                </LoaderButton>
            </LinkContainer>
            <hr/>
        </div>
    );
}

//<StripeProvider stripe={stripe}>
//    <Elements>
//        <BillingForm isLoading={isLoading} onSubmit={handleFormSubmit}/>
//    </Elements>
//</StripeProvider>