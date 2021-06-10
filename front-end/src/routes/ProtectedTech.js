import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const ProtectedTech = ({ isAuth, type, component: Component, ...rest }) => {
     return (
          <Route
               {...rest}
               render={() => {
                    if(isAuth && type === 'technician') {
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


export default ProtectedTech