import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from '../form/Login'
import Logout from '../form/Logout'
import Home from '../core/Home'

// Employer

import Employer from '../component/Employer/Employer'
import CreatTickets from '../component/Employer/CreatTickets'

//Context Api

// Admin
import Admin from '../component/Admin/Admin'
import Assigned from '../component/Admin/pages/Assigned'
import Refused  from '../component/Admin/pages/Refused'
import Closed from '../component/Admin/pages/Closed'
import TicketList from '../component/Admin/pages/TicketList'
import Register from '../component/Admin/pages/Register'

//Protected

import ProtectedAdmin from './ProtectedAdmin'
import ProtectedEmployer from './ProtectedEmployer'
import ProtectTech from './ProtectedTech'


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


                    <ProtectTech path='/tech' exact comp={Tech}/> 

                    {/*Routes Employer */}
                    <ProtectedEmployer path='/employer' exact comp={Employer}/> 
                    <ProtectedEmployer path='/create-tickets' exact comp={CreatTickets}/>

                    {/*Routes Admin */}
                    <ProtectedAdmin path='/admin' exact  comp={Admin}/> 
                    <ProtectedAdmin path='/tickets-list' exact comp={TicketList}/>
                    <ProtectedAdmin path='/assign=:id' exact comp={Assigned}/>
                    <ProtectedAdmin path='/closed' exact comp={Closed}/>
                    <ProtectedAdmin path='/refused' exact comp={Refused}/>
                    <ProtectedAdmin path='/register' exact comp={Register}/>

               </Switch>
          </Router>
          </>
     )
}

export default Routes