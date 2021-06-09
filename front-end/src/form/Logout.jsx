import axios from 'axios'
import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'


function Logout() {
     useEffect(()=> {
          axios.get('http://localhost:3001/api/logout').then(() => {
               console.log('You\'re Logged Out')
          })
     }, [])
     return (
          <>
               <Redirect to="/login" />
          </>
     )
}


export default Logout