
import React, {useState, useEffect} from "react"
import axios from 'axios'
import NavEmp from './NavEmp'
import Layout from '../../core/Layout'

function Tech() {

  const [ticket, setTicket] = useState([])
     
  useEffect(()=> {
       axios.get('http://localhost:3001/api/empTicket').then(response => {
            setTicket(response.data)
            console.log(response)
       })
  }, [])


  const deleteTicket = (id) => {
       const ask = window.confirm('Are sure you want to delete this ticket?')
       if (ask === true) {
            axios.delete(`http://localhost:3001/api/deleteTicket/${id}`).then(()=> {
                 window.location.reload()
            })
       }          
  }
    return (
        <>
        <NavEmp/>
          <div>
            <Layout title="Welcome To Dashboard Employer"></Layout>
          </div>
      
          <div className="container">
             <table className=" table table-bordered  mt-4 ">
               <thead> 
                    <tr>
                         <th scope="col">Date</th>
                         <th scope="col">Title</th>
                         <th scope="col">Type</th>
                         <th scope="col"> Emergency</th>
                         <th scope="col">Etat</th>
                         <th scope="col"> Action</th>
                    </tr>
                    </thead>

                    {/* Body Table */}
                    <tbody>

                    {ticket.map((val, key) => (
                         <tr key={key}>
                              <th  scope="row">{val.date}</th>
                              <td>{val.title}</td>
                              <td>{val.type}</td>
                              <td>{val.emergency}</td>
                              <td>{val.etat === 'waiting' ? <b style={{color: "red"}}>Waiting</b> : (val.etat === 'assigned' ? <b style={{color: "green"}}>Assigned</b> : <b style={{color: "green"}}>Resolved </b> )}</td>
                              <td>
                                   <button onClick={()=>{deleteTicket(val._id)}} className="btn btn-outline-danger">Delete</button>
                              </td>
                         </tr>
                    ))}

                    </tbody>
              </table>
          </div>   
          
   
</>
    )
}

export default Tech
