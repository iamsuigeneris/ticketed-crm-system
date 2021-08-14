import React,{useState} from 'react'
import './entry.style.css'
import { Card } from 'react-bootstrap'
import LoginForm from '../../components/login/Login.comp'
import PasswordReset from '../../components/password-reset/PasswordReset'
export const Entry = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formLoad, setFormLoad] = useState("login")

    const handleOnChange = e => {
        const { name, value } = e.target
        
        switch (name) {
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            
            default:
                break
        }
    }

    const handleOnResetSubmit = e => {
        e.preventDefault()

        if (!email) {
            return alert("Please enter email")
        }
        // TODO call api to submit the form
        console.log(email)
    }

    const handleOnSubmit = e => {
        e.preventDefault()

        if (!email || !password) {
            return alert("Fill up all the form!")
        }
        // TODO call api to submit the form
        console.log({ email, password })
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
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                        formSwitcher={formSwitcher}
                        email={email}
                        password={password}
                    />}

                </Card.Body>
                <Card.Body>
                    {formLoad === 'reset' &&
                        <PasswordReset
                        handleOnChange={handleOnChange}
                        handleOnResetSubmit={handleOnResetSubmit}
                        formSwitcher={formSwitcher}
                        email={email}
                    />}

            </Card.Body>
            </Card>
        </div>
    )
}
