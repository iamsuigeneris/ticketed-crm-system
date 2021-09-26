import React,{useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import { useSelector,useDispatch } from "react-redux"
import { replyOnTicket } from "../../page/ticket-listing/ticketsAction"
import PropTypes from 'prop-types'

const UpdateTicket = ({ _id }) => {
    const { user: { name } } = useSelector(state => state.user)
  
    const dispatch = useDispatch()

    const [ message, setMessage] = useState("")
    const handleOnChange = e => {
        setMessage(e.target.value)
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const msgObj = {
            message,
            sender: name
        }
        dispatch(replyOnTicket(_id, msgObj))
        setMessage("")
    }
    return (
        <div>
         
         
        <Form onSubmit={handleOnSubmit}>
            <Form.Label>Reply</Form.Label>
            <Form.Text> Please reply your message here or update your ticket</Form.Text>
            <Form.Control
                as="textarea"
                row="5"
                value={message}
                name="detail"
                onChange={handleOnChange}
            /> 
            <div className="d-grid justify-content-end mt-4 mb-3">
                <Button variant="info" type="submit">Reply</Button>
            </div>
            </Form>
        </div>
    )
}

UpdateTicket.prototype = {
    _id:PropTypes.string.isRequired,

}

export default UpdateTicket
