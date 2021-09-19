import { configureStore } from '@reduxjs/toolkit'
import ticketReducer from './page/ticket-listing/ticketSlice'

const store = configureStore({
    reducer: {
        tickets: ticketReducer
    }
})

export default store