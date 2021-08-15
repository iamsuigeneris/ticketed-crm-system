import React,{useEffect, useState} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import AddTicketForm from '../../components/add-ticket-form/AddTicketForm'
import PageBreadcrumb from '../../components/breadcrumb/PageBreadcrumb'
import { shortText } from '../../utils/Validation'

const initialFormData = {
    subject: "",
    issueDate: "",
    detail:""
}
const initialFormError = {
    subject: false,
    issueDate: false,
    detail: false
}
const AddTicket = () => {
    const [formData, setFormData] = useState(initialFormData)
    const [formDataError, setFormDataError] = useState(initialFormError)

    useEffect(() => {}, [formData, formDataError])

    const handleOnChange = e => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        setFormDataError(initialFormError)

        const isSubjectValid = await shortText(formData.subject)

        setFormDataError({
            ...initialFormError,
            subject:!isSubjectValid
        })
    }
    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="New Ticket"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddTicketForm
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                        formData={formData}
                        formDataError={formDataError}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default AddTicket
