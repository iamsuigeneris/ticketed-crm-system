
import './App.css';
// import TicketTable from './components/ticket-table/TicketTable';
// import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './page/dashboard/Dashboard';
import { Entry } from './page/entry/Entry.page';
import {PasswordOtpForm} from './page/reset-password/PasswordOtpForm'
import { Registration } from './page/registration/Registration';
import AddTicket from './page/new-ticket/AddTicket';
import { UserVerification} from './page/user-verification/UserVerification'
import TicketLists from './page/ticket-listing/TicketLists';
import Ticket from './page/ticket/Ticket';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/private-route/PrivateRoute'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Entry />
          </Route> 
          <Route exact path="/password-reset">
            <PasswordOtpForm />
          </Route> 
          <Route exact path="/registration">
            <Registration />
          </Route> 
          <Route exact path="/verification/:_id/:email">
            <UserVerification />
          </Route> 
     
          <PrivateRoute exact path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          <PrivateRoute exact path="/add-ticket">
              <AddTicket />
            </PrivateRoute>
          <PrivateRoute exact path="/tickets">
              <TicketLists />
            </PrivateRoute>
          <PrivateRoute exact path="/ticket/:tId">
              <Ticket />
            </PrivateRoute>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
