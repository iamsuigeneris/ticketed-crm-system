import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

const SearchForm = ({ handleOnChange, str }) => {
   
    return (
        <div>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="3">Search{" "}</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            name="searchStr"
                            onChange={handleOnChange}
                            value={str}
                            placeholder="Search..."
                            />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

SearchForm.prototype = {
    handleOnChange: PropTypes.func.isRequired,
    str:PropTypes.string.isRequired 
}

export default SearchForm
