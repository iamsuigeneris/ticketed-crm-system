import React from 'react'
import {useSelector} from 'react-redux'
import './passwordOtpForm.css'
import { Card } from 'react-bootstrap'
import PasswordReset from '../../components/password-reset/PasswordReset'
import UpdatePasswordForm from '../../components/password-reset/UpdatePasswordForm'


export const PasswordOtpForm = () => {
    const { showUpdatePassForm } = useSelector(state => state.password)

    return (
        <div  className="entry-page bg-info">
        <Card style={{ width: '20rem' }} className="form-box">
                <Card.Body>
                    {showUpdatePassForm ?  <UpdatePasswordForm /> : <PasswordReset />}
                   
                    <div className="text-center">
                        <a href="/">Login Now</a>
                    </div>    
                   
            </Card.Body>
            </Card>
        </div>
    )
}
