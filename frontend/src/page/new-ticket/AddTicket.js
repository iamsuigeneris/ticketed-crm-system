import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import AddTicketForm from '../../components/add-ticket-form/AddTicketForm'
import PageBreadcrumb from '../../components/breadcrumb/PageBreadcrumb'



const AddTicket = () => {


  


    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="New Ticket"/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddTicketForm />
                </Col>
            </Row>
        </Container>
    )
}

export default AddTicket
