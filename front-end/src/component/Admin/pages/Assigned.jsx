import React, {useState, useEffect} from "react"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import NavAdmin from './NavAdmin'
import Layout from '../../../core/Layout'



function Single(props) {
     const { id } = useParams()
     const [ticket, setTicket] = useState([])
     const [technician, setTechList] = useState([])
  
     const [assign, setAssign] = useState({
        id_technician : ''
     })


     useEffect(()=> {
          axios.get(' http://localhost:3001/api/technician').then(response => {
               setTechList(response.data)
               console.log(response)
          })
          axios.get(`http://localhost:3001/api/getticket/${id}`).then(response => {
               setTicket(response.data)
               console.log(response)
          })
     }, [id])

     const { id_technician} = assign
     const onChange = (e) => {
          setAssign({...assign, [e.target.name]: e.target.value})
     }
     

     // Assign submit
     const assigns =  async (e) => {
          e.preventDefault()
         await axios.post(`http://localhost:3001/api/assign/${id}`, {

            id_technician:  id_technician

          })
          .then((response)=>{   
            toastr.info ('Assigned Successfully')
            props.history.push('/ticket-list')
         })
         .catch((error) => { toastr.warning(error , 'Server Error ')})
     }


     return (
        <>
         <NavAdmin/>
        <div>
        <Layout title="Assign Tickets"></Layout>
        </div>
         <div id="wrapper">
            <div id="page-content-wrapper">
                <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 mt-4">
                        
                            <form onSubmit={assigns}>
                                <fieldset disabled>
                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="text" className="form-control" value={ticket.date} />
                                </div>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" value={ticket.title} />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <input type="text" className="form-control" value={ticket.type} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" value={ticket.description} rows="4"></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Emergency</label>
                                    <input type="text" className="form-control" value={ticket.emergency} />
                                </div>
                                </fieldset>
                                <div className="form-group">
                                    <select className="custom-select" name="id_technician" onChange={onChange}>
                                            <option>Technician...</option>
                                            <option disabled selected>Select Technician</option>
                                                {technician.map((technician, index) => {
                                                return  <option key={index}  value={technician._id}> {technician.full_name}</option>
                                                })}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Assign</button>

                            </form>
                        
                            </div>
                        </div>
                </div>
            </div>
         </div>
        </>
     )
}

export default Single