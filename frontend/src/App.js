
import './App.css';
// import TicketTable from './components/ticket-table/TicketTable';
// import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './page/dashboard/Dashboard';
import { Entry } from './page/entry/Entry.page';
import { Registration } from './page/registration/Registration';
import AddTicket from './page/new-ticket/AddTicket';
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
          <Route path="/registration">
            <Registration />
          </Route> 
     
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/add-ticket">
              <AddTicket />
            </PrivateRoute>
            <PrivateRoute path="/tickets">
              <TicketLists />
            </PrivateRoute>
            <PrivateRoute path="/ticket/:tId">
              <Ticket />
            </PrivateRoute>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
