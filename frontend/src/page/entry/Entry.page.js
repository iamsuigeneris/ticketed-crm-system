import React,{useState} from 'react'
import './entry.style.css'
import { Card } from 'react-bootstrap'
import LoginForm from '../../components/login/Login.comp'
import PasswordReset from '../../components/password-reset/PasswordReset'
export const Entry = () => {

    const [formLoad, setFormLoad] = useState("login")

    const handleOnResetSubmit = e => {
        e.preventDefault()


        // TODO call api to submit the form
      
    }

    const handleOnSubmit = e => {
        e.preventDefault()

        // TODO call api to submit the form
     
    }
      
    const formSwitcher = (formType) => {
        setFormLoad(formType)
    }
    return (
        <div  className="entry-page bg-info">
        <Card style={{ width: '20rem' }} className="form-box">
                <Card.Body>
                    {formLoad === 'login' &&
                        <LoginForm
                            formSwitcher={formSwitcher}
                    />}

                </Card.Body>
                <Card.Body>
                    {formLoad === 'reset' &&
                        <PasswordReset
                        // handleOnChange={handleOnChange}
                        handleOnResetSubmit={handleOnResetSubmit}
                        formSwitcher={formSwitcher}
                        // email={email}
                    />}

            </Card.Body>
            </Card>
        </div>
    )
}
