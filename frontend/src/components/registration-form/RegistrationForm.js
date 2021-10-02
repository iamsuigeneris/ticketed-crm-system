import React,{useState,useEffect} from 'react'
import { Container, Row, Form, Button, Col,Spinner ,Alert} from 'react-bootstrap'
import { newUserRegistration } from './userRegAction'
import {useDispatch,useSelector} from 'react-redux'

const initialState = {
    name:"",
    phone:"",
    email:"",
    company: "",
    address:"",
    password:"",
    confirmPassword:"",
}
const pwdVerificationError = {
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpeXter: false,
    confirmPassword:false
}

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const [newUser, setNewUser] = useState(initialState)
    const [passwordError, setPasswordError] = useState(pwdVerificationError)

    const {isLoading,status,message} = useSelector(state => state.registration)
    useEffect(() => {

    }, [newUser])

    const handleOnChange = e => {
        const { name, value } = e.target

        setNewUser({ ...newUser, [name]: value })

        if (name === "password") {
            const isLengthy = value.length > 8 
            const hasUpper = /[A-Z]/.test(value)
            const hasLower = /[a-z]/.test(value)
            const hasNumber = /[0-9]/.test(value)
            const hasSpeXter = /[@,#,$,%,&]/.test(value)

            setPasswordError({...passwordError,isLengthy,hasUpper,hasLower,hasNumber,hasSpeXter})
        }
        if (name === "confirmPassword") {
            setPasswordError({
                ...passwordError,
                confirmPassword: newUser.password === value
            })
        }
    }
    
    const handleOnSubmit = e => {
        e.preventDefault()
        // console.log(newUser)
        const { name, phone, email, company, address, password } = newUser
        
        const newRegistration = {
            name, phone, email, company, address, password 
        }
        dispatch(newUserRegistration(newRegistration))
    }
    
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info">User Registration</h1>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    {message && <Alert variant={status === 'success' ? 'success' : 'danger'}>{message}</Alert>}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="name" value={newUser.name} onChange={handleOnChange} placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" name="email" value={newUser.email} onChange={handleOnChange} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="number" name="phone" value={newUser.phone} onChange={handleOnChange} placeholder="Phone" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company name</Form.Label>
                            <Form.Control type="text" name="company" value={newUser.company} onChange={handleOnChange} placeholder="Company name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" value={newUser.address} onChange={handleOnChange} placeholder="Full address" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={newUser.password} onChange={handleOnChange} placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={newUser.confirmPassword} onChange={handleOnChange} placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Text>
                            {!passwordError.confirmPassword && (<div className="text-danger mb-3">Password doesn't match</div>)}
                        </Form.Text>
                        <ul className="mb-4"> 
                            <li className={passwordError.isLengthy ? "text-success" : "text-danger"}>Min 8 character</li>
                            <li className={passwordError.hasUpper ? "text-success" : "text-danger"}>At least one upper case</li>
                            <li className={passwordError.hasLower ? "text-success" : "text-danger"}>At least one lower case</li>
                            <li className={passwordError.hasNumber ? "text-success" : "text-danger"}>At least one number</li>
                            <li className={passwordError.hasSpeXter ? "text-success" : "text-danger"}>At least one of the special characters</li>
                        </ul>

                        <Button variant="primary" type="submit" disabled={Object.values(passwordError).includes(false)}>
                            Submit
                        </Button>
                        {isLoading && <Spinner variant="info" animation="border" />}
                       
                    </Form>
                </Col>
            </Row>
            <Row className="py-4"> 
                <Col>
                    Already have an account {' '}
                     <a href="/">Login Now</a>
                </Col>
            </Row>
        </Container>
    )
}

export default RegistrationForm
