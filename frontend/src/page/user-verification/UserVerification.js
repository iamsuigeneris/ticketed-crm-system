import React,{useEffect,useState} from 'react'
import { Card, Spinner,Alert } from "react-bootstrap"
import { useParams } from 'react-router-dom'
import { userRegistrationVerification } from '../../api/userApi'
import "./userVerification.css"

const initialResponse = {
    status: "",
    message:""
}

export const UserVerification = () => {
    const { _id, email } = useParams()
    const data = { _id, email }
    
    const [response, setResponse] = useState(initialResponse)
    
    useEffect(() => {
        const apiCall = async () => {
            const result = await userRegistrationVerification(data)
            setResponse(result)
        }
        !response.status && apiCall()
    },[response])
    // call api and send the _id to verify user

    return <div className="registration-page bg-info">
        <div className="mt-5">
            <Card style={{ width: '25rem', padding:'1rem' }} className="form-box">
            {!response.status && <Spinner variant="info" animation="border" />}
                {response.status && <Alert variant={response.status === 'success' ? 'success' : 'danger'}>{ response.message}</Alert> }
            </Card>
        </div >
    </div>
    

    
}


