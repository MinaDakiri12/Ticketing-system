import React, {useState,useEffect}  from "react"
import Layout from '../../../core/Layout'
import NavAdmin from './NavAdmin'
import axios from 'axios'


function ClosedTicket() {
 

  const  [resolved,setResolved]=useState([])
  const GetAllTicket=()=>{
    axios.get('http://localhost:3001/api/accept')
    .then(response=>{
        setResolved(response.data) 
    })
}

useEffect(()=>{
    GetAllTicket () 
},[])

    

return (
    <>
    <NavAdmin/>
    <div>
      <Layout title="Closed Tickets"></Layout>
        <div className="container">
            <table class="table table table-bordered  mt-4">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                    
                        <th scope="col">Title</th>
                        <th scope="col">Type</th>
                        <th scope="col">Emergency</th>
                        <th scope="col">Etat</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {resolved.map((Data)=>(
                        <tr >
                            <td>{Data.date}</td>
                            <td>{Data.title}</td>
                            <td>{Data.type}</td>
                            <td>{Data.emergency}</td>
                            <td>{Data.etat}</td>
    
                        </tr>
                    ))
                    }
                </tbody>
           </table>
        </div>
    </div>
   </>
)
}

export default ClosedTicket

