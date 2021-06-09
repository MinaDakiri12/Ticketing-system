import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import Layout from '../../../core/Layout'
import NavAdmin from './NavAdmin'
import axios from 'axios'


function GetTicket() {
    const [getTicket, setGetTicket]=useState([])

    const getAllTicket=()=>{
        axios.get('http://localhost:3001/api/ticket')
        .then(response=>{
            setGetTicket(response.data) 
        })
    }
   
    useEffect(()=>{
        getAllTicket () 
    },[])

        
   

    return (
        <>
        <NavAdmin/>
        <div>
        <Layout title="Tickets Lists"></Layout>
        </div>
          <div>
            <div className="container">
              <table class="table table table-bordered  mt-4">
                <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Title</th>
              <th scope="col">Type</th>
              <th scope="col">Emergency</th>
              <th scope="col">Etat</th>
              <th scope="col">Assign</th>
            </tr>
          </thead>
                <tbody>
              {getTicket.map((Data)=>(
                    <tr >
                      <td>{Data.date}</td>
                      <td>{Data.title}</td>
                      <td>{Data.type}</td>
                      <td>{Data.emergency}</td>
                      <td>{Data.etat}</td>
                      <td><Link to={`/assign=${Data._id}`} className="btn btn-outline-success">Assign</Link></td>
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

export default GetTicket

