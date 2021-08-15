import React from 'react'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
// import { shortText } from '../../utils/Validation'
import './addTicketForm.css'

const AddTicketForm = ({ handleOnSubmit, handleOnChange, formData, formDataError }) => {
    return (
        <div className="add-new-ticket bg-light" style={{ padding: "2rem 1rem", marginTop: "3rem", borderRadius: "1rem" }}>
            <h1 className="text-info text-center">Add New Ticket</h1>
            <hr />
            <Container>
                <Form autoComplete="off" onSubmit={handleOnSubmit}>
                    <Form.Group className="mb-3" as={Row}>
                        <Form.Label column sm={3}>Subject</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                name="subject"
                                // minLength="3"
                                maxLength="100"
                                onChange={handleOnChange}
                                value={formData.subject}
                                placeholder="Subject"
                                required
                            />
                            <Form.Text className="text-danger">
                                {formDataError.subject && "Subject is required"}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Issue Found
                        </Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                type="date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleOnChange}
                                required
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={formData.detail}
                            name="detail"
                            rows="5"
                            onChange={handleOnChange}
                            required
                        />
                    </Form.Group>
                    {' '}
                    <div className="d-grid gap-2" >
                        <Button type="submit" variant="info" className="mt-3" style={{ color: "white" }}>Submit</Button>
                    </div>
                </Form>
            </Container>
        </div>

    )
}

AddTicketForm.propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    formDataError: PropTypes.object.isRequired
}

export default AddTicketForm
