import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from '../form/Login'
import Logout from '../form/Logout'
import Home from '../core/Home'

// Employer

import Employer from '../component/Employer/Employer'
import CreatTickets from '../component/Employer/CreatTickets'



// Admin
import Admin from '../component/Admin/Admin'
import Assigned from '../component/Admin/pages/Assigned'
import Refused  from '../component/Admin/pages/Refused'
import Closed from '../component/Admin/pages/Closed'
import TicketList from '../component/Admin/pages/TicketList'
import Register from '../component/Admin/pages/Register'



// Tech
 
import Tech from '../component/Technician/Tech'


function Routes() {
     
 

     
     return (
          <>
          <Router>
               <Switch>
                 
                    {/* Global Routes */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path="/login" component={Login}/>


                    <Route path='/tech' exact component={Tech}/> 

                    {/*Routes Employer */}
                    <Route path='/employer' exact component={Employer}/> 
                    <Route path='/create-tickets' exact component={CreatTickets}/>

                    {/*Routes Admin */}
                    <Route path='/admin' exact component={Admin}/> 
                    <Route path='/tickets-list' exact component={TicketList}/>
                    <Route path='/assign=:id' exact component={Assigned}/>
                    <Route path='/closed' exact component={Closed}/>
                    <Route path='/refused' exact component={Refused}/>
                    <Route path='/register' exact component={Register}/>
                 
               </Switch>
          </Router>
          </>
     )
}

export default Routes