import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import {
    HelpBlock,
    FormGroup,
    Glyphicon,
    FormControl,
    ControlLabel
} from "react-bootstrap";

import LoaderButton from "../components/LoaderButton";
import { useFormFields } from '../libs/hooksLib';
import { onError } from "../libs/errorLib";
import './ResetPassword.css';


export default function ResendConfirmationEmail() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        confirmationCode: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    function validateResendForm() {
        return fields.email.length > 0;
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleResendClick(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.resendSignUp(fields.email);
            setCodeSent(true);
            setIsLoading(false);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleConfirmClick(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            setConfirmed(true);
            setIsLoading(false);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function renderResendForm() {
        return (
            <form onSubmit={handleResendClick}>
                <FormGroup bsSize='large' controlId='email'>
                    <ControlLabel>E-Mail</ControlLabel>
                    <FormControl
                        autoFocus
                        type='email'
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type='submit'
                    bsSize='large'
                    isLoading={isLoading}
                    disabled={!validateResendForm()}
                >
                    Resend Confirmation E-Mail
                </LoaderButton>
            </form>
        );
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmClick}>
                <FormGroup bsSize='large' controlId='confirmationCode'>
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type='tel'
                        value={fields.confirmationCode}
                        onChange={handleFieldChange}
                    />
                    <HelpBlock>
                        Please check your E-Mail inbox ({fields.email}) for the confirmation code.
                    </HelpBlock>
                </FormGroup>
                <LoaderButton
                    block
                    type='submit'
                    bsSize='large'
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                >
                    Confirm
                </LoaderButton>
            </form>
        );
    }

    function renderSuccessMessage() {
        return (
            <div className='success'>
                <Glyphicon glyph='ok' />
                <p>Your E-Mail Address has been confirmed.</p>
                <p>
                    <Link to='/login'>
                        Click here to login with your confirmed E-Mail Address.
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className='ResetPassword'>
            {!codeSent
                ? renderResendForm()
                : !confirmed
                    ? renderConfirmationForm()
                    : renderSuccessMessage()}
        </div>
    );
}