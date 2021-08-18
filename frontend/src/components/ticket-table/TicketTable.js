import React from 'react'
import {Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const TicketTable = ({tickets}) => {
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
                {tickets.length ? (
                    tickets.map((row) =>
                        (<tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                            <Link to={`/ticket/${row.id}`} style={{ textDecoration: "none" }}>
                                {row.subject}
                            </Link>
                        </td>
                            <td>{row.status }</td>
                            <td>{row.addedAt}</td>
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
