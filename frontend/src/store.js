import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from './page/ticket-listing/ticketSlice'
import userReducer from './page/dashboard/userSlice'
import loginReducer  from './components/login/loginSlice'

const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        login: loginReducer,
        user:userReducer
    }
})

export default store