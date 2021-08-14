import React from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'

const LoginForm = ({handleOnChange,handleOnSubmit, email, password, formSwitcher}) => {

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="text-info text-center">Client Login</h1>
                    <hr />
                    <Form autoComplete="off" onSubmit={handleOnSubmit}>
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
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleOnChange}
                                value={password}
                                placeholder="Password"
                                required
                            />
                        </Form.Group>
                        {' '}
                        <Button type="submit" variant="primary" className="mt-3">Login</Button>
                    </Form>
                    <hr />
                </Col>
            </Row>
            <Row> 
                <Col>
                    <a href="#!" onClick={() => formSwitcher('reset')} style={{ textDecoration: "none" }}>Forget Password?</a>
                </Col>
            </Row>
        </Container>
    )
}

LoginForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    formSwitcher: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}
export default LoginForm
