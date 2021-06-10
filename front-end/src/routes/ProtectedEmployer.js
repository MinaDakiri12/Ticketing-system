import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const ProtectedEmployer = ({ isAuth, type, component: Component, ...rest }) => {
     return (
          <Route
               {...rest}
               render={() => {
                    if(isAuth && type === 'employer') {
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


export default ProtectedEmployer