import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedAuth({ isAuth, type, component: Component, ...rest}) {
     return (
          <Route
          {...rest}
          render={() => (
             !isAuth ? <Component/> 
                     : (type === "admin" 
                       ? <Redirect to="/admin" />
                         : ( type === "technician"
                          ? <Redirect to="/tech" /> 
                          : <Redirect to="/employer" />)
              )

         )}
     />
     )
}

export default ProtectedAuth