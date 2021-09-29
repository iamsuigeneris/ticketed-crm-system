import React from 'react'
import { Card } from "react-bootstrap"
import "./registration.css"
import RegistrationForm from "../../components/registration-form/RegistrationForm"

export const Registration = () => {
    return <div className="registration-page bg-info">
        <div className="mt-5">
            <Card style={{ width: '25rem', padding:'1rem' }} className="form-box">
            <RegistrationForm />
            </Card>
        </div >
    </div>


    
}


