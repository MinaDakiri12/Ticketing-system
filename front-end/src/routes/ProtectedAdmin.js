import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import {UserContext} from '../component/UserContextApi'

const ProtectedAdmin = ({ comp: Component, ...rest }) => {
     const { auth:{isAuth , type}} = useContext(UserContext);
     return (
          <Route
               {...rest}
               render={() => {
                    if(isAuth && type === 'admin') {
                         return <Component/>
                    } else {
                         return (
                              <Redirect to='/login' />
                         )
                    }
               }}
          />
     )
}


export default ProtectedAdmin