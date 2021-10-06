import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { sendPasswordResetOtp} from './passwordAction'
import { Container, Row, Col, Form, Button, Alert,Spinner } from 'react-bootstrap'

const PasswordReset = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const {isLoading,status, message} = useSelector(state => state.password)

    const handleOnResetSubmit = e => {
        dispatch(sendPasswordResetOtp(email))
        e.preventDefault()
    }

    const handleOnChange = e => {
        const { value } = e.target
        setEmail(value)
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Reset Password</h1>
                    <hr />
                    {message && (
                        <Alert variant={status === "success" ? "success" : "danger"}>
                            {message}
                        </Alert>
                    )}
                    {isLoading && <Spinner variant="primary" animation="border"/>}
                    <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleOnChange}
                                value={email}
                                placeholder="Enter Email"
                                required
                            />
                        </Form.Group>

                        {' '}
                        <Button type="submit" variant="primary" className="mt-3">Reset Password</Button>
                    </Form>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}


export default PasswordReset
