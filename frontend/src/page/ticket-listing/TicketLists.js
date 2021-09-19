import React, {useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {fetchAllTickets} from './ticketsAction'
import { Container, Row, Col,Button } from 'react-bootstrap'
import PageBreadcrumb from '../../components/breadcrumb/PageBreadcrumb'
import SearchForm from '../../components/search-form/SearchForm'
import TicketTable from '../../components/ticket-table/TicketTable'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TicketLists = () => { 
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchAllTickets())
    },[dispatch])

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
                    <SearchForm  />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <TicketTable />
                </Col>
            </Row>

        </Container>
    )
}
TicketTable.prototype = {
    tickets:PropTypes.array.isRequired
}

export default TicketLists
