import React, {useState, useEffect} from "react"
import axios from 'axios'
import toastr from 'toastr';
import Layout from '../../core/Layout'
import NavTech from './Navtech'




function TicketTech() {
     const [ticketList, setTicketList] = useState([])

     useEffect(()=> {
          axios.get(' http://localhost:3001/api/technicianTicket').then(response => {
               setTicketList(response.data)
               console.log(response)
          })
     }, [])
     const resolvedTicket = (id) => {
        
          axios.post(`http://localhost:3001/api/resolvedTicket/${id}`).then(response => {
               toastr.info ('Ticket Resolved')
               console.log(response)
          })
     }
          
              const refuseTicket = (id) => {
                  axios.post(`http://localhost:3001/api/cancelTicket/${id}`)
                  .then((response) => {
                       console.log(response)
                       toastr.error ('Ticket Cancel')
                 
                  })
                  .catch((error) => {
                      console.log(error);
                  })
              }
          


    
     return (
          <>
          <NavTech/>
           <div>
            <Layout title="Welcome To Dashboard Technician"></Layout>
          </div>
               <div className="container-fluid">
                    <div className="container">     
                         <table className="table table table-bordered  mt-4">
                              <thead >
                              <tr>
                                   <th>Date</th>
                                   <th>Title</th>
                                   <th>Emergency</th>
                                   <th>Etat</th>
                                   <th>Description</th>
                                   <th>Action</th>
                              </tr>
                              </thead>
                              <tbody>

                              {ticketList.map((Data, key) => (
                                   <tr key={key}>
                                       
                                        <td>{Data.id_ticket.date}</td>
                                        <td>{Data.id_ticket.title}</td>
                                        <td>{Data.id_ticket.emergency}</td>
                                        <td>{Data.id_ticket.etat}</td>
                                        <td>{Data.id_ticket.description}</td>
                                        <td>{Data.id_ticket.type}</td>
                                        
                                       
                                                            
                                        
                                             <td>
                                       
                                                  <button type="button" className="btn btn-outline-info btn-sm ml-5" onClick={()=> {resolvedTicket( Data.id_ticket._id)}} >Accept</button>
                                                  <button type="button" className="btn btn-outline-danger btn-sm ml-5" onClick={()=> {refuseTicket(Data.id_ticket._id)}}  >Refuse</button> 
                                            

                                             
                                        </td> 
                                        
                                   
                                     

                                   </tr>
                               ) )}
                             

                              </tbody>
                         </table>
                    </div>
               </div>
     
          </>
     )
}

export default TicketTech