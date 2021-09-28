import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Container,Row,Col,Button} from 'react-bootstrap'
import TicketTable from '../../components/ticket-table/TicketTable'
// import tickets from '../../assets/data/dummy-ticket.json'
import PageBreadcrumb from '../../components/breadcrumb/PageBreadcrumb'
import { Link } from 'react-router-dom'
import { fetchAllTickets } from "../ticket-listing/ticketsAction"

const Dashboard = () => {

    const dispatch = useDispatch()
    const { tickets } = useSelector(state => state.tickets)
    
    useEffect(() => {
        if (!tickets.length) {
            dispatch(fetchAllTickets())
        }
    }, [tickets, dispatch])
    
    const pendingTickets = tickets.filter(row => row.status !== "Closed")
    const totalTickets = tickets.length

    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Dashboard"/>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-5 mb-2">
                    <Link to="add-ticket">
                        <Button variant="info" style={{ fontSize: "1.5rem", padding: "5px 20px", color: "white" }}>Add New Ticket</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mb-2">
                    <div>Total tickets: {totalTickets} </div>
                    <div>Pending Ticket: {pendingTickets.length} </div>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
                    Recently Added tickets
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className="recent-ticket">
                    <TicketTable tickets={tickets} />
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard
