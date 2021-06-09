import React, { useState, useEffect} from 'react'
import NavAdmin from './NavAdmin'
import Layout from '../../../core/Layout'
import axios from 'axios'
axios.defaults.withCredentials = true

const Register = (props) => {
  

    const initialState = { full_name:'', email:'', password:'', type: 'employer', id_department: ''}
    const [infosUser, setInfosUser] = useState(initialState)
    const [department, setDepartment] = useState([])

    useEffect(() => {
        axios.get(' http://localhost:3001/api/department')
        .then((response) => {
            setDepartment(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])
    const changeValue = (e) => {
        setInfosUser({
            ...infosUser,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = await axios.post(' http://localhost:3001/api/signup', infosUser,
        { withCredentials: true })
       
        if(data){
            console.log(data, "register");
           
            props.history.push('/login')

        }
    }

    

    return (
        <>
       
        <NavAdmin/>
            <div>
            <Layout title="Register"></Layout>
            </div>
            <div className="row">
                <div className="col-md-6 mx-auto">
                <form onSubmit={handleSubmit} >
                    <div className="input-group mb-3">
                        <label htmlFor="name" className="text-muted"></label>
                        <input className="form-control" type="text" name='full_name' onChange={changeValue} placeholder="First Name"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="text-muted"></label>
                        <input  className="form-control" type="email"name='email' onChange={changeValue} placeholder="email@gmail.com"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label"></label>
                        <input className="form-control" type="password" name='password' onChange={changeValue} placeholder="********"  />
                    </div>
                    <div className="form-group">
                        <select name='type' className="custom-select" onChange={changeValue} >
                            <option disabled selected>Select Your Role</option>
                            <option  defaultValue="employer">Employer</option>
                            <option  defaultValue="technician">technician</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <select name='id_department' className="custom-select" onChange={changeValue} >
                            <option disabled selected>Select Your Department</option>
                            {department.map((depart, index) => {
                                return <option key={index} value={depart._id}>{depart.name}</option>
                            })}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mt-3 mb-5">Register</button>
                    </div>
                </form>
               </div>
               </div> 
              
  
        </>
    )
}

export default Register
