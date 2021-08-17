import React from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const UpdateTicket = ({ msg, handleOnChange, handleOnSubmit}) => {
    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Label>Reply</Form.Label>
            <Form.Text> Please reply your message here or update your ticket</Form.Text>
            <Form.Control
                as="textarea"
                row="5"
                value={msg}
                name="detail"
                onChange={handleOnChange}
            /> 
            <div className="d-grid justify-content-end mt-4 mb-3">
                <Button variant="info" type="submit">Reply</Button>
            </div>
         
        </Form>
    )
}

UpdateTicket.prototype = {
    msg:PropTypes.string.isRequired,
    handleOnChange:PropTypes.func.isRequired,
    handleOnSubmit:PropTypes.func.isRequired
}

export default UpdateTicket
