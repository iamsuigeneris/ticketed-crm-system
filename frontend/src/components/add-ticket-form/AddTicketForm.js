import React, { useEffect, useState } from 'react'
import { Container, Button, Row, Col, Form, Spinner,Alert } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { shortText } from '../../utils/Validation'
import { openNewTicket } from './addTicketActions'
import {resetSuccessMsg} from "./addTicketSlice"
import './addTicketForm.css'

const initialFormData = {
    subject: "",
    issueDate: "",
    message: ""
}
const initialFormError = {
    subject: false,
    issueDate: false,
    message: false
}

const AddTicketForm = () => {

    const dispatch = useDispatch()
 
    const {user:{name}} = useSelector(state => state.user)
    const { isLoading, error, successMsg } = useSelector(state => state.openTicket)

    const [formData, setFormData] = useState(initialFormData)
    const [formDataError, setFormDataError] = useState(initialFormError)

    useEffect(() => { 
        return () => {
            successMsg && dispatch(resetSuccessMsg())
        }
    }, [formData, formDataError,dispatch])

    const handleOnChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        setFormDataError(initialFormError)

        const isSubjectValid = await shortText(formData.subject)

        setFormDataError({
            ...initialFormError,
            subject: !isSubjectValid
        })
        dispatch(openNewTicket({...formData, sender: name}))
    }

    return (
        <div className="add-new-ticket bg-light" style={{ padding: "2rem 1rem", marginTop: "3rem", borderRadius: "1rem" }}>
            <h1 className="text-info text-center">Add New Ticket</h1>
            <hr />
            <div>
                {error && <Alert variant="danger">{error}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}
                {isLoading && <Spinner variant="primary" animation="border" />}
            </div>
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
                            value={formData.message}
                            name="message"
                            rows="5"
                            onChange={handleOnChange}
                            required
                        />
                    </Form.Group>
                    {' '}
                    <div className="d-grid gap-2" >
                        <Button type="submit" variant="info" className="mt-3" style={{ color: "white" }}>Open Ticket</Button>
                    </div>
                </Form>
            </Container>
        </div>

    )
}

// AddTicketForm.propTypes = {
//     handleOnSubmit: PropTypes.func.isRequired,
//     handleOnChange: PropTypes.func.isRequired,
//     formData: PropTypes.object.isRequired,
//     formDataError: PropTypes.object.isRequired
// }

export default AddTicketForm
