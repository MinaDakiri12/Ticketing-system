import React, {useState,useEffect}  from "react"
import { useParams } from 'react-router-dom'
import Layout from '../../../core/Layout'
import NavAdmin from './NavAdmin'
import axios from 'axios'


function RefusedTicket() {
 
  const { id } = useParams()
  const  [resolved,setResolved]=useState([])
  const GetAllTicket=()=>{
    axios.get(`http://localhost:3001/api/accept/${id}`)
    .then(response=>{
        setResolved(response.data) 
    })
}

useEffect(()=>{
    GetAllTicket () 
     // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default RefusedTicket
