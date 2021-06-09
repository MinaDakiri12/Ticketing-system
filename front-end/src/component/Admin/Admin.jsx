import React from 'react'
import Layout from '../../core/Layout'
import NavAdmin from './pages/NavAdmin'


function Admin(){
  
 return (
   <>
    <NavAdmin/>
      <div>
          <Layout title="Welcome To Dashboard Admin">
          </Layout>
      </div>
   </> 
 )
}

export default Admin
