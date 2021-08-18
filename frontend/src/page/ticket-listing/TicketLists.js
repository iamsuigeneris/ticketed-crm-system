import React, { useState,useEffect } from 'react'
import { Container, Row, Col,Button } from 'react-bootstrap'
import PageBreadcrumb from '../../components/breadcrumb/PageBreadcrumb'
import SearchForm from '../../components/search-form/SearchForm'
import TicketTable from '../../components/ticket-table/TicketTable'
import tickets from '../../assets/data/dummy-ticket.json'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TicketLists = () => {
    const [str, setStr] = useState("")
    const [displayTicket, setDisplayTicket] = useState(tickets)
    
    useEffect(() => {},[str, displayTicket])

    const handleOnChange = e => {
        const {value} = e.target
        setStr(value)
        searchTicket(value)
    }
    const searchTicket = sttr => {
        const displayTickets = tickets.filter((row) => row.subject.toLowerCase().includes(sttr.toLowerCase()))
        setDisplayTicket(displayTickets)
    }
    return (
        <Container> 
            <Row>
                <Col>
                    <PageBreadcrumb page="TicketList" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Link to="add-ticket">
                        <Button variant="info" style={{ fontSize: "1.5rem", padding: "5px 20px", color: "white" }}>Add New Ticket</Button>
                    </Link>
                </Col>
                <Col className="text-right">
                    <SearchForm handleOnChange={handleOnChange} str={str} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <TicketTable tickets={displayTicket} />
                </Col>
            </Row>

        </Container>
    )
}
TicketTable.prototype = {
    tickets:PropTypes.array.isRequired
}

export default TicketLists
