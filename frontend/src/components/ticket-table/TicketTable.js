import React from 'react'
import { useSelector } from "react-redux"
import {Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const TicketTable = () => {
    const { searchTicketList, isLoading, error } = useSelector((state) => state.tickets)
    
    if(isLoading) return <h3>Loading...</h3>
    if (error) return <h3> {error}</h3>
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Opened dates</th>
                </tr>
            </thead>
            <tbody>
                {searchTicketList.length ? (
                    searchTicketList.map((row) =>
                        (<tr key={row._id}>
                        <td>{row._id}</td>
                        <td>
                            <Link to={`/ticket/${row._id}`} style={{ textDecoration: "none" }}>
                                {row.subject}
                            </Link>
                        </td>
                            <td>{row.status }</td>
                            <td>{row.openAt && new Date(row.openAt).toLocaleString()}</td>
                        </tr>))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No ticket to show</td>
                        </tr>
                )}
            </tbody>
        </Table>
    )
}
export default TicketTable
