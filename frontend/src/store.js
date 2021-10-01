import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from './page/ticket-listing/ticketSlice'
import userReducer from './page/dashboard/userSlice'
import loginReducer from './components/login/loginSlice'
import newTicketReducer from './components/add-ticket-form/addTicketSlice'
import registrationReducer from './components/registration-form/userRegistrationSlice'

const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        login: loginReducer,
        user: userReducer,
        openTicket: newTicketReducer,
        registration: registrationReducer
    }
})

export default store