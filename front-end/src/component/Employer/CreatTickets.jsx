import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../core/Layout'
import axios from 'axios'

function CreateTicket() {

     const [createTicket, setCreateTicket] = useState({
          title: '',
          description: '',
          type: '', 
          emergency: '', 
     })

     const createTickets = async(e) => {
          e.preventDefault();
         await axios.post(' http://localhost:3001/api/addTicket', createTicket)
          .then((response)=>{
               console.log(response+'Data Inserted!')
          })
          .catch((error) => {console.log(error)})
     }


  
    
     const handelChange = (e) => {
          setCreateTicket({...createTicket, [e.target.name]: e.target.value})
     }

    
     const form = () =>(
       <form onSubmit={createTickets}>
           
           <button className='btn btn-primary btn-lg'><Link to="/employer" className="btn "> Back to page Employer</Link> </button>
             
        
          <div className="form-group">
                                   <label htmlFor="registration_number">Title</label>
                                   <input type="text" className="form-control" name="title" onChange={handelChange} />
          </div>   
          <div className="form-group">
                                   <label htmlFor="mark">Description</label>
                                   <textarea className="form-control" name="description" rows="4"  onChange={handelChange} ></textarea >
                              </div>
                              <div className="form-group">
                                   <label>Type</label>
                                   <select className="custom-select" name="type"  onChange={handelChange}  >
                                        <option>Type...</option>
                                        <option value='hardware'>Hardware</option>
                                        <option value='software'>Software</option>
                                   </select>
          </div>
            
          <div className="form-group">
                                   <label> Emergency</label>
                                   <select className="custom-select" name="emergency"  onChange={handelChange} >
                                        <option> Emergency Type...</option>
                                        <option value='urgent'>Urgent</option>
                                        <option value='medium'>Medium</option>
                                        <option value='normal'>Normal</option>
                                   </select>
          </div>
          <button className="btn btn-lg btn-block btn-outline-success">Create</button>
          
         
          </form>
     )
     return (
     <>
        <div>
          <Layout title="Create Your Tickets"></Layout>
        </div>
        <div>
               <div className="row"> 
                    <div className="col-md-6 mx-auto">
     
                    { form() }
                    </div>
               </div>
       </div>
    </>

  )
 




}


export default CreateTicket