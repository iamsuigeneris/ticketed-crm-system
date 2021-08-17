
import './App.css';
import TicketTable from './components/ticket-table/TicketTable';
import DefaultLayout from './layout/DefaultLayout';
// import Dashboard from './page/dashboard/Dashboard';
// import { Entry } from './page/entry/Entry.page';
import AddTicket from './page/new-ticket/AddTicket';
import TicketLists from './page/ticket-listing/TicketLists';
import Ticket from './page/ticket/Ticket';

function App() {
  return (
    <div className="App">
      {/* <Entry /> */}
      <DefaultLayout>
        {/* <Dashboard /> */}
        {/* <AddTicket /> */}
        {/* <TicketTable /> */}
        {/* <TicketLists /> */}
        <Ticket />
      </DefaultLayout >
    </div>
  );
}

export default App;
