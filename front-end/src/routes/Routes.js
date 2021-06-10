import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {UserContext} from '../component/UserContextApi'
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
import ProtectedAuth from './ProtectedAuth'
import ProtectedEmployer from './ProtectedEmployer'
import ProtectTech from './ProtectedTech'


// Tech
import Tech from '../component/Technician/Tech'


function Routes() {

     const { auth:{isAuth , type}} = useContext(UserContext)
     
 

     
     return (
          <>
          <Router>
               <Switch>
                
                 
                    {/* Global Routes */}
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/logout" component={Logout}/>
                    <ProtectedAuth exact path="/login" component={Login}/>


                    <ProtectTech path='/tech' exact component={Tech}/> 

                    {/*Routes Employer */}
                    <ProtectedEmployer path='/employer' exact component={Employer}/> 
                    <ProtectedEmployer path='/create-tickets' exact component={CreatTickets}/>

                    {/*Routes Admin */}
                    <ProtectedAdmin path='/admin' exact isAuth={isAuth} type={type} component={Admin}/> 
                    <ProtectedAdmin path='/tickets-list' exact component={TicketList}/>
                    <ProtectedAdmin path='/assign=:id' exact component={Assigned}/>
                    <ProtectedAdmin path='/closed' exact component={Closed}/>
                    <ProtectedAdmin path='/refused' exact component={Refused}/>
                    <ProtectedAdmin path='/register' exact component={Register}/>

               </Switch>
          </Router>
          </>
     )
}

export default Routes