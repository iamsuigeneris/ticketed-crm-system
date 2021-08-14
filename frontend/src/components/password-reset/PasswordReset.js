import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const PasswordReset = ({ handleOnChange, handleOnResetSubmit, email, formSwitcher }) => {

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Reset Password</h1>
                    <hr />
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
            <Row>
                <Col>
                    <a href="#!" onClick={() => formSwitcher('login')} style={{ textDecoration: "none" }}>Login Now</a>
                </Col>
            </Row>
        </Container>
    )
}

PasswordReset.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnResetSubmit: PropTypes.func.isRequired,
    formSwitcher: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    
}
export default PasswordReset
