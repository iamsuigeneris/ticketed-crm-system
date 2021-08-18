import React, { useEffect, useState } from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'
import PageBreadcrumb from '../../components/breadcrumb/PageBreadcrumb'
import tickets from '../../assets/data/dummy-ticket.json'
import MessageHistory from '../../components/message-history/MessageHistory'
import UpdateTicket from '../../components/update-ticket/UpdateTicket'
import {useParams} from 'react-router-dom'

const ticket = tickets[0] 

const Ticket = () => {
    const {tId} = useParams()
    const [message, setMessage] = useState("")
    const [ticket, setTicket] = useState("")
    
    useEffect(() => {
        for (let i = 0; i < tickets.length; i++) {
            if (tickets[i].id == tId) {
                setTicket(tickets[i])
                continue
            }
        }
    }, [message,tId])
    
    const handleOnChange = e => {
        setMessage(e.target.value)
    }
    const handleOnSubmit = () => {
        alert("Form submitted")
    }
    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Ticket" />
                </Col>
            </Row>
            <Row>
                <Col className="text-weight-bolder text-secondary">
                    <div className="Subject">Subject: {ticket.subject}</div>
                    <div className="Date">Ticket Opened: {ticket.addedAt}</div>
                    <div className="Status">Status: {ticket.status }</div>
                </Col>
                <Col className="text-right">
                    <Button variant="outline-info">Close Ticket</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    {ticket.history && <MessageHistory msg={ticket.history} />}
                  
                </Col>
            </Row>
            <hr />
            <Row className="mt-4">
                <Col>
                    <UpdateTicket msg={message}
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Ticket
